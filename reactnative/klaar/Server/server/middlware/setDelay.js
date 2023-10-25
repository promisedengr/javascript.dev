module.exports = sec => {
    const ips = {}
    const ms = sec * 1000
    return (req, res, next) => {
        req.endDelay = ips[req.ip] ? ips[req.ip] : 0
        if(req.endDelay > Date.now()) next({ httpStatus: 429, message: 'Too many requests, try again in a few seconds' })
        res.on('finish', () => {
            if(res.statusCode < 200 || res.statusCode > 299) return 
            ips[req.ip] = Date.now() + ms
            console.log(req.ip, ':', req.url, ':', res.statusCode)
        })
        next()
    }
}