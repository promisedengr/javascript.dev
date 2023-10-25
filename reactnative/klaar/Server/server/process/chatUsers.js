const data = {
    info: {},
    sockets: {}
}
const { dateNowWithoutMsToInt } = require('../helpers/setDataHelper')

module.exports = {
    add: function({user, key}) {
        data.info[user.id] = {
            socketId: '',
            id: user.id,
            name: user.fn + ' ' + user.ln,
            role: user.auth.role,
            key,
            keyExpiresAt: dateNowWithoutMsToInt() + 60 // + 1 minut
        }
    },
    addSocket: function(userId, socketId) {
        if(data.info[userId]) {
            data.info[userId].socketId = socketId
            data.info[userId].key = ''
            data.sockets[socketId] = userId
        }
    },
    getById: function(userId) {
        if(data.info[userId]) return data.info[userId]
        return null
    },
    getUserIdBySocketId: function(socketId) {
        if(data.sockets[socketId]) return data.sockets[socketId]
        return null
    },
    deleteById: function(userId) {
        if(data.info[userId]) {
            delete data.sockets[ data.info[userId].socketId ]
            delete data.info[userId]
        }       
    },
    deleteBySocketId: function(socketId) {
        if(data.sockets[socketId]) {
            delete data.info[  data.sockets[socketId] ]
            delete data.sockets[socketId]
        }   
    },
    checkOnlineList: function(checkUsersOnline = []) {
        const usersOnline = []
        for(let i; i < checkUsersOnline.length; i++) {
            if(data.info[ checkUsersOnline[i] ]) usersOnline.push(checkUsersOnline[i])
        }
        return usersOnline
    }
}