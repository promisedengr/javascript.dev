const db = require('../db')
const ObjectId = require('mongoose').Types.ObjectId
const compareIds = require('../helpers/compareIds')

const cartController = {
    getByOwner: async(req, res) => {
        let cart = await db.main.Cart.getByOwner(req.person._id)
        if(!cart) cart = await db.main.Cart.create(req.person._id)       
        res.result.data = cart
    },
    addProduct: async(req, res) => {
        let [cart, product, existProductfromCart] = await Promise.all([
            //cart
            db.main.Cart.findOne({ owner: req.person._id }).exec(),
            //product
            db.main.Product.getOne({ _id: ObjectId(req.body.productId) }, req.person._id),
            //existProductfromCart
            db.main.Cart.findOne(
                {owner: req.person._id, 'products.product': ObjectId(req.body.productId)},
                {'products.$': 1}
            ).exec()
        ])
        if(!cart) cart = await db.main.Cart.create(req.person._id)
        if(existProductfromCart) throw {httpStatus: 409, message: 'Product already in cart'}
        if(product.category.requiredFields.sizes && typeof req.body.size !== 'number') throw {httpStatus: 400, message: 'Size is required'}
        if(product.category.requiredFields.colors && typeof req.body.color !== 'number') throw {httpStatus: 400, message: 'Color is required'}
        if(!product.deliveryMethods[req.body.deliveryMethod]) throw {httpStatus: 400, message: 'Product does not support the selected delivery method'}
        if(product.category.requiredFields.sizes && !product.sizes.includes(req.body.size)) throw {httpStatus: 400, message: 'Product not have specified size'}
        if(product.category.requiredFields.colors && !product.colors[req.body.color]) throw {httpStatus: 400, message: 'Product not have specified color'}
        if(compareIds(req.person.id, product.seller)) throw {httpStatus: 403, message: 'You seller'}        
        await cart.addProduct(
            product._id,
            product.seller._id ? product.seller._id : product.seller,
            product.price,
            req.body.amount,
            req.body.deliveryMethod,
            req.body.size,
            req.body.color)
    },
    removeProduct: async(req, res) => {
        let cart = await db.main.Cart.findOne({ owner: req.person._id })
        if(!cart) {
            cart = await db.main.Cart.create(req.person._id)
            return
        }
        await cart.removeProduct(parseInt(req.params.index))
    },
    clear: async(req, res) => {
        let cart = await db.main.Cart.findOne({ owner: req.person._id })
        if(!cart) {
            cart = await db.main.Cart.create(req.person._id)
            return
        }
        await cart.clear()
    },
    changeProductsAmount: async(req,res) => {
        let cart = await db.main.Cart.findOne({ owner: req.person._id })
        if(!cart) {
            cart = await db.main.Cart.create(req.person._id)
            return
        }
        await cart.changeProductsAmount(req.body.data)       
    }
}
module.exports = cartController