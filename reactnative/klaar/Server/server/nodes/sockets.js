const config = require('config')
const Chat = require('../process/Chat')
const chatsInfo = config.get('nodes.chats')

const sockets = []
for(const info of Object.values(chatsInfo)) {
    const socket = new Chat({'name': info.name, 'host': info.host, 'port': info.port})
    socket.start()
    sockets.push(socket)
}

const chatUsers = require('../process/chatUsers')
process.on('message', (data = {}) => {
    if(data.event !== 'chat') return
    switch(data.type) {
        case 'sendNewOrderNotification':
            for(const socket of sockets) socket.sendNewOrderNotification(data.data)
            break;
        case 'sendMessage':
            for(const socket of sockets) socket.sendMessage(data.data)
            break;
        case 'addChatUser':
            chatUsers.add(data.data)
            break;
        case 'sendUserOnline':
            for(const socket of sockets) socket.sendUserOnline(data.data)
            break;
        case 'sendUserOffline':
            for(const socket of sockets) socket.sendUserOnline(data.data)
            break;
        default:
            return
    }
})