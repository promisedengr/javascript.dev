const data = {}

module.exports = {
    addOrUpdate: function(user) {
        data[user.id] = user
    },
    getById: function(userId) {
        if(data[userId]) return data[userId]
        return null
    },
    deleteById: function(userId) {
        if(data[userId]) delete data[userId]
    }
}