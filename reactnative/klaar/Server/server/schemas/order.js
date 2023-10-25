const {Schema, Document} = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId
const {toInt, toFloat, addPrefix, dateNowWithoutMsToInt} = require('../helpers/setDataHelper')
const stripeManager = require('../process/stripeManager')
const minimalImage = string => {
    if(!string) return null
    return addPrefix(string).replace(/\.jpg/, '_small.jpg')
}
const originalImage = string => {
    if(!string) return null
    return addPrefix(string).replace(/\.jpg/, '_orig.jpg')
}
const productInOrderSchema = new Schema({
    product: {type: Schema.Types.Mixed}, // ref: 'Product'
    seller: {type: Schema.Types.Mixed}, // ref: 'User'
    currency: {type: String, enum: [ 'usd', 'rub' ]},
    pricePerOne: {type: Number, min: 1, max: 1000000, set: toFloat},
    amount: {type: Number, min: 1, max: 100, set: toInt},
    size: {type: Number, min: 1, max: 99, set: toInt},
    color: {type: Number, min: 0, max: 7, set: toInt}
}, { _id: false, _v: false })
const deliveryAddressSchema = new Schema({
    region: {type: String, maxlength: 30},
    city: {type: String, maxlength: 30},
    street: {type: String, maxlength: 60},
    houseNumber: {type: String, maxlength: 15},
    squareNumberOrOffice: {type: String, maxlength: 15},
    mailIndex: {type: String, maxlength: 10}
}, { _id: false, _v: false })
const orderSchema = new Schema({
    buyer: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    seller: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    status: {type: String, enum: ['waitConfirm', 'waitPayment', 'inProgress', 'done']},
    stripeOrder: {type: Schema.Types.Mixed},
    total: {type: Number, min: 1, max: 1000000, set: toFloat},
    deliveryAddress: {type: deliveryAddressSchema},
    deliveryMethod: {type: String, enum: [ 'ruPost', 'pickup' ] },
    currency: {type: String, enum: [ 'usd' ]},
    products: [ {type: productInOrderSchema } ],
    apperDate: {type: Number, default: dateNowWithoutMsToInt()},
    __v: {type: Number, select: false}
})
orderSchema.statics = {
    create: async function(buyerFullName, buyerId, sellerId, productsFromCart, deliveryMethod, deliveryAddress) {
        const stripeOrder = await stripeManager.orders.create(
            productsFromCart,
            buyerFullName,
            deliveryAddress
        )
        let order = new this({
            buyer: buyerId,
            seller: sellerId,
            status: 'waitPayment',
            stripeOrder,
            total: toFloat(stripeOrder.amount / 100),
            deliveryAddress,
            deliveryMethod,
            currency: stripeOrder.currency,
            products: productsFromCart,
            apperDate: dateNowWithoutMsToInt()
        })
        order = await order.save()
        .then(savedOrder => {
            return savedOrder
        })
        return order
    },
    getById: async function(orderId) {
        const order = await this.findOne({ _id: orderId})
        .populate('buyer', {
            fn: 1, ln: 1,
            phone: 1, photo: 1,
            country: 1, email: 1,
            rating: 1, apperDate: 1
        })
        .populate('seller', {
            fn: 1, ln: 1,
            phone: 1, photo: 1,
            country: 1, email: 1,
            rating: 1, apperDate: 1
        })
        if(!order) throw {httpStatus: 404, message: 'Order not found'}
        for(let prodElem of order.products) prodElem.product.mainPhoto = minimalImage(prodElem.product.mainPhoto)       
        return order
    },
    getListByUserId: async function(userId, skip = 0, limit = 15) {
        const ordersList = await this.find({
            $or: [
                { 'buyer': userId },
                { 'seller': userId }
            ]
        }, 
        {
            products: 0,
            stripeOrder: 0
        })
        .sort({ apperDate: -1 })
        .skip(skip).limit(limit)
        .populate('buyer', {
            fn: 1, ln: 1,
            phone: 1, photo: 1,
            country: 1, email: 1,
            rating: 1, apperDate: 1
        })
        .populate('seller', {
            fn: 1, ln: 1,
            phone: 1, photo: 1,
            country: 1, email: 1,
            rating: 1, apperDate: 1
        })
        if(!ordersList) return []
        return ordersList
    }
}
orderSchema.methods = {
    setStatus: async function(newStatus) {
        if(newStatus === 'inProgress' && this.status == 'waitPayment') { //only can admin
            this.status = 'inProgress'
        }
        else if(newStatus === 'done' && this.status == 'inProgress') {
            this.status = 'done'
        } else {
            throw { httpStatus: 400, message: 'Bad new status of order'}
        }
        await this.save()
    },
    pay: async function(token) {
        if(this.status !== 'waitPayment') throw {httpStatus: 403, message: 'Order not awaiting payment', description: 'status !== \'waitPayment\''}
        const paidStripeOrder = await stripeManager.orders.pay(this.stripeOrder.id, token, this.buyer.email)
        if(paidStripeOrder.status === 'paid') {
            this.stripeOrder = paidStripeOrder
            this.status = 'inProgress'
            await this.save()
        } else {
            throw {httpStatus: 403, message: 'Not paid'}
        }
    }
}
orderSchema.set('toJSON', {
    getters: true, 
    transform: function(doc, ret) { 
        delete ret.id
    }
})
module.exports = orderSchema