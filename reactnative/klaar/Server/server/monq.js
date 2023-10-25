const {toInt, toFloat} = require('./helpers/setDataHelper')
const monq = require('monq')
const db = require('./db')
const saveImage = require('./process/saveImage')
const config = require('config')
const client = monq(config.get('db.monq'))
const queue = client.queue('first')
const worker = client.worker(['first'])
const deleteFile = require('./process/deleteFile')

worker.register
({
    setProductPhoto: async({productId, imageData, mimeType, oldPhotoName, index}, callback) => {
        try {
            const product = await db.main.Product.findOne({ _id: productId })
            const randName = (+( (Math.random() + '123456789').substr(2, 8) + Date.now() )).toString(36)
            const dbName = await saveImage(imageData, mimeType, 'products', randName)
            if(product.photos[index]) {
                product.photos.set(index, dbName)
            } else {
                product.photos.push(dbName)
            }            
            if(index === 0) product.mainPhoto = dbName            
            await Promise.all([
                //p1
                product.save(),
                //p2
                deleteFile(oldPhotoName.replace(/\.(jpg|png)/ig, '_orig.jpg')),
                //p3
                deleteFile(oldPhotoName.replace(/\.(jpg|png)/ig, '_small.jpg')),
                //p4
                deleteFile(oldPhotoName.replace(/\.(jpg|png)/ig, '_orig.png')),
                //p5
                deleteFile(oldPhotoName.replace(/\.(jpg|png)/ig, '_small.png'))
            ])
            callback(null, {
                productId: product.id,
                photoIndex: index,
                photoName: dbName,
                deletedPhotoName: oldPhotoName
            })
        } catch(e) {
            console.log(e)
            callback(e)
        }
    },
    setProductColor: async({productId, index, oldPhotoName, imageData, mimeType}, callback) => {
        try {
            const product = await db.main.Product.findOne({ _id: productId })
            const randName = (+( (Math.random() + '123456789').substr(2, 8) + Date.now() )).toString(36)
            const dbName = await saveImage(imageData, mimeType, 'products', randName)
            product.colors[index].photo = dbName
            await Promise.all([
                //p1
                product.save(),
                //p2
                deleteFile(oldPhotoName.replace(/\.(jpg|png)/ig, '_orig.jpg')),
                //p3
                deleteFile(oldPhotoName.replace(/\.(jpg|png)/ig, '_small.jpg')),
                //p4
                deleteFile(oldPhotoName.replace(/\.(jpg|png)/ig, '_orig.png')),
                //p5
                deleteFile(oldPhotoName.replace(/\.(jpg|png)/ig, '_small.png'))
            ])
            callback(null, {
                productId: product.id,
                photoIndex: index,
                colorPhotoName: dbName,
                deletedColorPhotoName: oldPhotoName
            })          
        } catch(e) {
            console.log(e)
            callback(e)
        }
    },
    setUserPhoto: async({userId, imageData, mimeType, oldPhotoName}, callback) => {
        try {
            const user = await db.main.User.getById(userId)
            const randName = (+( (Math.random() + '123456789').substr(2, 8) + Date.now() )).toString(36)
            const dbName = await saveImage(imageData, mimeType, 'users', randName)
            user.photo = dbName
            await Promise.all([
                //p1
                user.save(),
                //p2
                deleteFile(oldPhotoName.replace(/\.(jpg|png)/ig, '_orig.jpg')),
                //p3
                deleteFile(oldPhotoName.replace(/\.(jpg|png)/ig, '_small.jpg')),
                //p4
                deleteFile(oldPhotoName.replace(/\.(jpg|png)/ig, '_orig.png')),
                //p5
                deleteFile(oldPhotoName.replace(/\.(jpg|png)/ig, '_small.png'))
            ])
            callback(null, {
                userId: user.id,
                deletedPhotoName: oldPhotoName,
                photoName: dbName
            })
        } catch(e) {
            console.log(e)
            callback(e)
        }
    },
    createOrdersFromCart: async({cartId, buyerAddress}, callback) => {
        try {
            const cart = await db.main.Cart.findOne({ _id: cartId })
            .populate('products.product', {subscribers: 0, reviews: 0, buyers: 0})
            .populate('owner', { _id: 1, fn: 1, ln: 1, email: 1 })
            if(!cart.products.length) throw {httpStatus: 409, message: 'Cart is empty'}
            const resultOrdersId = []
            //split products by seller
            const productsBySeller = {}
            for(let prodElem of cart.products) {
                const checkProduct = await db.main.Product.findOne({ _id: prodElem.product._id, _deleted: false }, {approved: 1, hidden: 1})
                if(!checkProduct || !checkProduct.approved || checkProduct.hidden) continue //skip unaviable products
                if(!productsBySeller[prodElem.seller]) productsBySeller[prodElem.seller] = []
                productsBySeller[prodElem.seller].push(prodElem)
            }
            //split splited products by deliveryMethod
            for(let sellerId of Object.keys(productsBySeller)) {
                const productsByDeliveryMethod = {}
                for(let prodElem of productsBySeller[sellerId]) {
                    if(!productsByDeliveryMethod[prodElem.deliveryMethod]) productsByDeliveryMethod[prodElem.deliveryMethod] = []
                    productsByDeliveryMethod[prodElem.deliveryMethod].push(prodElem)
                }
                //create orders for splited products by deliveryMethod
                for(let deliveryMethod of Object.keys(productsByDeliveryMethod)) {
                    //if deliveryMethod === 'pickup', product have self deliveryAdress, its pickupAddress
                    if(deliveryMethod === 'pickup') {
                        for(let prodElem of productsByDeliveryMethod['pickup']) {
                            const order = await db.main.Order.create(
                                (cart.owner.ln && cart.owner.fn) ? cart.owner.ln + ' ' + cart.owner.fn : 'Artur Saharok',
                                cart.owner._id ? cart.owner._id : cart.owner,
                                sellerId,
                                [prodElem],
                                'pickup',
                                prodElem.product.pickupAddress,
                                cart.owner.email
                            )
                            resultOrdersId.push(order._id)
                            process.send({
                                event: 'chat',
                                type: 'sendNewOrderNotification',
                                data: {
                                    'toUserId': order.buyer._id ? order.buyer._id : order.buyer,
                                    'orderId': order._id
                                }
                            })
                        }
                    // else set buyer address for delivery
                    } else {
                        const order = await db.main.Order.create(
                            (cart.owner.ln && cart.owner.fn) ? cart.owner.ln + ' ' + cart.owner.fn : 'Artur Saharok',
                            cart.owner._id ? cart.owner._id : cart.owner,
                            sellerId,
                            productsByDeliveryMethod[deliveryMethod],
                            deliveryMethod,
                            buyerAddress,
                            cart.owner.email
                        )
                        resultOrdersId.push(order._id)
                        process.send({
                            event: 'chat',
                            type: 'sendNewOrderNotification',
                            data: {
                                'toUserId': order.buyer._id ? order.buyer._id : order.buyer,
                                'orderId': order._id
                            }
                        })
                    }
                }
            }
            await cart.clear()
            callback(null, {
                userId: cart.owner._id ? cart.owner._id : cart.owner,
                cartId: cart._id,
                createdOrders: resultOrdersId
            })
        } catch(e) {
            console.log(e)
            callback(e)
        }
    },
    countUserRating: async({userId}, callback) => {
        try {
            const reviews = await db.main.Review.find({ forUser: userId._id ? userId._id : userId}).lean()
            let reviewsSum = 0
            let gradeSum = 0
            for(let review of reviews) {
                reviewsSum++
                gradeSum += review.grade
            }
            await db.main.User.updateOne({ _id: userId }, {
                $set: {
                    'numReviews': toInt(reviewsSum),
                    'rating': toFloat(gradeSum / reviewsSum)
                }
            })
            callback(null, {
                userId: userId,
                reviewsSum,
                gradeSum
            })
        } catch(e) {
            console.log(e)
            callback(e)           
        }
    }
})
worker.on('dequeued', function (data) {
})
worker.on('failed', async(data) => {
    await db.monq.Job.updateOne({ _id: data._id }, { params: null })
})
worker.on('complete', async(data) => {
    await db.monq.Job.updateOne({ _id: data._id }, { params: null })
})
worker.on('error', function(e) {
    console.log('monq worker error:', e)
})

const manager = {
    restore: async() => {
        const dequeuedJobsList = await db.monq.Job.find({ status: 'dequeued' })
        for(let job of dequeuedJobsList) queue.enqueue(job.name, job.params, (e, job) => {
        })
        await db.monq.Job.updateMany({ 'status': { $in: ['complete', 'failed'] } }, { params: null })
        return true
    },
    start: async() => {
        worker.start()
        return true
    },
    run: async(action, data) => {
        if(worker.callbacks[action]) await queue.enqueue(action, data, (e, job) => {
        })
    }
}
manager.restore()

module.exports = manager