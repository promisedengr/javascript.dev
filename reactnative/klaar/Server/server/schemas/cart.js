const {Schema, Document} = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId
const {toInt, toFloat, dateNowWithoutMsToInt} = require('../helpers/setDataHelper')

const productInChartSchema = new Schema({
    product: {type: Schema.Types.ObjectId, required: true, ref: 'Product'},
    seller: {type: Schema.Types.ObjectId, ref: 'User'},
    currency: {type: String, enum: [ 'usd', 'rub' ]},
    pricePerOne: {type: Number, min: 1, max: 1000000, set: toFloat},
    amount: {type: Number, min: 1, max: 100, set: toInt},
    deliveryMethod: {type: String, enum: [ 'ruPost', 'pickup' ] },
    size: {type: Number, min: 1, max: 99, set: toInt},
    color: {type: Number, min: 0, max: 7, set: toInt}
}, { _id: false, _v: false })
const cartSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, required: true, unique: true, ref: 'User'},
    products: [ {type: productInChartSchema} ],
    apperDate: {type: Number, default: dateNowWithoutMsToInt()},
    __v: {type: Number, select: false}
})

cartSchema.statics = {
    create: async function(userId) {
        let cart = new this({
            owner: userId,
            products: [],
            apperDate: dateNowWithoutMsToInt()
        })
        cart = await cart.save()
        .then( savedCart => {
            return savedCart
        })
        return cart
    },
    getById: async function(cartId) {
        const cart = await this.findOne({ _id: cartId })
        .populate('products.product', {
            subscribers: 0, buyers: 0
        })
        .populate('products.seller', {
            fn: 1, ln: 1,
            phone: 1, photo: 1,
            country: 1, email: 1,
            rating: 1, apperDate: 1
        })
        if(!cart) throw {httpStatus: 404, message: 'Cart not found'}
        return cart
    },
    getByOwner: async function(ownerId) {
        const cart = await this.findOne({ owner: ownerId })
        .populate('products.product', {
            subscribers: 0, buyers: 0
        })
        .populate('products.seller', {
            fn: 1, ln: 1,
            phone: 1, photo: 1,
            country: 1, email: 1,
            rating: 1, apperDate: 1
        })
        if(!cart) throw {httpStatus: 404, message: 'Cart not found'}
        return cart        
    },
    toDocument: async function(cart) {
        if(cart instanceof Document) return cart
        return new this(cart)
    }
}
cartSchema.methods = {
    clear: async function() {
        this.products = []
        await this.save()
    },
    addProduct: async function(productId, sellerId, pricePerOne, amount, deliveryMethod, size = 0, color = -1) {
        if(this.products.length > 14) throw {httpStatus: 409, message: 'Cart is full'}
        const product = {
            product: ObjectId(productId),
            seller: ObjectId(sellerId),
            pricePerOne,
            amount,
            deliveryMethod
        }
        if(size) product.size = toInt(size)
        if(color !== -1) product.color = toInt(color)
        this.products.unshift(product)
        await this.save()
    },
    removeProduct: async function(productIndex = -1) {
       if(this.products[productIndex]) {
           this.products.splice(productIndex, 1)
           await this.save()
       }
    },
    changeProductsAmount: async function(data = {}) {
        let i = 0
        for(let index of Object.keys(data)) {
            if(i > 14) return
            if(index.length > 2 || typeof data[index] !== 'number') throw {httpStatus: 400, message: 'Bad data'}
            if(this.products[index]) this.products[index]['amount'] = toInt(data[index])
            i++
        }
        await this.save()
    }
}
cartSchema.set('toJSON', { 
    getters: true, 
    transform: function(doc, ret) { 
        delete ret.id
    }
})
module.exports = cartSchema