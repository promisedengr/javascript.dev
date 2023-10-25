module.exports = (role) => {
    return function(req,res,next) {
        if(typeof role === 'string') {
            if (req.person.auth.role === role) return next()
        }
        else if(Array.isArray(role)) {
            for(let r of role) {
                if (req.person.auth.role === r) return next()
            }
        }
        next({httpStatus: 403, message: 'Permission denied'})
    }
}