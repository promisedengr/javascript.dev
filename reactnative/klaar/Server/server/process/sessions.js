const Redis = require('ioredis')
const JSON = require('JSON')
const config = require('config')
const {makeId, dateNowWithoutMsToInt} = require('../helpers/setDataHelper')
const redis = new Redis({
    'host': config.get('db.redis.host'),
    'port': config.get('db.redis.port'),
    'family': config.get('db.redis.family'),
    'password': config.get('db.redis.password'),
    'db': config.get('db.redis.db')
})

const newSession = user => {
    const session = {
        person: user.toObject(),
        userId: user._id.toString(),
        id: makeId(),
        exp: dateNowWithoutMsToInt() + 10080 // + 7 days
    }
    session.person.id = session.userId
    return session
}

module.exports = {
    make: async(user) => {
        const session = newSession(user)
        let sessions = await redis.get(session.userId)
        .then(res => {
            if(!res) return {}
            return JSON.parse(res)
        })
        const dateNow = dateNowWithoutMsToInt()
        for(const key of Object.keys(sessions)) {
            if(sessions[key] && sessions[key].exp < dateNow) delete sessions[key]
        }
        if(Object.values(sessions).length > 5) sessions = {}
        sessions[session.id] = session
        await redis.set(session.userId, JSON.stringify(sessions))
        return session
    },
    get: async(userId, sessionId) => {
        if(typeof userId !== 'string') userId = userId.toString()
        const sessions = await redis.get(userId)
        .then(res => {
            return JSON.parse(res)
        })
        if(!sessions || !sessions[sessionId]) throw {httpStatus: 401, message: 'Not authorized'}
        const session = sessions[sessionId]
        if(dateNowWithoutMsToInt() > session.exp) {
            delete sessions[session.id]
            await redis.set(session.userId, JSON.stringify(sessions))
            throw {httpStatus: 401, message: 'Not authorized'}
        }
        return session
    },
    remove: async(userId, sessionId) => {
        if(typeof userId !== 'string') userId = userId.toString()
        const sessions = await redis.get(userId)
        .then(res => {
            return JSON.parse(res)
        })
        if(!sessions) return
        delete sessions[sessionId]
        await redis.set(userId, JSON.stringify(sessions))
    },
    updatePerson: async(user) => {
        const userId = user._id.toString()
        const userObj = user.toObject()
        const sessions = await redis.get(userId)
        .then(res => {
            return JSON.parse(res)
        })
        if(!sessions) return
        for(const session of Object.values(sessions)) session.person = userObj
        await redis.set(userId, JSON.stringify(sessions))
        return true
    },
    removeAll: async(userId) => {
        if(typeof userId !== 'string') userId = userId.toString()
        await redis.del(userId)
    }
}