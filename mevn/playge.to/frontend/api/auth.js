var handler = require('./mock/handler')

export default (axios) => ({
  forgotPassword(email) {
    return axios.post("/auth/password/forgot", { email });
  },

  userLogin(email, password) {
    return handler.userLogin();
    // return axios.post("/auth/login", { email, password });
  },

  logout() {
    return axios.get("/auth/logout");
  },

  register(payload) {
    return axios.post("/auth/register", payload);
  },

  resetPassword(password, passwordConfirmation, resetToken) {
    return axios.post("/auth/password/reset", {
      password: password,
      password_confirmation: passwordConfirmation,
      token: resetToken,
    });
  },
  getGamesSummary(data){
    return handler.getGamesSummary()
  },
  // game router
  getGameList(data){
    return handler.getGameList(data)
  },
  getCryptoList(){
    return handler.getCryptoList();
  },
  // user info components
  getUserTransactions(data){
    return handler.getUserTransactions(data);
  },
  getUserGameHistory(data) {
    return handler.getUserGameHistory(data);
  },
  getUserSession(data) {
    return handler.getUserSession(data);
  },
  getNotificationList(data){
    return handler.getNotificationList(data)
  },
  getPersonalList(data) {
    return handler.getPersonalList(data)
  },
  // battles
  getBattleHistory(data) {
    return handler.getBattleHistory(data)
  },
  getBanners(){
    return handler.getBanners()
  },
  getInBattleList(){
    return handler.getInBattleList()
  }
});
