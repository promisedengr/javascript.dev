const config = process.env;
var cmd=require('node-cmd');
const fs = require('fs');
const { coinToChain } = require('./../const')
const models = require('./../db/models');

const Web3 = require('web3')
const web3 = new Web3(Web3.givenProvider || config.ethereum_address);

let rawdata = fs.readFileSync('./../dex/build/contracts/SendEther.json');
let contract_abi = JSON.parse(rawdata);

// let Contract = require('web3-eth-contract');
// Contract.setProvider(config.ethereum_address);
// let SendEther = new Contract(contract_abi.abi, config.contract_address);

let SendEther = new web3.eth.Contract(contract_abi.abi, config.contract_address)


var solweb3 = require("@solana/web3.js");
const bip39 = require('bip39')


const transfer = async (req, res) => {
  if( ! _validateAmount(req.body.amount)) {
    res.send({state:'err', code:'wrong_amount', token:req.token})
    return
  }
  var chain = _validateCoin(req.body.coin)
  if( chain == null ) {
    res.send({state:'err', code:'wrong_coin', token:req.token})
    return
  }
  var sendAddr = await _getSenderAddr(req.body.account, chain.chain, req.user.user_id)
  if(sendAddr[0] == '') {
    res.send({state:'err', code:'wrong_sender_addr', token:req.token})
    return
  }
  var isreceiver = await _validateReceiverAddr(req.body.account, chain.chain, req.body.address)
  if( isreceiver == false ) {
    res.send({state:'err', code:'wrong_receiver_addr', token:req.token})
    return
  }

  var trs = models.transaction.build({
    addr_from: sendAddr[1],
    addr_to: req.body.address,
    amount: req.body.amount,
    coin: req.body.coin
  })
  
  sendAddr = sendAddr[0]
  switch(chain.chain) {
    case 'eth':
      // var balance = await web3.eth.getBalance(sendAddr);
      // console.log(balance)
      var ret = await SendEther.methods.TransAble(web3.utils.toWei(req.body.amount, "ether"))
      .call({ from: sendAddr })
      if (ret == true) {
        await SendEther.methods.TransEther(req.body.address)
        .send({ from: sendAddr, value: web3.utils.toWei(req.body.amount, "ether"), gas:300000 })
        res.send({state:'ok', token:req.token})
        trs.save()
      }
      else {
        res.send({state:'err', code:'cash_out', token:req.token})
      }
      break;

    case 'btc':
      var cmd_str = `python txbtc.py -f ${sendAddr} -t ${req.body.address} -m ${req.body.amount} -n ${config.bitcoin_address}`
      const res_c = cmd.runSync(cmd_str)
      var tmp = res_c.data.split('\r\n')
      var ret = tmp[0].split('state=')[1]
      if(ret == 'ok') {
        res.send({state:'ok', token:req.token})
        trs.save()
      }
      else {
        res.send({state:'err', code:ret, token:req.token})
      }
      break;

    case 'sol':
      var connection = new solweb3.Connection(solweb3.clusterApiUrl(config.solana_address))
      var to = new solweb3.PublicKey(req.body.address)
      var balance = await connection.getBalance(sendAddr.publicKey)
      if(balance<solweb3.LAMPORTS_PER_SOL * (req.body.amount+0.01)) {
        res.send({state:'err', code:'cash_out', token:req.token})
      }
      else {
        var transaction = new solweb3.Transaction().add(
          solweb3.SystemProgram.transfer({
            fromPubkey: sendAddr.publicKey,
            toPubkey: to,
            lamports: solweb3.LAMPORTS_PER_SOL * req.body.amount,
          })
        );
        var signature = await solweb3.sendAndConfirmTransaction(
          connection,
          transaction,
          [sendAddr]
        )
        res.send({state:'ok', token:req.token, sign:signature})
        trs.save()
      }
      break;

    default:
      res.send({state:'err', code:'no_chain', token:req.token})
  }

};

const _validateAmount = (pm) => {
  return !isNaN(pm) && !isNaN(parseFloat(pm))
}
const _validateCoin = (pm) => {
  if(coinToChain[pm]) {
    return coinToChain[pm]
  }
  else {
    return null
  }
}
const _getSenderAddr = async(pm_account, pm_chain, pm_address) => {
  var user = await models.user.findOne({
    where: {
      email:pm_address
    }
  })
  if (user === null) return ['', ''];
  var wallet = await models.wallet.findOne({
    attributes: ['private', 'address', 'wif'],
    where: {
      account_categ: pm_account,
      blockchain: pm_chain,
      user_id: user.id
    }
  })
  if (wallet !== null) {
    if(pm_chain == 'eth') {
      var account = web3.eth.accounts.privateKeyToAccount('0x'+wallet.private);
      web3.eth.accounts.wallet.add(account);
      return ['0x'+wallet.address, '0x'+wallet.address];
    }
    if(pm_chain == 'btc') {
      return [wallet.wif, wallet.address]
    }
    if(pm_chain == 'sol') {
      if(bip39.validateMnemonic(wallet.wif)) {
        var buffer = await bip39.mnemonicToSeed(wallet.wif);
        var tmp = new Uint8Array(buffer.toJSON().data.slice(0,32))
        var key = solweb3.Keypair.fromSeed(tmp);
        return [key, wallet.address]
      }
      return ['', '']
    }
    
    return [wallet.address, wallet.address];
  }
  else {
    return ['', ''];
  }
}
const _validateReceiverAddr = async(pm_account, pm_chain, pm_address) => {
  if(pm_chain == 'eth') {
    if(pm_address.startsWith('0x')) {
      pm_address = pm_address.slice(2)
    }
  }
  var wallet = await models.wallet.findOne({
    attributes: ['address'],
    where: {
      account_categ: pm_account,
      blockchain: pm_chain,
      address: pm_address
    }
  })
  if (wallet !== null) {
    return true;
  }
  else {
    return false;
  }
}

module.exports = transfer;
