module.exports = (options) => {
	const settings = Object.assign(
		{
			windowMs: 60 * 60 * 1000,
			delayAfter: 1,
			delayMs: 1 * 1000,
			maxDelayMs: 30 * 1000,
			skipFailedRequests: false,
			skipSuccessfulRequests: false
		},
		options
	)
	const data = {}
	return function(req, res, next) {
		req.reqDelay = (data[req.ip]) ? data[req.ip] : {
			current: 0,
			delay: 0,
			endDelayDate: 0,
            resetTime: Date.now() + settings.windowMs,
            reset: function() {
                this.current = 0
                this.delay = 0
                this.endDelayDate = 0
            }
		}
		if(req.reqDelay.resetTime < Date.now()) req.reqDelay = {
			current: 0,
			delay: 0,
			endDelayDate: 0,
            resetTime: Date.now() + settings.windowMs,
            reset: function() {
                this.current = 0
                this.delay = 0
                this.endDelayDate = 0
            }
		}
		if(req.reqDelay.endDelayDate > Date.now()) return next({ httpStatus: 429, message: 'Too many requests, try again in ' + parseInt(req.reqDelay.delay / 1000) + ' seconds' })
		res.on('finish', () => {
			if(res.statusCode >= 400 && settings.skipFailedRequests) return
			if(res.statusCode < 400 && settings.skipSuccessfulRequests) return
				req.reqDelay.current++
				req.reqDelay.delay += (req.reqDelay.current > settings.delayAfter) ? settings.delayMs : 0
				if(req.reqDelay.delay >= settings.maxDelayMs) req.reqDelay.delay = settings.maxDelayMs
				req.reqDelay.endDelayDate = Date.now() + req.reqDelay.delay
				data[req.ip] = req.reqDelay
		})
		next()	
	}
}