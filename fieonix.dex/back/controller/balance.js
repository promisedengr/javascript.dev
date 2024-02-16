const config = process.env;
var axios = require('axios');
const exec = require('await-exec')
const models = require('./../db/models');
const { Op } = require("sequelize")

const Web3 = require('web3')
const web3 = new Web3(Web3.givenProvider || config.ethereum_address);

var solweb3 = require("@solana/web3.js");


const { coinToChain } = require('./../const')


module.exports.get_rate = async (req, res) => {
  var ret = {}
  for (var x in coinToChain) {
    ret[x] = await _getBalance(coinToChain[x].balance)
  }
  res.send(ret)
}

const _getBalance = async(symbol) => {
  const resp = await axios({
    url: 'https://api.binance.com/api/v3/ticker/price',
    params: {
      symbol: symbol
    },
    method: 'get'
  })
  return Number(resp.data.price)
}


module.exports.balance = async (req, res) => {
  var wallets = await _getWalletAddr(req.user.user_id)
  var address = {
    interest: { btc: '', eth: '', sol: '' },
    pension: { btc: '', eth: '', sol: '' }
  }
  for(var x in wallets) {
    var wallet = wallets[x]
    if( (wallet.account_categ == 'interest' || wallet.account_categ == 'pension') &&
      (wallet.blockchain == 'btc' || wallet.blockchain == 'eth' || wallet.blockchain == 'sol') )
    switch(wallet.blockchain) {
      case 'eth':
        address[wallet.account_categ][wallet.blockchain] = wallet.address
        break
      case 'btc':
        address[wallet.account_categ][wallet.blockchain] = wallet.wif
        break
      case 'sol':
        address[wallet.account_categ][wallet.blockchain] = wallet.address
        break;
    }
  }
  var bal = {
    interest: { btc: 0, eth: 0, usdc: 0, sol: 0 },
    pension: { btc: 0, eth: 0, usdc: 0, sol: 0 }
  }
  var apy = {
    interest: { btc: 0, eth: 0, usdc: 0, sol: 0 },
    pension: { btc: 0, eth: 0, usdc: 0, sol: 0 }
  }
  try {
    var tmp = await Promise.all([
      _getBtcBalance(address['interest']['btc']),
      _getEthBalance(address['interest']['eth']),
      _getSolBalance(address['interest']['sol']),
      _getBtcBalance(address['pension']['btc']),
      _getEthBalance(address['pension']['eth']),
      _getSolBalance(address['pension']['sol'])
    ])
    bal.interest.btc = _formatNumber(tmp[0], 6)
    bal.interest.eth = _formatNumber(tmp[1], 4)
    bal.interest.sol = _formatNumber(tmp[2], 2)
    bal.pension.btc = _formatNumber(tmp[3], 6)
    bal.pension.eth = _formatNumber(tmp[4], 4)
    bal.pension.sol = _formatNumber(tmp[5], 2)
    for (var x in bal) {
      for(var y in bal[x]) {
        var tmp_wallet = await models.wallet.findOne({
          where : {
            user_id: req.user.user_id,
            account_categ: x,
            blockchain: y
          }
        })
        if(tmp_wallet != null) {
          tmp_wallet.balance = bal[x][y]
          tmp_wallet.save()
        }
        var tmp_apy = await models.apyrate.findOne({
          where: {
            coin: y,
            categ: x,
            [Op.or]: [
              { limit_high:'', limit_low: {[Op.lte]:bal[x][y]} },
              { limit_high:{[Op.gt]:bal[x][y]}, limit_low: {[Op.lte]:bal[x][y]} }
            ]
          }
        })
        apy[x][y] = tmp_apy.apyOpen
        // apy[x][y] = tmp_apy.apyCap
      }
    }
  }
  catch (error) {
    console.log(error);
  }

  res.send({state:'ok', token:req.token, bal:bal, apy:apy})
};

module.exports.setBalance = async () => {
  var lists = await models.wallet.findAll({})
  for (var x in lists) {
    switch(lists[x].blockchain) {
      case 'btc':
        _getBtcBalanceDB(lists[x]).then((ret) => {
          // console.log(ret[0].address, ret[1])
          ret[0].balance = ret[1]
          ret[0].save()
        })
        break;
      case 'eth':
        _getEthBalanceDB(lists[x]).then((ret) => {
          ret[0].balance = ret[1]
          ret[0].save()
        })
        break;
      case 'sol':
        _getSolBalanceDB(lists[x]).then((ret) => {
          ret[0].balance = ret[1]
          ret[0].save()
        })
        break;
    }
  }
}

const _formatNumber = (num, digit) => {
  var tmp = Number(parseFloat(num).toFixed(digit))
  var arr = String(tmp).split('.')
  arr[0] = arr[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  if(arr.length>1) {
    arr[0] = arr[0] + '.' + arr[1]
  }
  return arr[0]
}

const _getBtcBalanceDB = async (obj) => {
  return _getBtcBalance(obj.wif).then((bal) => {
    return [obj, bal]
  })
}
const _getBtcBalance = async (address) => {
  var cmd_str = `python btcbalance.py -f ${address} -n ${config.bitcoin_address}`
  var res_c = await exec(cmd_str)
  var tmp = res_c.stdout.split('\r\n')
  var ret = tmp[0].split('state=')[1]
  if(ret == 'ok') {
    return tmp[1].split('balance=')[1]
  }
  return 0
}
const _getEthBalanceDB = async (obj) => {
  return _getEthBalance(obj.address).then((bal) => {
    return [obj, bal]
  })
}
const _getEthBalance = async (address) => {
  var balance = await web3.eth.getBalance('0x'+address);
  return web3.utils.fromWei(balance)
}
const _getSolBalanceDB = async (obj) => {
  return _getSolBalance(obj.address).then((bal) => {
    return [obj, bal]
  })
}
const _getSolBalance = async (address) => {
  var connection = new solweb3.Connection(solweb3.clusterApiUrl(config.solana_address))
  var account = new solweb3.PublicKey(address)
  var balance = await connection.getBalance(account)
  return balance/solweb3.LAMPORTS_PER_SOL
}

const _getWalletAddr = async(pm_address) => {
  var user = await models.user.findOne({
    where: {
      email:pm_address
    }
  })
  if (user === null) return '';
  var wallets = await models.wallet.findAll({
    attributes: ['account_categ', 'blockchain', 'private', 'address', 'wif'],
    where: {
      user_id: user.id
    }
  })
  return wallets
}

