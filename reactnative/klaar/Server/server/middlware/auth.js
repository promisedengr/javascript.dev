module.exports = async(req,res,next) => {
    if(req.authError) next(req.authError)
    if(!req.person || !req.person._id) next({httpStatus: 401, message: 'Not authorized', description: 'Not have req.authError, but not have req.person'})
    next()
}