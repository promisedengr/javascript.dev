import apiCall from './apiCall'

export default () => ({
    saveToDB(data, cb, error){apiCall('/api/v1/metadata/saveToDB', 'POST', data, cb, error)},
    getMetadata(data, cb, error){apiCall('/api/v1/metadata/getMetadata', 'POST', data, cb, error)},
    getMetadataById(data, cb, error){apiCall('/api/v1/metadata/getMetadataById', 'POST', data, cb, error)},
    getAccountMetadata(data, cb, error){apiCall('/api/v1/metadata/getAccountMetadata', 'POST', data, cb, error)},
    updateToDB(data, cb, error){apiCall('/api/v1/metadata/updateToDB', 'POST', data, cb, error)},
    deleteMetadataById(data, cb, error){apiCall('/api/v1/metadata/deleteMetadataById', 'POST', data, cb, error)},
    donateMatic(data, cb, error){apiCall('/api/v1/metadata/donateMatic', 'POST', data, cb, error)},
    getSponsorMetadata(data, cb, error){apiCall('/api/v1/metadata/getSponsorMetadata', 'POST', data, cb, error)},




    apiTest(data, cb, error){apiCall('/api/v1/test', 'POST', data, cb, error)},
    userSignUp(data, cb, error){apiCall('/api/v1/user/sign-up', 'POST', data, cb, error)},
    userSignIn(data, cb, error){apiCall('/api/v1/user/sign-in', 'POST', data, cb, error)},
    saveUserData(data, cb, error){apiCall('/api/v1/user/saveUserData', 'POST', data, cb, error)},
    getUserData(data, cb, error){apiCall('/api/v1/user/getUserData', 'POST', data, cb, error)},
    // apiTest(data, cb, error){
    //     console.log('ajfioefjeij')
    // },


})