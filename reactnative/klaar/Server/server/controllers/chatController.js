const db = require('../db')
const { newSessionId } = require('../helpers/authHelper')
const {toFloat, dateNowWithoutMsToInt} = require('../helpers/setDataHelper')

const chatController = {
    login: async(req,res) => {
        const key = newSessionId() + newSessionId()
        process.send({
            event: 'chat',
            type: 'addChatUser',
            data: {
                'user': req.person, 
                'key': key
            }
        })
        res.result.data = {
            userId: req.person.id,
            key
        }
    },
    startWithUser: async(req, res) => {
        const user = await db.main.User.getById(req.params.userId)
        let chat = await db.main.Chat.getByMembers([ req.person._id, user._id ])
        .catch(e => {
            if(e.httpStatus === 404) return null
            throw e
        })
        if(!chat) chat = await db.main.Chat.create([ req.person._id, user._id ])
        res.result.data = chat
    },
    getList: async(req,res) => {
        const index = parseInt(req.params.index)
        const chats = await db.main.Chat.getList(req.person._id, index)
        res.result.data = {
            chats
        }
    },
    getMessagesList: async(req,res) => {
        const index = parseInt(req.params.index)
        const messages = await db.main.Chat.getMessagesList(req.params.chatId, index)
        res.result.data = {
            messages
        }
    },
    sendMessage: async(req,res) => {
        const message = {
            fromUserId: req.person.id,
            fromUserName: req.person.fn + ' ' + req.person.ln,
            text: req.body.text.trim().replace(/\s+/ig, ' '),
            date: dateNowWithoutMsToInt()
        }
        const chat = await db.main.Chat.putMessage(
            req.params.chatId,
            message.fromUserId,
            message.fromUserName,
            message.text
        )
        for(let member of chat.members) process.send({
            event: 'chat',
            type: 'sendMessage',
            data: {
                'toUserId': member._id ? member._id : member,
                'chatId': req.params.chatId,
                'message': message
            }
        })
    }
}

module.exports = chatController