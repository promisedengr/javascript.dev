const {Schema, Document} = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId
const {toInt, toFloat, addPrefix, dateNowWithoutMsToInt} = require('../helpers/setDataHelper')
const {washObject} = require('../helpers/validationHelper')
const bcrypt = require('bcrypt')
const minimalImage = string => {
    if(!string) return null
    return addPrefix(string).replace(/\.jpg/, '_small.jpg')
}
const originalImage = string => {
    if(!string) return null
    return addPrefix(string).replace(/\.jpg/, '_orig.jpg')
}
const authUserSchema = new Schema({
    role: {type: String, required: true, enum: ['buyer', 'seller', 'admin'], default: 'buyer'},
    password: {type: String, maxlength: 100},
    sessionId: {type: String, maxlength: 8},
    autorized: {type: Boolean, default: false},
    activated: {type: Boolean, default: false},
    activateCode: {type: String, maxlength: 100, required: true},
    forgotCode: {type: String, maxlength: 100},
    forgotExpiresAt: {type: Number}
}, { _id: false, _v: false })
const deliveryAddressesUserSchema = new Schema({
    region: {type: String, maxlength: 30},
    city: {type: String, maxlength: 30},
    street: {type: String, maxlength: 60},
    houseNumber: {type: String, maxlength: 15},
    squareNumberOrOffice: {type: String, maxlength: 15},
    mailIndex: {type: String, maxlength: 10}
}, { _id: false, _v: false })
const userSchema = new Schema({
    fn: {type: String, minlength: 2, maxlength: 50, match: /^([a-z,A-Z]+|[а-я,А-Я]+)$/},
    ln: {type: String, minlength: 3, maxlength: 50, match: /^([a-z,A-Z]+|[а-я,А-Я]+)$/},
    bday: {type: Number},
    phone: {type: String, maxlength: 15, match: /^\+\d+$/},
    photo: {type: String, maxlength: 100, default: 'images/users/default.jpg', get: minimalImage},
    country: {type: String, maxlength: 50, match: /^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$/},
    email: {type: String, minlength: 5, maxlength: 50, unique: true, match: /^[\w,\.,\-]+\@\w+\.\w+$/}, 
    rating: {type: Number, min: 0, max: 5, default: 0, set: toFloat},
    auth: {type: authUserSchema},
    numProducts: {type: Number, min: 0, max: 1000000, default: 0, set: toInt},
    numAvaibleProducts: {type: Number, min: 0, max: 1000000, default: 0, set: toInt},
    numReviews: {type: Number, min: 0, max: 1000000, default: 0, set: toInt},
    subscribers: [ {type: Schema.Types.ObjectId, ref: 'User'} ],
    subcribeOnProducts: [ {type: Schema.Types.ObjectId, ref: 'Product'} ],
    subcribeOnUsers: [ {type: Schema.Types.ObjectId, ref: 'User'} ],
    deliveryAddresses: [ {type: deliveryAddressesUserSchema} ],
    apperDate: {type: Number, default: dateNowWithoutMsToInt()},
    __v: {type: Number, select: false}
})

userSchema.statics = {
    create: async function(hashedActivateCode, hashedPass, email, fn, ln) {
        let user = new this({    
            email: email.toLowerCase().trim(),
            fn: fn.trim(),
            ln: ln.trim(),
            numReviews: 0,
            subscribers: [],
            subcribeOnProducts: [],
            subcribeOnUsers: [],
            deliveryAddresses: [],
            apperDate: dateNowWithoutMsToInt(),
            auth: {
                role: 'buyer',
                password: hashedPass,
                sessionId: null,
                autorized: false,
                activated: false,
                activateCode: hashedActivateCode,
                forgotCode: null,
                forgotExpiresAt: null        
            }
        })
        user = await user.save()
        .then(savedUser => {
            return savedUser
        })
        return user
    },
    getById: async function(userId) {
        const user = await this.findOne({ _id: userId }, { subscribers: 0, subcribeOnProducts: 0, subcribeOnUsers: 0})
        if(!user) throw {httpStatus: 404, message: 'User not found'}
        return user
    },
    getByPhone: async function(phoneNumber) {
        const user = await this.findOne({ phone: phoneNumber }, { subscribers: 0, subcribeOnProducts: 0, subcribeOnUsers: 0})
        if(!user) throw {httpStatus: 404, message: 'User not found'}
        return user
    },
    getByEmail: async function(email) {
        const user = await this.findOne({ email }, { subscribers: 0, subcribeOnProducts: 0, subcribeOnUsers: 0})
        if(!user) throw {httpStatus: 404, message: 'User not found'}
        return user
    },
    getProfile: async function(userId, requestUserId = null) {
        const userAggregated = await this.aggregate()
        .match({ _id: ObjectId(userId) })
        .addFields({
            'role': '$auth.role',
            'numSubscribers': { $cond: { if: { $isArray: "$subscribers" }, then: { $size: "$subscribers" }, else: 0 } },
            'numSubcribeOnProducts': { $cond: { if: { $isArray: "$subcribeOnProducts" }, then: { $size: "$subcribeOnProducts" }, else: 0 } },
            'numSubcribeOnUsers': { $cond: { if: { $isArray: "$subcribeOnUsers" }, then: { $size: "$subcribeOnUsers" }, else: 0 } },
            'youSubscribed': requestUserId ? { $in: [ ObjectId(requestUserId), "$subcribeOnUsers" ] } : false   
        })
        .project({
            'subcribeOnProducts': 0,
            'subscribers': 0,
            'subcribeOnUsers': 0,
            'deliveryAddresses': 0,
            'auth': 0,
            '__v': 0
        })
        if(!userAggregated[0]) throw { httpStatus: 404, message: 'User not found' }
        userAggregated[0].photo = originalImage(userAggregated[0].photo)
        return userAggregated[0]
    },
    getDeliveryAddresses: async function(id) {
        const userWithAddresses = await this.findOne({ _id: id }, { deliveryAddresses: 1 })
        if(!userWithAddresses) throw {httpStatus: 404, message: 'User not found'}
        if(!userWithAddresses.deliveryAddresses) return []
        return userWithAddresses.deliveryAddresses
    },
    getSubcribeOnProductsRaw: async function(userId, requestUserId = null, skip = 0, limit = 15) {
        const userWithSubcribeOnProducts = await this.findOne({ _id: userId }, { subcribeOnProducts: { $slice: [skip, limit] } })
        if(!userWithSubcribeOnProducts || !userWithSubcribeOnProducts.subcribeOnProducts) return []
        return userWithSubcribeOnProducts.subcribeOnProducts
    },
    getSubcribeOnUsersList: async function(userId, requestUserId = null, skip = 0, limit = 15) {
        const userWithSubcribeOnUsers  = await this.findOne({ _id: userId }, { subcribeOnUsers: { $slice: [skip, limit] } })
        if(!userWithSubcribeOnUsers || !userWithSubcribeOnUsers.subcribeOnUsers.length) return []
        const usersAggregated = await this.aggregate()
        .match({ _id: { $in: userWithSubcribeOnUsers.subcribeOnUsers } })
        .addFields({
            'numSubscribers': { $cond: { if: { $isArray: "$subscribers" }, then: { $size: "$subscribers" }, else: 0 } },
            'numSubcribeOnProducts': { $cond: { if: { $isArray: "$subcribeOnProducts" }, then: { $size: "$subcribeOnProducts" }, else: 0 } },
            'numSubcribeOnUsers': { $cond: { if: { $isArray: "$subcribeOnUsers" }, then: { $size: "$subcribeOnUsers" }, else: 0 } },
            'youSubscribed': (requestUserId) ? true : false  //attention: user can get only self subcribeOnUsers 
        })
        .project({
            'subcribeOnProducts': 0,
            'subscribers': 0,
            'subcribeOnUsers': 0,
            'deliveryAddresses': 0,
            'auth': 0,
            '__v': 0
        })
        if(!usersAggregated) return []
        return usersAggregated
    },
    getSibecribersList: async function(userId, requestUserId = null, skip = 0, limit = 15) {
        const userWithSubscribers  = await this.findOne({ _id: userId }, { subscribers: { $slice: [skip, limit] } })
        if(!userWithSubscribers || !userWithSubscribers.subscribers.length) return []
        const usersAggregated = await this.aggregate()
        .match({ _id: { $in: userWithSubscribers.subscribers } })
        .addFields({
            'numSubscribers': { $cond: { if: { $isArray: "$subscribers" }, then: { $size: "$subscribers" }, else: 0 } },
            'numSubcribeOnProducts': { $cond: { if: { $isArray: "$subcribeOnProducts" }, then: { $size: "$subcribeOnProducts" }, else: 0 } },
            'numSubcribeOnUsers': { $cond: { if: { $isArray: "$subcribeOnUsers" }, then: { $size: "$subcribeOnUsers" }, else: 0 } },
            'youSubscribed': (requestUserId) ? { $in: [ ObjectId(requestUserId), "$subcribeOnUsers" ] } : false   
        })
        .project({
            'subcribeOnProducts': 0,
            'subscribers': 0,
            'subcribeOnUsers': 0,
            'deliveryAddresses': 0,
            'auth': 0,
            '__v': 0
        })
        if(!usersAggregated) return []
        return usersAggregated
    },
    toDocument: async function(user) {
        if(user instanceof Document) return user
        return new this(user)
    }
}
userSchema.methods = {
    setData: async function(dataToSet) {
        delete dataToSet._id
        delete dataToSet.auth
        await washObject(dataToSet)
        if(!Object.keys(dataToSet).length) return
        for(let key of Object.keys(dataToSet)) this[key] = dataToSet[key]
        await this.save()
    },
    comparePassword: async function(unhashedPass = '') {
        const isMatch = await bcrypt.compare(unhashedPass, this.auth.password)
        if(!isMatch) throw {httpStatus: 403, message: 'Wrong password'}
        return true
    },
    compareActivateCode: async function(unhashedCode = '') {
        const isMatch = await bcrypt.compare(unhashedCode, this.auth.activateCode)
        if(!isMatch) throw {httpStatus: 403, message: 'Wrong code'}
        return true
    },
    compareForgotCode: async function(unhashedCode = '') {
        if(this.auth.forgotExpiresAt < dateNowWithoutMsToInt()) throw {httpStatus: 409, message: 'Code expired'}
        const isMatch = await bcrypt.compare(unhashedCode, this.auth.forgotCode)
        if(!isMatch) throw {httpStatus: 403, message: 'Wrong code'}
        return true
    }
}
userSchema.set('toJSON', { 
    getters: true, 
    transform: function(doc, ret) { 
        delete ret.id
    }
})
module.exports = userSchema