const db = require('../db')
const monq = require('../monq')
const deleteFile = require('../process/deleteFile')
const ObjectId = require('mongoose').Types.ObjectId
const {toFloat, dateNowWithoutMsToInt} = require('../helpers/setDataHelper')
const stripeManager = require('../process/stripeManager')
const compareIds = require('../helpers/compareIds')

module.exports = {
    create: async(req,res) => {
        const category = await db.main.Category.getById(req.body.category)
        if(!category.subcategories.includes(req.body.subcategory)) throw {httpStatus: 400, message: 'Incorrect subcategory'}
        const data = {
            category: category._id,
            subcategory: req.body.subcategory,
            approved: false,
            hidden: false,
            couldBeEdited: true,
            photos: [],
            colors: [],
            seller: req.person._id,
            subscribers: [],
            deliveryMethods: {},
            sizes: [],
            apperDate: dateNowWithoutMsToInt()
        }
        if(category.requiredFields.sizes) {
            data['sizes'] = req.body.sizes.sort((a, b) => a - b)
        }
        data['deliveryMethods']['ruPost'] = req.body.deliveryMethods.ruPost
        data['deliveryMethods']['pickup'] = req.body.deliveryMethods.pickup
        if(data.deliveryMethods.pickup) {
            if(!req.body.pickupAddress) throw {httpStatus: 400, message: 'Pickup address is required'}
            data['pickupAddress'] = {
                region: req.body.pickupAddress.region.trim(),
                city: req.body.pickupAddress.city.trim(),
                street: req.body.pickupAddress.street.trim(),
                houseNumber: req.body.pickupAddress.houseNumber.trim(),
                squareNumberOrOffice: req.body.pickupAddress.squareNumberOrOffice.trim(),
                mailIndex: req.body.pickupAddress.mailIndex.trim()
            }
        }
        data['name'] = req.body.name.trim().replace(/[ ]+/ig, ' ')
        data['description'] = req.body.description.trim().replace(/[ ]+/ig, ' ')
        data['currency'] = req.body.currency
        data['price'] = toFloat(req.body.price)
        const product = await db.main.Product.create(data)
        await db.main.User.updateOne({ _id: req.person._id }, {
            $inc: {
                'numProducts': 1
            }
        })
        res.result.data = product
    },
    edit: async(req,res) => {
        const product = await db.main.Product.getOne({ _id: ObjectId(req.params.productId) }, req.person._id)
        if(!compareIds(product.seller, req.person.id) && req.person.auth.role !== 'admin') throw {httpStatus: 403, message: 'Permission denied'}

        const data = {
            deliveryMethods: product.deliveryMethods,
            pickupAddress: product.pickupAddress || null
        }
        let category = null
        if(req.body.category && req.body.subcategory) {
            category = await db.main.Category.getById(req.body.category)
            if(!category.subcategories.includes(req.body.subcategory)) throw {httpStatus: 400, message: 'Incorrect subcategory'}
            data['category'] = category._id
            data['subcategory'] = req.body.subcategory
        } else {
            category = await db.main.Category.getById(product.category._id)
        }
        if(!category.requiredFields.colors) {
            data['colors'] = []
        }        
        if(category.requiredFields.sizes && req.body.sizes) {
            data['sizes'] = req.body.sizes.sort((a, b) => a - b)
        } else if (!category.requiredFields.sizes) {
            data['sizes'] = []
        }
        if(req.body.deliveryMethods && typeof req.body.deliveryMethods.ruPost === 'boolean') {
            data['deliveryMethods']['ruPost'] = req.body.deliveryMethods.ruPost
        }
        if(req.body.deliveryMethods && typeof req.body.deliveryMethods.pickup === 'boolean') {
            data['deliveryMethods']['pickup'] = req.body.deliveryMethods.pickup
        }
        if(data.deliveryMethods.pickup && req.body.pickupAddress) {
            data['pickupAddress'] = {
                region: req.body.pickupAddress.region.trim(),
                city: req.body.pickupAddress.city.trim(),
                street: req.body.pickupAddress.street.trim(),
                houseNumber: req.body.pickupAddress.houseNumber.trim(),
                squareNumberOrOffice: req.body.pickupAddress.squareNumberOrOffice.trim(),
                mailIndex: req.body.pickupAddress.mailIndex.trim()
            }
        }
        if(req.body.name) data['name'] = req.body.name.trim().replace(/[ ]+/ig, ' ')
        if(req.body.description) data['description'] = req.body.description.trim().replace(/[ ]+/ig, ' ')
        if(req.body.currency) data['currency'] = req.body.currency
        if(req.body.price) data['price'] = toFloat(req.body.price)
        if(!product.couldBeEdited && req.person.auth.role !== 'admin') {
            data.couldBeEdited = true
            data.approved = false
            //because product unapproved
            await Promise.all([
                //remove stripe sku 
                stripeManager.skus.deleteById(product._id),
                //remove from carts
                db.main.Cart.updateMany({ 'products.product': product._id }, {
                    $pull: { 'products': { 'product': product._id } }
                }, { multi: true }).exec(),
                //p3
                db.main.User.updateOne({ _id: product.seller._id ? product.seller._id : product.seller }, {
                    $inc: { 
                        'numAvaibleProducts': -1
                    }
                }).exec()
            ])
        }
        await db.main.Product.setData(product._id, data)
    },
    setPhoto: async(req,res) => {
        const product = await db.main.Product.findOne({ _id: req.params.productId }, { subscribers: 0, buyers: 0 })
        .populate('category')
        if(!product) throw {httpStatus: 404, message: 'Product not found'}
        if(!compareIds(product.seller, req.person.id) && req.person.auth.role !== 'admin') throw {httpStatus: 403, message: 'Permission denied'}
        if(!product.couldBeEdited && req.person.auth.role !== 'admin') throw {httpStatus: 403, message: 'Cannot be edited'}
        let index = parseInt(req.params.index)
        index = product.photos[index] ? index : product.photos.length
        const productObj = product.toObject()
        const oldPhotoName = productObj.photos[index] ? productObj.photos[index] : 'undefined'
        if(product.photos[index]) {
            product.photos.set(index, 'images/products/wait.jpg')
        } else {
            product.photos.push('images/products/wait.jpg')
        }
        if(index === 0) product.mainPhoto = 'images/products/wait.jpg'
        await product.save()
        await monq.run('setProductPhoto', {
            productId: product.id,
            index,
            oldPhotoName,
            imageData: req.body.data,
            mimeType: req.body.mimeType
        })
    },
    deletePhoto: async(req,res) => {
        console.time('getProduct')
        const product = await db.main.Product.findOne({ _id: req.params.productId }, { subscribers: 0, buyers: 0 })
        .populate('category')
        console.timeEnd('getProduct')
        console.time('conditions')
        if(!product) throw {httpStatus: 404, message: 'Product not found'}
        if(!compareIds(product.seller, req.person.id) && req.person.auth.role !== 'admin') throw {httpStatus: 403, message: 'Permission denied'}
        if(!product.couldBeEdited && req.person.auth.role !== 'admin') throw {httpStatus: 403, message: 'Cannot be edited'}
        console.timeEnd('conditions')
        const index = parseInt(req.params.index)
        if(product.photos[index]) {
            console.time('prepareData')
            const productObj = product.toObject()
            product.photos.splice(index, 1)
            product.mainPhoto = product.photos[0] || 'images/products/default.jpg'  
            console.timeEnd('prepareData') 
            console.time('promise')
            await Promise.all([
                //p1
                product.save(),
                //p2
                deleteFile(productObj.photos[index].replace(/\.(jpg|png)/ig, '_orig.jpg')),
                //p3
                deleteFile(productObj.photos[index].replace(/\.(jpg|png)/ig, '_small.jpg')),
                //p4
                deleteFile(productObj.photos[index].replace(/\.(jpg|png)/ig, '_orig.png')),
                //p5
                deleteFile(productObj.photos[index].replace(/\.(jpg|png)/ig, '_small.png'))
            ])
            console.timeEnd('promise')
        }        
    },
    setColor: async(req,res) => {
        const product = await db.main.Product.findOne({ _id: req.params.productId }, { subscribers: 0, buyers: 0 })
        .populate('category')
        if(!product) throw {httpStatus: 404, message: 'Product not found'}
        if(!product.category.requiredFields.colors) throw {httpStatus: 403, message: 'Product cannot have color'}
        if(!compareIds(product.seller, req.person.id) && req.person.auth.role !== 'admin') throw {httpStatus: 403, message: 'Permission denied'}
        if(!product.couldBeEdited && req.person.auth.role !== 'admin') throw {httpStatus: 403, message: 'Cannot be edited'}
        let index = parseInt(req.params.index)
        index = product.colors[index] ? index : product.colors.length
        const productObj = product.toObject()
        const oldPhotoName =  productObj.colors[index] ? productObj.colors[index].photo : 'undefined'
        product.colors[index] = {
            name: req.body.colorName.trim().replace(/[ ]+/ig, ' '),
            photo: 'images/products/wait.jpg'
        }
        await product.save()
        await monq.run('setProductColor', {
            productId: product.id,
            index,
            oldPhotoName,
            imageData: req.body.data,
            mimeType: req.body.mimeType
        })
    },
    deleteColor: async(req,res) => {
        const product = await db.main.Product.findOne({ _id: req.params.productId }, { subscribers: 0, buyers: 0 })
        .populate('category')
        if(!product) throw {httpStatus: 404, message: 'Product not found'}
        if(!product.category.requiredFields.colors) throw {httpStatus: 403, message: 'Product cannot have color'}
        if(!compareIds(product.seller, req.person.id) && req.person.auth.role !== 'admin') throw {httpStatus: 403, message: 'Permission denied'}
        if(!product.couldBeEdited && req.person.auth.role !== 'admin') throw {httpStatus: 403, message: 'Cannot be edited'}
        const index = parseInt(req.params.index)
        if(product.colors[index]) {
            const productObj = product.toObject()
            product.colors.splice(index, 1)
            await Promise.all([
                //p1
                product.save(),
                //p2
                deleteFile(productObj.colors[index].photo.replace(/\.(jpg|png)/ig, '_orig.jpg')),
                //p3
                deleteFile(productObj.colors[index].photo.replace(/\.(jpg|png)/ig, '_small.jpg')),
                //p4
                deleteFile(productObj.colors[index].photo.replace(/\.(jpg|png)/ig, '_orig.png')),
                //p5
                deleteFile(productObj.colors[index].photo.replace(/\.(jpg|png)/ig, '_small.png'))
            ])
        }        
    },
    getById: async(req, res) => {
        const product = await db.main.Product.getOne({ _id: ObjectId(req.params.productId) }, req.person._id)
        if( (product.hidden || !product.approved) && !compareIds(product.seller, req.person.id) && req.person.auth.role !== 'admin') {
            throw {httpStatus: 406, message: 'Product not aviable'}
        }
        res.result.data = product
    },
    getAviableListBySeller: async(req,res) => {
        const products = await db.main.Product.getAviableListBySeller(req.params.userId, req.person._id, parseInt(req.params.index))
        res.result.data = {
            products
        }
    },
    getUnaviableList: async(req, res) => {
        const products = await db.main.Product.getUnaviableList(req.person._id, parseInt(req.params.index))
        res.result.data = {
            products
        }
    },
    getListBySeller: async(req, res) => {
        const products = await db.main.Product.getListBySeller(req.person._id, req.person._id, parseInt(req.params.index))
        res.result.data = {
            products
        }
    },
    search: async(req, res) => {
        const products = await db.main.Product.searchList(req.person._id, req.body.index, req.body.nameRegex, req.body.category, req.body.subcategory, req.body.priceSort)
        res.result.data = {
            products
        }
    },
    subscribe: async(req,res) => {
        const product = await db.main.Product.getOne({ _id: ObjectId(req.params.productId) }, req.person._id)
        await Promise.all([
            //p1
            db.main.Product.updateOne({ _id: product._id }, {
                $push: { 'subscribers': req.person._id }
            }).exec(),
            //p2
            db.main.User.updateOne({ _id: req.person._id }, {
                $push: { 'subcribeOnProducts': { $each: [product._id], $position: 0 } } //unshift
            }).exec()
        ])
    },
    unsubscribe: async(req,res) => {
        await Promise.all([
            //p1
            db.main.Product.updateOne({ _id: ObjectId(req.params.productId) }, {
                $pull: { 'subscribers': req.person._id }
            }).exec(),
            //p2
            db.main.User.updateOne({ _id: req.person._id }, {
                $pull: { 'subcribeOnProducts': ObjectId(req.params.productId) }
            }).exec()
        ])
    },
    approve: async(req,res) => {
        const product = await db.main.Product.findOne({ _id: req.params.productId })
        await stripeManager.skus.create(product)
        product.approved = true
        product.couldBeEdited = false
        await Promise.all([
            //p1
            product.save(),
            //p2
            db.main.User.updateOne({ _id: product.seller._id ? product.seller._id : product.seller }, {
                $inc: { 
                    'numAvaibleProducts': 1
                }
            }).exec()
        ])
    },
    unapprove: async(req,res) => {
        const deletedProduct = await  db.main.Product.findOneAndDelete({ _id: req.params.productId })
        if(!deletedProduct) throw {httpStatus: 404, message: 'Product not found'}
        await Promise.all([
            //p1
            db.main.Cart.updateMany({ 'products.product': deletedProduct._id }, {
                $pull: { 'products': { 'product': deletedProduct._id } }
            }, { multi: true }).exec(),
            //p2
            db.main.User.updateOne({ _id: deletedProduct.seller._id ? deletedProduct.seller._id : deletedProduct.seller }, {
                $inc: { 
                    'numAvaibleProducts': (deletedProduct.approved) ? -1 : 0,
                    'numProducts': -1
                }
            }).exec()
        ])
    },
    addReview: async(req,res) => {
        const [existReview, product] = await Promise.all([
            //existReview
            db.main.Review.findOne({ forUser: req.person._id, forProduct: req.params.productId}).exec(),
            //product, userIsBuyer
            db.main.Product.findOne(
                { _id: req.params.productId, 'buyers': req.person._id },
                { 'buyers.$': 1, 'seller': 1 }
            ).exec()
        ])
        if(existReview) throw {httpStatus: 406, message: 'You already submitted review for this product'}
        if(!product) throw {httpStatus: 403, message: 'You did not buy this product'}
        await db.main.Review.create(
            req.person._id, 
            product._id,
            product.seller._id ? product.seller._id : product.seller,
            req.body.grade,
            req.body.text.trim().replace(/[ ]+/ig, ' ')
        )
        await monq.run('countUserRating', {
            userId: product.seller._id ? product.seller._id : product.seller
        })
    },
    getSelfReviwed: async(req,res) => {
        const products = await db.main.Product.getListByUserReviwed(req.person._id, parseInt(req.params.index))
        res.result.data = {
            products
        }
    },
    getSelfUnreviwed: async(req,res) => {
        const products = await db.main.Product.getListByUserUnreviwed(req.person._id, parseInt(req.params.index))
        res.result.data = {
            products
        }
    },
    delete: async(req,res) => {
        const product = await db.main.Product.getOne({ _id: ObjectId(req.params.productId) })
        if(!compareIds(product.seller, req.person._id) && req.person.auth.role !== 'admin') throw {httpStatus: 403, message: 'Forbidden'}
        await db.main.Product.updateOne(
            { _id: product._id },
            { $set: {
                '_deleted': true
            }}
        )
    }
}