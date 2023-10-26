const Item = require('../model/item.model')
const User = require('../model/user.model')
const ItemMallHistory = require('../model/item_mall_histories.model')

const mssql = require('../utils/mssql')

async function sample (req, res, next){
    try {
        console.log('connected to file')
        res.json({list: 'okay'})
    } catch (error) {
        console.log('api/controller/item.controller/sample' + error)
    }
}
async function getItemList (req, res, next){
    try {
        console.log(req.body)
        Item.findItemsOnCategory(req.body, (err, data) => {
            if (err == 1) {
                res.send({list: data, total: 0})
            } else if (err == 0){
                res.status(404).send()
            } else {
                Item.getTotalCountByCategory(req.body, (err, count) => {
                    res.send({list: data, total: count.total})
                })
            }
        });
    } catch (error) {
        console.log('api/controller/item.controller/getCategoryList' + error)
    }
}
async function doBuyItem (req, res, next){
    try {
        console.log(req.body)
        User.findById(req.user.id, (err, user) => {
            if (user) {
                Item.findById(req.body.item, (err, item) => {
                    if (item) {
                        if (user.coin >= item.price) {
                            user.coin = user.coin - item.price
                            User.updateById(req.user.id, user, (err, result) => {
                                if (result) {
                                    var history = new ItemMallHistory({
                                        user_id: user.id,
                                        server_id: user.netType,
                                        item_name: item.name,
                                        item_price: item.price,
                                        item_img: item.image,
                                        date: '2022-10-26',
                                    })
                                    ItemMallHistory.create(history, (err, final) => {
                                        if (final) {
                                            mssql._saveItemInfo(user.name, item.item_id, item.count, user.netType)
                                            res.json({type: 0})
                                        } else
                                            res.json({type: 1})
                                    })
                                } else
                                    res.json({type: 1})
                            })
                        } else
                            res.json({type: 1})
                    } else
                        res.json({type: 1})
                })
            } else
                res.json({type: 1})
        })
    } catch (error) {
        console.log('api/controller/item.controller/doBuyItem' + error)
    }
}
module.exports = {
    getItemList,
    doBuyItem
}