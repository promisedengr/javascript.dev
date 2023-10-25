const jwt = require('jsonwebtoken')
const config = require('config')
const db = require('../db')
const bcrypt = require('bcrypt')
const mailer = require('../process/mailer')
const {dateNowWithoutMsToInt} = require('../helpers/setDataHelper')
const sessions = require('../process/sessions')
const authHelper = require('../helpers/authHelper')
const jwtKey = config.get('jwtKey')

module.exports = {
    registration: async(req,res) => {
        let existUser = null
        existUser = await db.main.User.getByEmail(req.body.email)
        .catch(e => {
            if (e.httpStatus === 404) return null
            throw e
        })
        if(existUser) throw {httpStatus: 406, message: 'User already exist'}
        const activateCode = authHelper.newFourCode()
        const activateNumbers = activateCode.split('')
        await mailer.send({
            to: req.body.email, 
            subject: 'Klaar shop: registration',
            text: 'Your activation code: ' + activateCode,
            templateName: 'registration',
            variables: {
                'email': req.body.email,
                '1': activateNumbers[0],
                '2': activateNumbers[1],
                '3': activateNumbers[2],
                '4': activateNumbers[3]
            }
        })
        const hashedActivateCode = await bcrypt.hash(activateCode, 12) 
        const hashedPassword = await bcrypt.hash(req.body.passw.pass, 12)
        await db.main.User.create(hashedActivateCode, hashedPassword, req.body.email, req.body.fn, req.body.ln)
        res.result = {
            status: 201,
            data: {
                'message': 'User has been created'
            }
        }
    },
    activate: async(req,res) => {
        const user = await db.main.User.getByEmail(req.body.email)
        if(user.auth.activated) throw {httpStatus: 403, message: 'Account already activated'}
        await user.compareActivateCode(req.body.code)
        await db.main.User.updateOne({ _id: user._id }, { 'auth.activated': true })
        await sessions.updatePerson(user)
    },
    login: async(req,res) => {
        const user = await db.main.User.getByEmail(req.body.email)
        await user.comparePassword(req.body.passw.pass)
        const session = await sessions.make(user)
        const token = jwt.sign( 
            { userId: session.userId, sessionId: session.id},
            jwtKey,
            { algorithm: 'HS256', expiresIn: '30 days' }
        )   
        res.result.data = {
            'activated': user.auth.activated,
            'userRole': user.auth.role,
            'access_token': token,
            'token_type': 'Bearer'
        }
    },
    logout: async(req,res) => {
        await sessions.remove(req.person._id, req.session.id)
    },
    forgotPassword: async(req,res) => {
        const user = await db.main.User.getByEmail(req.body.email)
        const forgotCode = authHelper.newFiveCode()
        await mailer.send({
            to: req.body.email, 
            subject: 'Klaar shop: forgot password',
            text: 'Your code: ' + forgotCode,
            html: '<p>Your code: <strong>' + forgotCode +'</strong> for <span style="color: #0ec403"><strong>Klaar shop App</strong></span></p>'
        })
        const hashedForgotCode = await bcrypt.hash(forgotCode, 12)
        await db.main.User.updateOne({ _id: user._id }, {
            $set: {
                'auth.forgotCode': hashedForgotCode,
                'auth.forgotExpiresAt': dateNowWithoutMsToInt() + 1200 // + 20 minuts
            }
        })
        res.result.data = {
            'userId': user.id
        }
    },
    passRecovery: async(req,res) => {
        const user = await db.main.User.getById(req.body.userId)
        await user.compareForgotCode(req.body.code)
        const hashedPassword = await bcrypt.hash(req.body.passw.pass, 12)
        await db.main.User.updateOne({ _id: user._id }, {
            $set: {
                'auth.password': hashedPassword,
                'auth.sessionId': null,
                'auth.autorized': false
            }
        })
        await sessions.removeAll(user._id) 
    },
    resendCode: async(req,res) => {
        const user = await db.main.User.getByEmail(req.body.email)
        if(user.auth.activated) throw {httpStatus: 403, message: 'Account already activated'}
        const activateCode = authHelper.newFourCode()
        await mailer.send({
            to: req.body.email, 
            subject: 'Klaar shop: registration',
            text: 'Your repeated activation code: ' + activateCode,
            html: '<p>Your repeated activation code: <strong>' + activateCode +'</strong> for <span style="color: #0ec403"><strong>Klaar shop App</strong></span></p>'
        })
        const hashedActivateCode = await bcrypt.hash(activateCode, 12)
        user.auth.activateCode = hashedActivateCode
        await user.save()     
    }
}