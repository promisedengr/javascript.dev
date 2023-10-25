const config = require('config')
const stripe = require('stripe')(config.get('stripe.secretKey'))

module.exports = {
    prdoucts: {
        create: async(category) => {
            const stripeProduct = await stripe.products.create({
                id: category._id.toString(),
                name: category.name,
                type: 'good'
            })
            return stripeProduct
        },
        getById: async(categoryId) => {
            const stripeProduct = await stripe.products.retrieve(typeof categoryId === 'string' ? categoryId : categoryId.toString())
            return stripeProduct
        },
        deleteById: async(productId) => {
            await stripe.products.del(typeof productId === 'string' ? productId : productId.toString())
        }
    },
    skus: {
        create: async(product) => {
            const sku = await stripe.skus.create({
                id: product._id.toString(),                
                currency: 'usd',
                //change me! Its currency transfering code
                price: (product.currency === 'usd') ? Math.ceil(product.price * 100) : Math.ceil(product.price * 9000),
                inventory: {type: 'infinite'},
                product: product.category._id ? product.category._id.toString() : product.category.toString()
            })
            return sku
        },
        getById: async(productId) => {
            const sku = await stripe.skus.retrieve(typeof productId === 'string' ? productId : productId.toString())
            return sku            
        },
        deleteById: async(productId) => {
            await stripe.skus.del(typeof productId === 'string' ? productId : productId.toString())
        }
    },
    orders: {
        create: async(productsFromCart, buyerFullName, addressObj) => {
            const items = []
            for(let prodElem of productsFromCart) {
                items.push({
                    type: 'sku',
                    parent: prodElem.product._id ? prodElem.product._id.toString() : prodElem.product.toString(),
                    quantity: prodElem.amount
                })
            }
            const stripeOrder = await stripe.orders.create({
                currency: 'usd',
                items,
                shipping: {
                    name: buyerFullName || 'Artur Saharok',
                    address: {
                        'line1': [addressObj.street, addressObj.houseNumber, addressObj.squareNumberOrOffice].join(' '),
                        'state': addressObj.region,
                        'city': addressObj.city,
                        'postal_code': addressObj.mailIndex
                    }
                }
            })
            return stripeOrder
        },
        getById: async(stripeOrderId) => {
            const stripeOrder = await stripe.orders.retrieve(stripeOrderId)
            return stripeOrder                  
        },
        pay: async(stripeOrderId, tokenId, buyerEmail) => {
            const paidOrder = await stripe.orders.pay(stripeOrderId, {
                source: tokenId,
                email: buyerEmail
            })
            return paidOrder
        }
    }
}

