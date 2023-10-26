const cryptoDB = require('./db/cyptodb');
const gameDB =  require('././db/gameDB');
// const providerDB = require('./db/providerDB');
const userDB = require('./db/userDB');
const userTransactionDB = require('./db/userTransactionDB')
const userGameHistoryDB = require('./db/userGameHistoryDB')
const userSessionDB = require('./db/userSessionDB')
const notificationDB = require('./db/notificationDB')
const personalDB = require('./db/personalDB')
const gameHistoryDB = require('./db/gameHistoryDB')

async function userLogin(){
    return userDB.default.users[0]
}
async function getGamesSummary(){
    var res = {}
    res.inHouses = gameDB.default.inHouses.slice(0, 10)
    res.tops = gameDB.default.tops.slice(0, 10)
    res.hots = gameDB.default.hots.slice(0, 10)
    res.news = gameDB.default.news.slice(0, 10)
    res.providers_home = gameDB.default.providers_home.slice(0, 8)
    return res;
}

// all games page handler
async function getGameList(data){
     var res = {}
    if (data.type == 0){
        res.list = gameDB.default.alls
        res.providers = gameDB.default.provider_all
    } else if (data.type == 1){
        res.list = gameDB.default.favorites
        res.providers = gameDB.default.provider_favorite
    } else if (data.type == 2){
        res.list = gameDB.default.inHouses
        res.providers = gameDB.default.provider_house
    } else if (data.type == 3){
        res.list = gameDB.default.slots
        res.providers = gameDB.default.provider_slot
    } else if (data.type == 4){
        res.list = gameDB.default.lives
        res.providers = gameDB.default.provider_live
    } else if (data.type == 5){
        res.list = gameDB.default.tables
        res.providers = gameDB.default.provider_table
    } else if (data.type == 6){
        res.list = gameDB.default.specials
        res.providers = gameDB.default.provider_special
    }
    return res
}
function getAllGameList(data) {
   
    
}
function getInBattleList(){
    return gameHistoryDB.default.inBattles.slice(0, 8)
}
function getCryptoList(){
    return cryptoDB.default.cryptoList;
}
// user info components
function getUserTransactions(data){
    var transactions = []
    if (userTransactionDB.default[data.type] != null){
        transactions = userTransactionDB.default[data.type]
    }
    var res = {}
    res.transactions = transactions.slice((data.page - 1) * 10 , data.page * 10)
    res.totalCount = transactions.length
    res.currentPage = data.page
    return res
}
function getUserGameHistory(data) {
    var history = []
    if (userGameHistoryDB.default[data.type] != null){
        if (userGameHistoryDB.default[data.type][data.subType] != null){
            history = userGameHistoryDB.default[data.type][data.subType]
        }
    }
    var res = {}
    res.history = history.slice((data.page - 1) * 10 , data.page * 10)
    res.totalCount = history.length
    res.currentPage = data.page
    return res
}
function getUserSession(data) {
    var sessions = []
    sessions = userSessionDB.default.sessions
    var res = {}
    res.sessions = sessions.slice((data.page - 1) * 10 , data.page * 10)
    res.totalCount = sessions.length
    res.currentPage = data.page
    return res
}
function getNotificationList(data){
    var res = {}
    if (data.type == 0){
        res.list = notificationDB.default.list
        res.unreadCount = notificationDB.default.unreads.length
        res.personalCount = personalDB.default.list.length
    } else {
        res.list = notificationDB.default.unreads
        res.unreadCount = 0
        res.personalCount = personalDB.default.list.length
    }
    return res
}
function getPersonalList(data) {
    return personalDB.default.list
}
function getBattleHistory(data) {
    var res = {}
    if (data.gameType == 1){
        res.list = gameHistoryDB.default.battles.slice((data.page - 1) * data.perPage , data.page * data.perPage)
        res.totalCount = gameHistoryDB.default.battles.length
        res.currentPage = data.page
    } else if (data.gameType == 2){
        res.list = gameHistoryDB.default.all_bets.slice(0, data.perPage)
        res.totalCount = gameHistoryDB.default.all_bets.length
        res.currentPage = data.page
    } else if (data.gameType == 3){
        res.list = gameHistoryDB.default.my_bets.slice(0, data.perPage)
        res.totalCount = gameHistoryDB.default.my_bets.length
        res.currentPage = data.page
    } else if (data.gameType == 4){
        res.list = gameHistoryDB.default.high_rollers.slice(0, data.perPage)
        res.totalCount = gameHistoryDB.default.high_rollers.length
        res.currentPage = data.page
    } else if (data.gameType == 5){
        res.list = gameHistoryDB.default.rare_wins.slice(0, data.perPage)
        res.totalCount = gameHistoryDB.default.rare_wins.length
        res.currentPage = data.page
    }
    return res
}
function getBanners(){
    return gameDB.default.banners
}
module.exports = {
    userLogin,
    getGamesSummary,
    getGameList,
    getCryptoList,
    // user info components
    getUserTransactions,
    getUserGameHistory,
    getUserSession,
    getNotificationList,
    getPersonalList,
    getBattleHistory,
    getBanners,
    getInBattleList,
    getAllGameList
}