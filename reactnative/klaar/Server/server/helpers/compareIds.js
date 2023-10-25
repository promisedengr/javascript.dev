module.exports = (firstId, secondId) => {
    if(!firstId || !secondId) return false
    firstId = firstId._id ? firstId._id.toString() : typeof firstId == 'string' ? firstId : firstId.toString()
    secondId = secondId._id ? secondId._id.toString() : typeof secondId == 'string'? secondId : secondId.toString()
    return firstId == secondId ? true : false
}