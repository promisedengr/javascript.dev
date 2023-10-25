const jwt = require('jsonwebtoken')
const config = require('config')
const jwtKey = config.get('jwtKey')
const sessions = require('../process/sessions')

module.exports = async(req,res,next) => {
    try {
        if(!req.headers.authorization) throw {httpStatus: 401, message: 'Not authorized', description: 'Token not found in header'}
        const token = req.headers.authorization.split(' ')[1] //Bearer TOKEN
        const decodedToken = jwt.verify(token, jwtKey, { algorithm: 'HS256', ignoreExpiration: true })
        const session = await sessions.get(decodedToken.userId, decodedToken.sessionId)
        if(session.person.activated === false) throw {httpStatus: 403, message: 'Not activated'}
        req.session = session
        req.person = session.person
    } catch(e) {
        req.authError = e
        req.person = {
            _id: null,
            id: null,
            auth: {
                role: 'unauthorized',
                autorized: false,
                activated: false,
                sessionId: null
            }
        }
    } finally {
        next()
    }    
}