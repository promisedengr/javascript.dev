const config = require('config')
const socketPath = config.get('socketPath')
const { dateNowWithoutMsToInt } = require('../helpers/setDataHelper')
const { isArrayOfUniqueStrings } = require('../helpers/validationHelper')
const chatUsers = require('./chatUsers')

class Chat {
        #server = null
        #io = null
        #path = socketPath
        constructor({name = 'Default', host = '127.0.0.1', port = 3000}) {
            this.name = name
            this.host = host
            this.port = parseInt(port)
            this.#server = require('http').createServer()
            this.#io = require('socket.io')(this.#server, {
                path: this.#path,
                transports: ['websocket'],
                serveClient: false,
                pingInterval: 10000,
                pingTimeout: 5000,
                cookie: false
            })
            this.#io.on('connection', socket => {
                this.#io.to(socket.id).emit('sysmsg', {
                    error: false,
                    message: 'Successfully connected to chats'
                })            
                socket.on('join', data => {
                    try {
                        const user = chatUsers.getById(data.userId)
                        if(!user || !user.key || user.key !== data.key || dateNowWithoutMsToInt() > user.keyExpiresAt) {
                            if(user.socketId) return //already joined
                            this.#io.to(socket.id).emit('sysmsg', {
                                error: true,
                                message: 'Authentication failed'
                            })  
                            setTimeout(() => socket.disconnect(true), 1000)
                            return           
                        }
                        let usersOnline = []
                        if(data.checkUsersOnline && data.checkUsersOnline.length < 101 && isArrayOfUniqueStrings(data.checkUsersOnline)) {
                            usersOnline = chatUsers.checkOnlineList(data.checkUsersOnline)
                        }
                        chatUsers.addSocket(user.id, socket.id)
                        this.#io.to(socket.id).emit('sysmsg', {
                            error: false,
                            usersOnline,
                            message: 'Successfully authenticated'
                        })
                        process.send({
                            event: 'chat',
                            type: 'sendUserOnline',
                            data: {
                                'userId': user.id                             
                            }
                        })
                    } catch(e) {
                        return
                    }
                })
                socket.on('disconnect', () => {
                    const userId = chatUsers.getUserIdBySocketId(socket.id)
                    chatUsers.deleteBySocketId(socket.id)
                    if(userId) process.send({
                        event: 'chat',
                        type: 'sendUserOffline',
                        data: {
                            'userId': user.id                             
                        }
                    })
                })
            })
        }
        start() {
            const self = this
            this.#server.listen(this.port, this.host, e => {
                if(e) {
                    console.log(self.name, ':', e)
                    throw e
                }
                console.log( `${self.name} listen ${self.host}:${self.port}` )
            })
            
        }
        sendNewOrderNotification({toUserId, orderId}) {
            const user = chatUsers.getById(toUserId)
            if(!user || !user.socketId) return
            this.#io.to(user.socketId).emit('newOrder', {
                orderId: orderId,
                message: 'You have new unpaid order'
            })
        }
        sendMessage({toUserId, chatId, message = null}) {
            const user = chatUsers.getById(toUserId)
            if(!user || !user.socketId || !message) return
            this.#io.to(user.socketId).emit('msg', {
                chatId,
                message
            })
        }
        sendUserOnline({userId}) {
            this.#io.emit('online', {
                userId,
                message: 'User is online'
            })  
        }
        sendUserOffline({userId}) {
            this.#io.emit('offline', {
                userId,
                message: 'User is offline'
            })            
        }
}

module.exports = Chat