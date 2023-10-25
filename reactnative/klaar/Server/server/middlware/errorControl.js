const mongoError = require('mongoose').Error

module.exports = async(e,req,res,next) => {
    if(res.headersSent) return //fix rare bug
    // custom throws
    if(e.httpStatus && e.message) {
        return res.status(e.httpStatus).json({
            message: e.message,
            description: e.description ? e.description : ''
        })
    }
    // mongoose Error
    else if(e instanceof mongoError) {
        if(
            e.name === 'CastError' ||
            e.name === 'ValidatorError' ||
            e.name === 'ValidationError' ||
            e.name === 'ParallelSaveError'
        )
        {
            return res.status(400).json({ 
                message: 'Bad request',
                description: e.message ? e.message : ''
            })
        }
    }
    //body-parser Error
    else if(e instanceof SyntaxError) {
        if(
            e.statusCode === 400 ||
            e.statusCode === 413
        )
        {
            return res.status(400).json({
                message: 'Bad request',
                description: e.message ? e.message : ''
            })
        }
    }
    //JsonWebToken
    else if(e.name === 'JsonWebTokenError') {
        return res.status(400).json({
            message: 'Bad request',
            description: 'Bad token'
        })        
    }
    //mongoError
    else if(e.code === 11000) {
        return res.status(409).json({
            message: 'Dublicate key error',
            description: e.message ? e.message : ''
        })  
    }
    console.log(e)
    res.status(500).json({
        message: 'Server error',
        description: e.message ? e.message : ''
    })
}