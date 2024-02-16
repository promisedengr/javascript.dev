const models = require('./../db/models')
const { Op } = require("sequelize")

exports.read_tranaction = async (req, res) => {
  const user = await models.user.findOne({
    where: {
      email: req.user.email
    }
  });

  const wallets = await models.wallet.findAll({
    where: {
      user_id: user.id
    }
  })

  var where_cond = []
  for(var x in wallets) {
    var str = wallets[x].address
    if(wallets[x].blockchain=='eth') str = '0x' + str
    where_cond.push({addr_from: str})
    where_cond.push({addr_to: str})
  }
  var logs = await models.transaction.findAll({
    where: {
      [Op.or]: where_cond
    }
  })
  res.send({state:'ok', token:req.token, logs:logs})
}


exports.all_tranaction = async (req, res) => {
  var logs = await models.transaction.findAll({
    limit: 5
  })
  res.send({state:'ok', logs:logs})
}