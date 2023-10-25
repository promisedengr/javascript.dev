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
const productsListSetImageUrl = async(products) => {
    for(let product of products) {
        product.seller.photo = minimalImage(product.seller.photo)
        if(product.mainPhoto) product.mainPhoto = minimalImage(product.mainPhoto)
        for(let i = 0; i < product.photos.length; i++) {
            product.photos[i] = minimalImage(product.photos[i])
        }
        for(let i = 0; i < product.colors.length; i++) {
            product.colors[i].photo = minimalImage(product.colors[i].photo)
        }
    }  
}
const pickupAddressSchema = new Schema({
    region: {type: String, maxlength: 30},
    city: {type: String, maxlength: 30},
    street: {type: String, maxlength: 60},
    houseNumber: {type: String, maxlength: 15},
    squareNumberOrOffice: {type: String, maxlength: 15},
    mailIndex: {type: String, maxlength: 10}
}, { _id: false, _v: false })
const colorProductSchema = new Schema({
    name: {type: String, maxlength: 20},
    photo: {type: String, maxlength: 100, get: minimalImage}
}, { _id: false, _v: false })
const deliveryMethodsSchema = new Schema({
    ruPost: {type: Boolean, default: false},
    pickup: {type: Boolean, default: false}
}, { _id: false, _v: false })
const productSchema = new Schema({
    name: {type: String, minlength: 3, maxlength: 50, required: true, match: /^([\d,a-z,A-Z, ]+|[\d,а-я,А-Я, ]+)$/},
    category: {type: Schema.Types.ObjectId, required: true, ref: 'Category'},
    subcategory: {type: String, minlength: 3, maxlength: 50, match: /^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$/},
    pickupAddress: {type: pickupAddressSchema},
    approved: {type: Boolean, default: false},
    hidden: {type: Boolean, default: false},
    couldBeEdited: {type: Boolean, default: true},
    description: {type: String, minlength: 5, maxlength: 500},
    mainPhoto: {type: String, maxlength: 100, default: 'images/products/default.jpg', get: minimalImage},
    photos: [ {type: String, maxlength: 100, get: originalImage} ],
    seller: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    subscribers:  [ {type: Schema.Types.ObjectId, ref: 'User'} ],
    currency: {type: String, enum: ['rub', 'usd']},
    deliveryMethods: {type: deliveryMethodsSchema},
    price: {type: Number, min: 1, max: 1000000, required: true, set: toFloat},
    colors: [ {type: colorProductSchema} ],
    sizes: [ {type: Number, min: 1, max: 99, set: toInt} ],
    buyers: [ {type: Schema.Types.ObjectId, ref: 'User'} ],
    apperDate: {type: Number, default: dateNowWithoutMsToInt()},
    _deleted: {type: Boolean, default: false},
    __v: {type: Number, select: false}
})
productSchema.statics = {
    create: async function(dataObject) {
        await washObject(dataObject)
        let product = new this(dataObject)
        product = await product.save()
        .then(savedProduct => {
            return savedProduct
        })
        return product
    },
    getOne: async function(query = {}, requestUserId = null) {
        query._deleted = false
        const productsAggregated = await this.aggregate()
        .match(query)
        .limit(1)
        .addFields({
            'youOwner': requestUserId ? { $eq: [ '$seller', ObjectId(requestUserId) ] } : false
        })
        .lookup({ //populate
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'categoryLookup'
        })
        .lookup({ //populate
            from: 'users',
            localField: 'seller',
            foreignField: '_id',
            as: 'sellerLookup'
        })
        .addFields({
            'category': { $arrayElemAt: ['$categoryLookup', 0] },
            'seller': { $arrayElemAt: ['$sellerLookup', 0] },
            'numSubscribers': { $cond: { if: { $isArray: "$subscribers" }, then: { $size: "$subscribers" }, else: 0 } },
            'youSubscribed': requestUserId ? { $in: [ ObjectId(requestUserId), "$subscribers" ] } : false     
        })
        .project({
            categoryLookup: 0,
            sellerLookup: 0,
            'seller.auth': 0,
            'seller.subscribers': 0,
            'seller.subcribeOnProducts': 0,
            'seller.subcribeOnUsers': 0,
            'seller.deliveryAddresses': 0,
            subscribers: 0,
            buyers: 0,
            __v: 0
        })
        if(!productsAggregated[0]) throw {httpStatus: 404, message: 'Product not found'}
        //images
        productsAggregated[0].seller.photo = minimalImage(productsAggregated[0].seller.photo)
        if(productsAggregated[0].mainPhoto) productsAggregated[0].mainPhoto = originalImage(productsAggregated[0].mainPhoto)
        for(let i = 0; i < productsAggregated[0].photos.length; i++) {
            productsAggregated[0].photos[i] = originalImage(productsAggregated[0].photos[i])
        }
        if(productsAggregated[0].colors) {
            for(let i = 0; i < productsAggregated[0].colors.length; i++) {
                productsAggregated[0].colors[i].photo = minimalImage(productsAggregated[0].colors[i].photo)
            }
        }
        return productsAggregated[0]
    },
    getAviableListBySeller: async function(sellerId, requestUserId = null, skip = 0, limit = 15) {
        const productsAggregated = await this.aggregate()
        .match({
            seller: ObjectId(sellerId),
            approved: true,
            hidden: false,
            _deleted: false
        })
        .skip(skip).limit(limit)
        .addFields({
            'youOwner': requestUserId ? { $eq: [ '$seller', ObjectId(requestUserId) ] } : false
        })
        .lookup({ //populate
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'categoryLookup'
        })
        .lookup({ //populate
            from: 'users',
            localField: 'seller',
            foreignField: '_id',
            as: 'sellerLookup'
        })
        .addFields({
            'category': { $arrayElemAt: ['$categoryLookup', 0] },
            'seller': { $arrayElemAt: ['$sellerLookup', 0] },
            'numSubscribers': { $cond: { if: { $isArray: "$subscribers" }, then: { $size: "$subscribers" }, else: 0 } },
            'youSubscribed': requestUserId ? { $in: [ ObjectId(requestUserId), "$subscribers" ] } : false       
        })
        .project({
            categoryLookup: 0,
            sellerLookup: 0,
            'seller.auth': 0,
            'seller.subscribers': 0,
            'seller.subcribeOnProducts': 0,
            'seller.subcribeOnUsers': 0,
            'seller.deliveryAddresses': 0,
            subscribers: 0,
            buyers: 0,
            __v: 0
        })
        if(!productsAggregated) return []
        await productsListSetImageUrl(productsAggregated)
        return productsAggregated
    },
    getAviableListByIds: async function(productsId, requestUserId = null, skip = 0, limit = 15) {
        for(let i = 0; i < productsId.length; i++) productsId[i] = ObjectId(productsId[i])
        const productsAggregated = await this.aggregate()
        .match({
            _id: { $in: productsId },
            approved: true,
            hidden: false,
            _deleted: false
        })
        .skip(skip).limit(limit)
        .addFields({
            'youOwner': (requestUserId) ? { $eq: [ '$seller', ObjectId(requestUserId) ] } : false
        })
        .lookup({ //populate
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'categoryLookup'
        })
        .lookup({ //populate
            from: 'users',
            localField: 'seller',
            foreignField: '_id',
            as: 'sellerLookup'
        })
        .addFields({
            'category': { $arrayElemAt: ['$categoryLookup', 0] },
            'seller': { $arrayElemAt: ['$sellerLookup', 0] },
            'numSubscribers': { $cond: { if: { $isArray: "$subscribers" }, then: { $size: "$subscribers" }, else: 0 } },
            'youSubscribed': (requestUserId) ? { $in: [ ObjectId(requestUserId), "$subscribers" ] } : false       
        })
        .project({
            categoryLookup: 0,
            sellerLookup: 0,
            'seller.auth': 0,
            'seller.subscribers': 0,
            'seller.subcribeOnProducts': 0,
            'seller.subcribeOnUsers': 0,
            'seller.deliveryAddresses': 0,
            subscribers: 0,
            buyers: 0,
            __v: 0
        })
        if(!productsAggregated) return []
        await productsListSetImageUrl(productsAggregated)
        return productsAggregated
    },
    getUnaviableList: async function(requestUserId = null, skip = 0, limit = 15) {
        const productsAggregated = await this.aggregate()
        .match({
            approved: false,
            _deleted: false
        })
        .sort({apperDate: -1})
        .skip(skip).limit(limit)
        .addFields({
            'youOwner': (requestUserId) ? { $eq: [ '$seller', ObjectId(requestUserId) ] } : false
        })
        .lookup({ //populate
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'categoryLookup'
        })
        .lookup({ //populate
            from: 'users',
            localField: 'seller',
            foreignField: '_id',
            as: 'sellerLookup'
        })
        .addFields({
            'category': { $arrayElemAt: ['$categoryLookup', 0] },
            'seller': { $arrayElemAt: ['$sellerLookup', 0] },
            'numSubscribers': { $cond: { if: { $isArray: "$subscribers" }, then: { $size: "$subscribers" }, else: 0 } },
            'youSubscribed': (requestUserId) ? { $in: [ ObjectId(requestUserId), "$subscribers" ] } : false       
        })
        .project({
            categoryLookup: 0,
            sellerLookup: 0,
            'seller.auth': 0,
            'seller.subscribers': 0,
            'seller.subcribeOnProducts': 0,
            'seller.subcribeOnUsers': 0,
            'seller.deliveryAddresses': 0,
            subscribers: 0,
            buyers: 0,
            __v: 0
        })
        if(!productsAggregated) return []
        await productsListSetImageUrl(productsAggregated)
        return productsAggregated  
    },
    getListBySeller: async function(sellerId, requestUserId = null, skip = 0, limit = 15) {
        const productsAggregated = await this.aggregate()
        .match({
            seller: ObjectId(sellerId),
            _deleted: false
        })
        .skip(skip).limit(limit)
        .addFields({
            'youOwner': (requestUserId) ? { $eq: [ '$seller', ObjectId(requestUserId) ] } : false
        })
        .lookup({ //populate
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'categoryLookup'
        })
        .lookup({ //populate
            from: 'users',
            localField: 'seller',
            foreignField: '_id',
            as: 'sellerLookup'
        })
        .addFields({
            'category': { $arrayElemAt: ['$categoryLookup', 0] },
            'seller': { $arrayElemAt: ['$sellerLookup', 0] },
            'numSubscribers': { $cond: { if: { $isArray: "$subscribers" }, then: { $size: "$subscribers" }, else: 0 } },
            'youSubscribed': requestUserId ? { $in: [ ObjectId(requestUserId), "$subscribers" ] } : false 
        })
        .project({
            categoryLookup: 0,
            sellerLookup: 0,
            'seller.auth': 0,
            'seller.subscribers': 0,
            'seller.subcribeOnProducts': 0,
            'seller.subcribeOnUsers': 0,
            'seller.deliveryAddresses': 0,
            subscribers: 0,
            buyers: 0,
            __v: 0
        })
        if(!productsAggregated) return []
        await productsListSetImageUrl(productsAggregated)
        return productsAggregated  
    },
    searchList: async function(requestUserId, skip, nameRegex = null, categoryId = null, subcategory = '', priceSort = 0) {
        const query = {
            'hidden': false,
            'approved': true,
            '_deleted': false
        }
        if(nameRegex) query.name = { $regex: new RegExp(nameRegex, 'i') }
        if(categoryId) query.category = ObjectId(categoryId)
        if(subcategory) query.subcategory = subcategory
        const sort = priceSort ? { price: priceSort } : { apperDate: -1 }
        const productsAggregated = await this.aggregate()
        .match(query)
        .sort(sort)
        .skip(skip).limit(15)
        .addFields({
            'youOwner': requestUserId ? { $eq: [ '$seller', ObjectId(requestUserId) ] } : false
        })
        .lookup({ //populate
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'categoryLookup'
        })
        .lookup({ //populate
            from: 'users',
            localField: 'seller',
            foreignField: '_id',
            as: 'sellerLookup'
        })
        .addFields({
            'category': { $arrayElemAt: ['$categoryLookup', 0] },
            'seller': { $arrayElemAt: ['$sellerLookup', 0] },
            'numSubscribers': { $cond: { if: { $isArray: "$subscribers" }, then: { $size: "$subscribers" }, else: 0 } },
            'youSubscribed': (requestUserId) ? { $in: [ ObjectId(requestUserId), "$subscribers" ] } : false       
        })
        .project({
            categoryLookup: 0,
            sellerLookup: 0,
            'seller.auth': 0,
            'seller.subscribers': 0,
            'seller.subcribeOnProducts': 0,
            'seller.subcribeOnUsers': 0,
            'seller.deliveryAddresses': 0,
            subscribers: 0,
            buyers: 0,
            __v: 0
        })
        if(!productsAggregated) return []
        await productsListSetImageUrl(productsAggregated)
        return productsAggregated
    },
    getListByUserReviwed: async function(userId, skip = 0, limit = 15) {
        const productsAggregated = await this.aggregate()
        .lookup({
            from: 'reviews',
            let: { 'productId': '$_id' },
            pipeline: [
                {
                    $match: { 
                        $expr: {
                            $and: [
                                { $eq: [ '$fromUser', ObjectId(userId) ] },
                                { $eq: [ '$forProduct', '$$productId' ]}
                            ]
                        }
                    }
                }
            ],
            as: 'reviewsLookup'            
        })
        .match({
            'reviewsLookup': { $not: { $size: 0 } },
            '_deleted': false
        })
        .skip(skip).limit(limit)
        .lookup({ //populate
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'categoryLookup'
        })
        .lookup({ //populate
            from: 'users',
            localField: 'seller',
            foreignField: '_id',
            as: 'sellerLookup'
        })
        .addFields({
            'category': { $arrayElemAt: ['$categoryLookup', 0] },
            'seller': { $arrayElemAt: ['$sellerLookup', 0] },
            'yourReview': { $arrayElemAt: ['$reviewsLookup', 0] },
            'numSubscribers': { $cond: { if: { $isArray: "$subscribers" }, then: { $size: "$subscribers" }, else: 0 } },
            'youOwner': (userId) ? { $eq: [ '$seller._id', ObjectId(userId) ] } : false,
            'youSubscribed': (userId) ? { $in: [ ObjectId(userId), "$subscribers" ] } : false       
        })
        .project({
            reviewsLookup: 0,
            categoryLookup: 0,
            sellerLookup: 0,
            'seller.auth': 0,
            'seller.subscribers': 0,
            'seller.subcribeOnProducts': 0,
            'seller.subcribeOnUsers': 0,
            'seller.deliveryAddresses': 0,
            subscribers: 0,
            buyers: 0,
            __v: 0
        })
        if(!productsAggregated) return []
        await productsListSetImageUrl(productsAggregated)
        return productsAggregated
    },
    getListByUserUnreviwed: async function(userId, skip = 0, limit = 15) {
        const productsAggregated = await this.aggregate()
        .match({
            'buyers': ObjectId(userId),
            '_deleted': false
        })
        .lookup({
            from: 'reviews',
            let: { 'productId': '$_id' },
            pipeline: [
                {
                    $match: { 
                        $expr: {
                            $and: [
                                { $eq: [ '$fromUser', ObjectId(userId) ] },
                                { $eq: [ '$forProduct', '$$productId' ]}
                            ]
                        }
                    }
                }
            ],
            as: 'reviewsLookup'            
        })
        .match({
            'reviewsLookup': { $eq: [] }
        })
        .skip(skip).limit(limit)
        .lookup({ //populate
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'categoryLookup'
        })
        .lookup({ //populate
            from: 'users',
            localField: 'seller',
            foreignField: '_id',
            as: 'sellerLookup'
        })
        .addFields({
            'category': { $arrayElemAt: ['$categoryLookup', 0] },
            'seller': { $arrayElemAt: ['$sellerLookup', 0] },
            'numSubscribers': { $cond: { if: { $isArray: "$subscribers" }, then: { $size: "$subscribers" }, else: 0 } },
            'youOwner': (userId) ? { $eq: [ '$seller._id', ObjectId(userId) ] } : false,
            'youSubscribed': (userId) ? { $in: [ ObjectId(userId), "$subscribers" ] } : false       
        })
        .project({
            reviewsLookup: 0,
            categoryLookup: 0,
            sellerLookup: 0,
            'seller.auth': 0,
            'seller.subscribers': 0,
            'seller.subcribeOnProducts': 0,
            'seller.subcribeOnUsers': 0,
            'seller.deliveryAddresses': 0,
            subscribers: 0,
            buyers: 0,
            __v: 0
        })
        if(!productsAggregated) return []
        await productsListSetImageUrl(productsAggregated)
        return productsAggregated
    },
    toDocument: async function(product) {
        if(product instanceof Document) return product
        return new this(product)
    },
    setData: async function(productId, dataToSet) {
        delete dataToSet._id
        delete dataToSet.seller
        //await washObject(dataToSet)
        if(!Object.keys(dataToSet).length) return
        const result = await this.updateOne({ _id: productId }, {
            $set: dataToSet
        })
        return result
    }
}
productSchema.set('toJSON', { 
    getters: true, 
    transform: function(doc, ret) { 
        delete ret.id
    }
})
module.exports = productSchema