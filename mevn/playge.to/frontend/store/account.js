const getDefaultState = () => {
  return {
    id: 0,
    email: '',
    name: '',
    phoneNumber: '',
    coin: 0,
    netType: 0,
    paymentwall: 0,
    role: 10
  }
};
  // const state = getDefaultState()
const state = () => ({
  id: 0,
  name: '',
  user_ip: '',
  email: '',
  phoneNumber: '',
  coin: 0,
  netType: 0,
  paymentwall: 0,
  role: 10
});

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
    // localStorage.clear()
    window.sessionStorage.clear()
  },
  SET_ACCOUNT_COIN: (state, coin) => {
    state.coin = state.coin - coin
  },
  SET_ACCOUNT: (state, account) => {
    state.id = account.id
    state.name = account.name
    state.user_ip = account.user_ip
    state.email = account.email
    state.phoneNumber = account.phoneNumber
    state.coin = account.coin
    state.paymentwall = account.paymentwall
    state.netType = account.netType
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
};

const actions = {
  resetState({ commit }) {
    return new Promise(() => {
      commit('RESET_STATE')
    })
  },
  setAccount({ commit }, account) {
    commit('SET_ACCOUNT', account)
  },
  setRole({commit}, role){
    commit('SET_ROLE', role)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  // getters
}