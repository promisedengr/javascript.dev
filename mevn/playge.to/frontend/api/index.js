import apiCall from './apiCall'

export default () => ({
    checkServerStatus(data, cb, error){apiCall('/api/v1/game/checkServerStatus', 'POST', '', data, cb, error)},
    getGameStatistics(data, cb, error){apiCall('/api/v1/game/getGameStatistics', 'POST', '', data, cb, error)},

    
    getNews(data, cb, error){apiCall('/api/v1/game/getNews', 'POST', '', data, cb, error)},
    getTerms(data, cb, error){apiCall('/api/v1/game/getTerms', 'POST', '', data, cb, error)},
    getPrivacy(data, cb, error){apiCall('/api/v1/game/getPrivacy', 'POST', '', data, cb, error)},
    getLegal(data, cb, error){apiCall('/api/v1/game/getLegal', 'POST', '', data, cb, error)},
    getCookie(data, cb, error){apiCall('/api/v1/game/getCookie', 'POST', '', data, cb, error)},
    getContactUs(data, cb, error){apiCall('/api/v1/game/getContactUs', 'POST', '', data, cb, error)},
    getRotations(data, cb, error){apiCall('/api/v1/game/getRotations', 'POST', '', data, cb, error)},
    doChangeFamilyName(data, cb, error){apiCall('/api/v1/game/doChangeFamilyName', 'POST', window.sessionStorage.getItem("token"), data, cb, error)},
    

    userSignUp(data, cb, error){apiCall('/api/v1/user/sign-up', 'POST', '', data, cb, error)},
    userSignIn(data, cb, error){apiCall('/api/v1/user/sign-in', 'POST', '', data, cb, error)},
    sendEmailCode(data, cb, error){apiCall('/api/v1/user/sendEmailCode', 'POST', '', data, cb, error)},
    sendSmsCode(data, cb, error){apiCall('/api/v1/user/sendSmsCode', 'POST', '', data, cb, error)},
    recoverNow(data, cb, error){apiCall('/api/v1/user/recoverNow', 'POST', '', data, cb, error)},
    getUserData(data, cb, error){apiCall('/api/v1/user/getUserData', 'POST', window.sessionStorage.getItem("token"), data, cb, error)},
    savePassword(data, cb, error){apiCall('/api/v1/user/savePassword', 'POST', window.sessionStorage.getItem("token"), data, cb, error)},
    getNamePlayer(data, cb, error){apiCall('/api/v1/user/getNamePlayer', 'POST', window.sessionStorage.getItem("token"), data, cb, error)},
    getAccountItemPurchases(data, cb, error){apiCall('/api/v1/user/getAccountItemPurchases', 'POST', window.sessionStorage.getItem("token"), data, cb, error)},
    getDeletedItemHistory(data, cb, error){apiCall('/api/v1/user/getDeletedItemHistory', 'POST', window.sessionStorage.getItem("token"), data, cb, error)},
    getTradeHistory(data, cb, error){apiCall('/api/v1/user/getTradeHistory', 'POST', window.sessionStorage.getItem("token"), data, cb, error)},

    getDownloads(data, cb, error){apiCall('/api/v1/download/getDownloads', 'POST', '', data, cb, error)},

    getDonationList(data, cb, error){apiCall('/api/v1/donation/getDonationList', 'POST', window.sessionStorage.getItem("token"), data, cb, error)},

    getCategoryList(data, cb, error){apiCall('/api/v1/category/getCategoryList', 'POST', window.sessionStorage.getItem("token"), data, cb, error)},
    
    getItemList(data, cb, error){apiCall('/api/v1/item/getItemList', 'POST', window.sessionStorage.getItem("token"), data, cb, error)},
    doBuyItem(data, cb, error){apiCall('/api/v1/item/doBuyItem', 'POST', window.sessionStorage.getItem("token"), data, cb, error)},

    getPaymentwallWidget(data, cb, error){apiCall('/api/v1/payment/getPaymentwallWidget', 'POST', window.sessionStorage.getItem("token"), data, cb, error)},
    getAccountCoinPurchases(data, cb, error){apiCall('/api/v1/payment/getAccountCoinPurchases', 'POST', window.sessionStorage.getItem("token"), data, cb, error)},

})