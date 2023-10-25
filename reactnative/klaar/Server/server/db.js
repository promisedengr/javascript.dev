const config = require('config')
const mongoose = require('mongoose')
const mainConnectionString = config.get('db.main')
const monqConnectionString = config.get('db.monq')

const connectionToMain = mongoose.createConnection(mainConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const connectionToMonq = mongoose.createConnection(monqConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const db = {
    main: {},
    monq: {}
}

//compile Models

db.main.User = connectionToMain.model('User', require('./schemas/user'))
db.main.Category = connectionToMain.model('Category', require('./schemas/category'))
db.main.Product = connectionToMain.model('Product', require('./schemas/product'))
db.main.Chat = connectionToMain.model('Chat', require('./schemas/chat'))
db.main.Cart = connectionToMain.model('Cart', require('./schemas/cart'))
db.main.Order = connectionToMain.model('Order', require('./schemas/order'))
db.main.Review = connectionToMain.model('Review', require('./schemas/review'))

db.monq.Job = connectionToMonq.model('Job', require('./schemas/job'))

module.exports = db