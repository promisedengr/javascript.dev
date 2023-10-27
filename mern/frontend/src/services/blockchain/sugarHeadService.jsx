import ERC721Abi from 'abi/ERC721.json';
import SugarHeadAbi from 'abi/SugarHeadNFT.json';
import config from 'config';
import { toast } from 'react-toastify';

import BlockchainService from './blockchainService';

class SugarHeadService extends BlockchainService {
  constructor(sugarHeadAddr) {
    super();
    this.contractAddress = sugarHeadAddr;
    this.contract = new this.web3.eth.Contract(SugarHeadAbi, sugarHeadAddr);
  }

  getTokenIdsOf = async (address) =>
    this.contract.methods.getTokenIdsOf(address).call();

  getCurrentTokenId = async () =>
    this.contract.methods.getCurrentTokenId().call();

  getPrice = async () => this.contract.methods.getPrice().call();

  getCurrentPhase = async () => this.contract.methods.currentPhase().call();

  getFreeMintNumber = async (address) =>
    this.contract.methods.freeMinters(address).call();

  checkAmount = async (amount) => {
    if (amount > config.maxTicketsPerTX) {
      toast.error(
        `You can't buy more than ${config.maxTicketsPerTX} tickets at once.`
      );
      return false;
    }
    if (amount < 0) {
      toast.error(`Invalid Amount`);
      return false;
    }

    const currentTokenId = parseInt(await this.getCurrentTokenId());
    if (currentTokenId + amount >= config.totalSuppy) {
      toast.error(`Remained NFTs are less than ${amount}`);
      return false;
    }
    return true;
  };

  checkEthBalance = async (from, ethAmount) => {
    const ethBalance = await this.getEthBalance(from);
    if (Number(ethBalance) < ethAmount) {
      toast.error("You don't have enough funds");
      return false;
    }
    return true;
  };

  checkIsEarlyMinter = async (from) => {
    const isEarlyMinter = await this.contract.methods
      .isEarlyMinter(from)
      .call();
    console.log('isEarly', isEarlyMinter);

    if (isEarlyMinter) return true;
    else {
      return false;
    }
  };

  buyNFTForFree = async (from) => {
    try {
      const isWhitelisted =
        parseInt(await this.contract.methods.freeMinters(from).call()) > 0;

      if (!isWhitelisted) {
        toast.error("You aren't whitelisted.");
        return null;
      }
      const dataAbi = this.contract.methods.buyNFTForFree().encodeABI();
      const txHash = await this.signTransaction(from, dataAbi, 0);
      return txHash;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  buyNFTEarly = async (from, amount, price) => {
    try {
      const ethAmount = price * amount;
      const isEarlyMinter = await this.checkIsEarlyMinter(from);
      const isFundSufficient = await this.checkEthBalance(from, ethAmount);
      const isAmountValid = await this.checkAmount(amount);

      if (!isAmountValid || !isFundSufficient || !isEarlyMinter) return null;

      const dataAbi = this.contract.methods.buyNFTEarly(amount).encodeABI();
      const txHash = await this.signTransaction(from, dataAbi, ethAmount);
      return txHash;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  buyNFTsInPublic = async (from, amount, price) => {
    try {
      const ethAmount = price * amount;
      const isFundSufficient = await this.checkEthBalance(from, ethAmount);
      const isAmountValid = await this.checkAmount(amount);
      if (!isAmountValid || !isFundSufficient) return null;
      console.log('infunciton', amount);

      const dataAbi = this.contract.methods.buyNFTsInPublic(amount).encodeABI();
      const txHash = await this.signTransaction(from, dataAbi, ethAmount);
      return txHash;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
}

const sugarHeadService = new SugarHeadService(config.sugarHeadAddress);

export default SugarHeadService;
export { sugarHeadService };
