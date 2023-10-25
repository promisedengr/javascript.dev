const config = require('config')
const NAME = config.get('nodes.apiServer.name')
const HOST = config.get('nodes.apiServer.host')
const PORT = config.get('nodes.apiServer.port')

const app = require('express')()
const http = require('http')
const server = http.createServer(app)

app.set('trust proxy', true)
app.use(require('../middlware/preRequest'))
app.use('/api/profile', require('../routers/profileRouter'))
app.use('/api/categories', require('../routers/categoriesRouter'))
app.use('/api/products', require('../routers/productsRouter'))
app.use('/api/users', require('../routers/usersRouter'))
app.use('/api/chats', require('../routers/chatsRouter'))
app.use('/api/cart', require('../routers/cartRouter'))
app.use('/api/orders', require('../routers/ordersRouter'))
app.use(require('../middlware/errorControl'))

server.listen(PORT, HOST, e => {
    if(e) {
        console.log(e)
        return process.exit(-1)
    }
    console.log( `${NAME} listen ${HOST}:${PORT}` )
})