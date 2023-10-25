const config = require('config')
const NAME = config.get('nodes.authServer.name')
const HOST = config.get('nodes.authServer.host')
const PORT = config.get('nodes.authServer.port')

const app = require('express')()
const http = require('http')
const server = http.createServer(app)

app.set('trust proxy', true)
app.use(require('../middlware/preRequest'))
app.use('/api/auth', require('../routers/authRouter'))
app.use(require('../middlware/errorControl'))

server.listen(PORT, HOST, e => {
    if(e) {
        console.log(e)
        return process.exit(-1)
    }
    console.log( `${NAME} listen ${HOST}:${PORT}` )
})