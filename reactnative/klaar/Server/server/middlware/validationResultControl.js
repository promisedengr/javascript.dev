const {validationResult} = require('express-validator')
const {arrayContainSpecifiedString} = require('../helpers/validationHelper')

module.exports = async(req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        const invalidParameters = []  

        for(let item of errors.array()) {
            if(!arrayContainSpecifiedString(invalidParameters,item.param)) invalidParameters.push(item.param)
        }

        return res.status(400).json({
            invalidParameters,
            message: 'Bad request'
        })
    }

    next()
}