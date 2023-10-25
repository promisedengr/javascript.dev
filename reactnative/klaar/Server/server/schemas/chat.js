const {Schema} = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId
const {toInt, toFloat, addPrefix, dateNowWithoutMsToInt} = require('../helpers/setDataHelper')
const {washObject, isArrayOfUniqueStrings} = require('../helpers/validationHelper')

const messageChatSchema = new Schema({
    fromUserId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    fromUserName: {type: String, minlength: 5, maxlength: 100},
    text: {type: String, minlength: 1, maxlength: 200},
    date: {type: Number, default: dateNowWithoutMsToInt()}
}, { _id: false, _v: false })
const chatSchema = new Schema({
    members: [ {type: Schema.Types.ObjectId, ref: 'User'} ],
    banned: {type: Boolean, default: false},
    messages: [ {type: messageChatSchema} ],
    apperDate: {type: Number, default: dateNowWithoutMsToInt()}
})

chatSchema.statics = {
    create: async function(userIds) {
        let chat = new this({
            members: userIds,
            banned: false,
            messages: [],
            apperDate: dateNowWithoutMsToInt()
        })
        chat = await chat.save()
        .then(savedChat => {
            return savedChat
        })
        return chat
    },
    getByMembers: async function(userIds) {
        const andFilter = []
        for(let userId of userIds) andFilter.push({ 'members': { $in: ObjectId(userId) } })
        const chat = this.findOne({ $and: andFilter }, { 
            members: 1,
            banned: 1,
            messages: { $slice: [0, 15] },
            apperDate: 1
        })
        if(!chat) throw {httpStatus: 404, message: 'Chat not found'}
        return chat
    },
    getList: async function(memberId, skip = 0, limit = 15) {
        const chats = await this.find({ members: { $in: memberId } }, { 
            members: 1,
            banned: 1,
            messages: { $slice: [0, 15] },
            apperDate: 1
        })
        .skip(skip).limit(limit)
        .populate('members', { 
            fn: 1, ln: 1,
            phone: 1, photo: 1,
            country: 1, email: 1,
            rating: 1, apperDate: 1
        })
        if(!chats) return []
        return chats
    },
    getMessagesList: async function(chatId, skip = 0, limit = 15) {
        const chatWithMessages = await this.findOne({ _id: chatId }, {
            messages: { $slice: [skip, limit] }            
        })
        if(!chatWithMessages || !chatWithMessages.messages) return []
        return chatWithMessages.messages
    },
    putMessage: async function(chatId, fromUserId, fromUserName, text) {
        const chat = await this.findOneAndUpdate(
        {
            _id: chatId, members: { $in: ObjectId(fromUserId) }
        },
        {
            $push: { 'messages': { $each: [ {
                fromUserId: ObjectId(fromUserId),
                fromUserName,
                text,
                date: dateNowWithoutMsToInt()            
            } ], $position: 0 } } //unshift
        },
        {
            projection: { messages: 0 }
        })
        if(!chat) throw {httpStatus: '404', message: 'Chat not found'}
        return chat
    }
}

module.exports = chatSchema