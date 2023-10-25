module.exports = {
    newSessionId: function() {
        return (Math.random().toString(36) + '123456789').substr(2, 8) //8 symbols
    },
    newFourCode: function() {
        return (Math.random() + '123456789').substr(2, 4) //4 digit
    },
    newFiveCode: function() { //lol, its newFourCode
        return (Math.random().toString(36) + '123456789').substr(2, 4) //4 symbols
    }
}