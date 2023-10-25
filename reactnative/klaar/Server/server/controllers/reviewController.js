const db = require('../db')
module.exports = {
    getListByForUserId: async(req,res) => {
        const reviews = await db.main.Review.getList(
            { forUser: req.params.userId },
            parseInt(req.params.index)
        )
        res.result.data = {
            reviews
        }        
    },
    getListByForProductId: async(req,res) => {
        const reviews = await db.main.Review.getList(
            { forProduct: req.params.productId },
            parseInt(req.params.index)
        )
        res.result.data = {
            reviews
        }        
    },
    getSelfList: async(req,res) => {
        const reviews = await db.main.Review.getList(
            { fromUser: req.person._id },
            parseInt(req.params.index)
        )
        res.result.data = {
            reviews
        }
    }
}