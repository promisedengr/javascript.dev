const config = require('config')
const prefix = config.get('prefix')
module.exports = {
    addPrefix: (string = '') => {
        return prefix + string
    },
    toInt: value => {
        return parseInt(value)
    },
    toFloat: value => {
        return parseFloat(parseFloat(value).toFixed(2))
    },
    dateNowWithoutMsToString: () => {
        const dateNow = Date.now().toString()
        return dateNow.substring(0, dateNow.length - 3)
    },
    dateNowWithoutMsToInt: () => {
        const dateNow = Date.now().toString()
        return parseInt(dateNow.substring(0, dateNow.length - 3))
    },
    makeId: () => {
        let id = (+( (Math.random() + '123456789').substr(2, 8) + Date.now() )).toString(36).substr(0, 12)
        if(id.length < 12) id += (Math.random() + '123456789').substr(2, 16 - id.length)
        return id
    }
}