const {validationResult} = require('express-validator')
const {arrayContainSpecifiedString} = require('../helpers/validationHelper')

module.exports = (context, methodName) => {
    return async function(req,res,next) {
        try {
            const validationErrors = validationResult(req)
            if(!validationErrors.isEmpty()) {
                const invalidParameters = []  
        
                for(let item of validationErrors.array()) {
                    if(!arrayContainSpecifiedString(invalidParameters, item.param)) invalidParameters.push(item.param)
                }
        
                return res.status(400).json({
                    invalidParameters,
                    message: 'Bad request'
                })
            }
            res.result = {
                status: 200,
                data: { message: 'OK' }
            }
            await context[methodName](req,res)
            res.status(res.result.status).json(res.result.data)
        } catch(e) {
            next(e)
        }
    }
}