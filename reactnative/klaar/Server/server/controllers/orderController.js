const db = require('../db')
const monq = require('../monq')
const compareIds = require('../helpers/compareIds')

module.exports = {
    getById: async(req,res) => {
        const order = await db.main.Order.getById(req.params.orderId)
        if(!compareIds(order.seller, req.person.id) && !compareIds(order.buyer, req.person.id) && req.person.auth.role !== 'admin') {
            throw {httpStatus: 403, message: 'Permission denied'}
        }
        res.result.data = {
            order
        }
    },
    getOrdersByUserId: async(req,res) => {
        const orders = await db.main.Order.getListByUserId(req.person._id, parseInt(req.params.index))
        res.result.data = {
            orders
        }
    },
    createFromCart: async(req,res) => {
        const cart = await db.main.Cart.getByOwner(req.person._id)
        if(!cart.products.length) throw {httpStatus: 409, message: 'Cart is empty'}
        await monq.run('createOrdersFromCart', {
            cartId: cart._id,
            buyerAddress: {
                region: req.body.region.trim(),
                city: req.body.city.trim(),
                street: req.body.street.trim(),
                houseNumber: req.body.houseNumber.trim(),
                squareNumberOrOffice: req.body.squareNumberOrOffice.trim(),
                mailIndex: req.body.mailIndex.trim()
            }
        })
    },
    setStatus: async(req,res) => {
        const order = await db.main.Order.getById(req.params.orderId)

        const isBuyer = compareIds(req.person.id, order.buyer)
        //const isSeller = compareIds(req.person.id, order.seller)
        const isAdmin = req.person.auth.role === 'admin' ? true : false

        if(isAdmin) await order.setStatus(req.body.newStatus)
        else if(isBuyer && req.body.newStatus === 'done') await order.setStatus(req.body.newStatus)
        else throw {httpStatus: 403, message: 'Permission denied'}

        if(order.status === 'done') {
            const productsId = []
            for(let i = 0; i < order.products.length; i++) productsId.push(order.products[i].product._id ? order.products[i].product._id : order.products[i].product)
            await db.main.Product.updateMany({ _id: { $in: productsId } }, {
                $addToSet: { 'buyers': order.buyer._id ? order.buyer._id : order.buyer }
            })
        }
    },
    pay: async(req,res) => {
        const order = await db.main.Order.getById(req.params.orderId)
        await order.pay(req.body.token)
    }
}