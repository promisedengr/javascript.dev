import AssetLockAbi from 'abi/AssetLock.json';
import config from 'config';

import BlockchainService from './blockchainService';

class AssetService extends BlockchainService {
  constructor(assetAddress) {
    super();
    this.contractAddress = assetAddress;
    this.contract = new this.web3.eth.Contract(AssetLockAbi, assetAddress);
  }

  getAssetBalance = async (address) =>
    this.contract.methods.getAssetBalance(address).call();

  getUsedTokenIdsOf = async (address) =>
    this.contract.methods.getUsedTokenIdsOf(address).call();

  claimAsset = async (from, tokenIds) => {
    try {
      console.log('cla', tokenIds);
      const dataAbi = this.contract.methods.claim(tokenIds).encodeABI();
      const txHash = await this.signTransaction(from, dataAbi, 0);
      return txHash;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  // getAssetBalance = async (asset) => {
  //   try {
  //     const { da } = this.contract.methods.getAssetBalance(asset).call();
  //     console.log('bal', balance);
  //     return parseInt(balance);
  //   } catch (err) {
  //     console.log('err', err);
  //   }
  // };
}

const assetService = new AssetService(config.assetLockAddress);

export default AssetService;
export { assetService };
