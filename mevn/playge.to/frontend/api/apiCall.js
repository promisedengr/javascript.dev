import axios from 'axios'
// axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// var baseURL = 'http://localhost:5000'    // for local dev.
var baseURL = 'https://playge.to' // for playge server.
// var baseURL = 'http://192.34.61.117' // for dev server.

function apiCall(url, method, token, data, successCallback, errorCallback){
    console.log(token)
    axios({
        method: method,
        url: url,
        data: data,
        // headers: {},
        headers: {
            'Authorization': 'JWT ' + token
        },
        baseURL: baseURL
    })
    .then(successCallback)
    .catch(errorCallback)
}
export default apiCall