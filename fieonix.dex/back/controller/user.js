const models = require('./../db/models');
const { Op } = require("sequelize")
const jwt = require("jsonwebtoken");
var axios = require('axios');
var cmd=require('node-cmd');
const config = process.env;

exports.create = async (req, res) => {
  // console.log(req.body)
  const user = models.user.build(req.body);
  // console.log(user instanceof models.user);
  // console.log(user.toJSON());
  var tmp = ''
  for (var x in req.body) {
    tmp = tmp + req.body[x]
  }
  user.uuid = _hashCode(tmp)
  user.uuid = await _validateUUid(user.uuid)
  await user.save();

  const accounts = ['interest', 'pension']
  const chains = ['eth', 'btc', 'sol']
  for (x in accounts) {
    console.log('-------------------')
    var ret = await _generatwallet()
    console.log(ret)
    for (y in chains) {
      const wallet = models.wallet.build({
        user_id: user.id,
        account_categ: accounts[x],
        blockchain: chains[y],
        private: ret[y].private,
        public: ret[y].public,
        address: ret[y].address,
        wif: ret[y].wif
      });
      await wallet.save();
    }
  }

  res.send('ok')
}

const _validateUUid = async (pm) => {
  var ret = pm
  var lists = await models.user.findAll({
    where: {
      uuid : ret
    }
  })
  while(lists.length>0) {
    ret ++;
    lists = await models.user.findAll({
      where: {
        uuid : ret
      }
    })
  }
  return ret
}

const _hashCode = (str) => {
  var hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
};

const _generatwallet = async() => {
  var data = JSON.stringify({});
  var reqconfig = {
    method: 'post',
    url: config.blockcypher_eth_development+'/addrs',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  var res1 = await axios(reqconfig);
  res1 = res1.data;
  reqconfig.url = config.blockcypher_btc_development+'/addrs'
  var res2 = await axios(reqconfig);
  res2 = res2.data;
  
  const res_c = cmd.runSync(`solana-keygen new --no-bip39-passphrase --no-outfile`)
  var tmp = res_c.data.split('\n')
  var sol_pub = tmp[2].split('pubkey: ')[1];
  var sol_seed = tmp[5];
  var res3 = {
    private: '',
    public: '',
    address: sol_pub,
    wif: sol_seed
  }
  res1.wif = ''
  return [res1, res2, res3]
}

exports.read = async (req, res) => {
  const users = await models.user.findAll();
  console.log(users.every(user => user instanceof models.user)); // true
  console.log("All users:", JSON.stringify(users, null, 2));
  res.send('no setting')
}

exports.login = async (req, res) => {
  var user = await models.user.findOne({
    where: {
      email:req.body.email
    }
  })
  if (user === null) {
    res.send({state:'no_exist'})
  }
  else {
    if(user.locked==1) {
      res.send({state:'locked'})
    }
    else if(user.deleted==1) {
      res.send({state:'deleted'})
    }
    else {
      const token = jwt.sign(
        { user_id: req.body.email, email:req.body.email },
        config.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      var wallets = await models.wallet.findAll({
        attributes: ['account_categ', 'blockchain', 'address'],
        where: {user_id:user.id}
      })
      res.send({state:'ok', token:token, wallet:wallets, isAdmin:(user.isAdmin?1:0), name:user.firstName+' '+user.lastName, avata:user.avata})
    }
  }
}

exports.isAdmin = async (req, res) => {
  var user = await models.user.findOne({
    where:{
      email: req.user.email
    }
  })
  if(user==null) {
    res.send('0')
  }
  else {
    if(user.isAdmin==1) {
      res.send('1')
    }
    else {
      res.send('0')
    }
  }
}

exports.filter_user = async (req, res) => {
  var user = await models.user.findOne({
    attributes: ['id', 'firstName', 'lastName', 'email', 'country', 'phone', 'uuid', 'createdAt', 'activedAt', 'locked', 'deleted', 'twoFact', 'passChg'],
    where:{
      [Op.and]: [
        {[Op.or]: [
          { email: {[Op.substring]:req.body.filter} },
          { uuid: {[Op.substring]:req.body.filter} }
        ]},
        { deleted: 0 }
      ]
    }
  })
  if(user==null) {
    res.send({state:'none'})
  }
  else {
    var wallets = await models.wallet.findAll({
      attributes: ['account_categ', 'blockchain', 'balance'],
      where : {
        user_id: user.id
      }
    })
    res.send({state:'ok', user:user, wallets:wallets})
  }
}

exports.action_user = async (req, res) => {
  var user = await models.user.findOne({
    where:{
      id: req.body.user
    }
  })
  if(user==null) {
    res.send({state:'none'})
  }
  else {
    switch(req.body.action) {
      case 1:
        user.twoFact = 0
        break;
      case 2:
        user.passChg = 0
        break;
      case 3:
        user.locked = 1 - user.locked
        break;
      case 4:
        user.deleted = 1
        break;
    }
    user.save()
    res.send({state:'ok'})
  }
}

exports.get_user = async (req, res) => {
  var user = await models.user.findOne({
    where:{
      email: req.user.email
    }
  })
  if(user!=null) {
    res.send({state:'ok',user:user})
  }
  else {
    res.send({state:'err'})
  }
}

exports.set_avata = async (req, res) => {
  var user = await models.user.findOne({
    where:{
      email: req.user.email
    }
  })
  if(user!=null) {
    user.avata=req.body.avata
    await user.save()
    res.send({state:'ok'})
  }
  else {
    res.send({state:'err'})
  }
}
