const {Schema, Document} = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId
const {toInt, toFloat, addPrefix, dateNowWithoutMsToInt} = require('../helpers/setDataHelper')
const {washObject} = require('../helpers/validationHelper')
const minimalImage = string => {
    if(!string) return null
    return addPrefix(string).replace(/\.jpg/, '_small.jpg')
}
const originalImage = string => {
    if(!string) return null
    return addPrefix(string).replace(/\.jpg/, '_orig.jpg')
}
const reviewSchema = new Schema({
    fromUser: {type: Schema.Types.ObjectId, ref: 'User'},
    forProduct: {type: Schema.Types.ObjectId, ref: 'Product'},
    forUser: {type: Schema.Types.ObjectId, ref: 'User'},
    grade: {type: Number, min: 1, max: 5, set: toInt},
    text: {type: String, minlength: 5, maxlength: 500 },
    apperDate: {type: Number, default: dateNowWithoutMsToInt()}
})
reviewSchema.statics = {
    create: async function(fromUserId, forProductId, forUserId, grade, text) {
        let review = new this({
            fromUser: fromUserId,
            forProduct: forProductId,
            forUser: forUserId,
            grade,
            text,
            apperDate: dateNowWithoutMsToInt()
        })
        review = await review.save()
        .then(savedReview => {
            return savedReview
        })
        return review
    },
    getOne: async function(query = {}) {
        const review = await this.findOne(query)
        .populate('fromUser', {
            fn: 1, ln: 1,
            phone: 1, photo: 1,
            country: 1, email: 1,
            rating: 1, apperDate: 1
        })
        .populate('forProduct', {
            name: 1, category: 1,
            subcategory: 1, approved: 1,
            hidden: 1, couldBeEdited: 1,
            mainPhoto: 1, currency: 1,
            price: 1, apperDate: 1
        })
        .populate('forUser', {
            fn: 1, ln: 1,
            phone: 1, photo: 1,
            country: 1, email: 1,
            rating: 1, apperDate: 1           
        })
        if(!review) throw {httpStatus: 404, message: 'Review not found'}
        return review
    },
    getList: async function(query = {}, skip = 0, limit = 15) {
        const reviews = await this.find(query)
        .populate('fromUser', {
            fn: 1, ln: 1,
            phone: 1, photo: 1,
            country: 1, email: 1,
            rating: 1, apperDate: 1
        })
        .populate('forProduct', {
            name: 1, category: 1,
            subcategory: 1, approved: 1,
            hidden: 1, couldBeEdited: 1,
            mainPhoto: 1, currency: 1,
            price: 1, apperDate: 1
        })
        .sort({ apperDate: -1 })
        .skip(skip).limit(limit)
        if(!reviews) return []
        return reviews
    }
}
reviewSchema.set('toJSON', { 
    getters: true, 
    transform: function(doc, ret) { 
        delete ret.id
    }
})
module.exports = reviewSchema