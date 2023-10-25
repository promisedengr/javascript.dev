const config = require('config')
//const NAME = config.get('nodes.worker.name')
const HOST = config.get('nodes.worker.host')
const PORT = config.get('nodes.worker.port')
const monq = require('../monq')

monq.restore()
.then(() => {
    monq.start()
    .then(() => {
        console.log(`Monq worker are running: address ${HOST}:${PORT} reserved `)
    })
})
.catch(e => {
    console.log(e)
    return process.exit(-1)
})