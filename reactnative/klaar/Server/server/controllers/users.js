const db = require('../db')
const ObjectId = require('mongoose').Types.ObjectId


module.exports = {
    getUserSubscribers: async(req,res) => {
        const subscribers = await db.main.User.getSibecribersList(req.person._id, req.person._id, parseInt(req.params.index))
        res.result.data = {
            subscribers
        }
    },
    getUserSubcribeOnProducts: async(req,res) => {
        const index = parseInt(req.params.index)
        const productsId = await db.main.User.getSubcribeOnProductsRaw(req.person._id, req.person._id, index, 30)
        if(!productsId.length) return res.result.data = {
            products: []
        }
        const products = await db.main.Product.getAviableListByIds(productsId, req.person._id, index)
        res.result.data = {
            products: products
        }
    },
    getUserSubcribeOnUsers: async(req,res) => {
        const users = await db.main.User.getSubcribeOnUsersList(req.person._id, req.person._id, parseInt(req.params.index))
        res.result.data = {
            users
        }
    },
    subscribe: async(req,res) => {
        const user = await db.main.User.getById(req.params.userId)
        await Promise.all([
            db.main.User.updateOne({ _id: req.person._id }, {
                $push: { 'subcribeOnUsers': { $each: [user._id], $position: 0 } } //unshift
            }).exec(),
            db.main.User.updateOne({ _id: user._id }, {
                $push: { 'subscribers': { $each: [req.person._id], $position: 0 } } //unshift
            }).exec()
        ])
    },
    unsubscribe: async(req,res) => {
        await Promise.all([
            db.main.User.updateOne({ _id: req.person._id }, {
                $pull: { 'subcribeOnUsers': ObjectId(req.params.userId) }
            }).exec(),
            db.main.User.updateOne({ _id: ObjectId(req.params.userId) }, {
                $pull: { 'subscribers': req.person._id }
            }).exec()
        ])     
    }
}