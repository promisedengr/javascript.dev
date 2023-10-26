const getDefaultState = () => {
  return {
    address: '',
    pinataKey: '',
    pinataSecret: '',
    registered: false,
    role: 10
  }
};
  // const state = getDefaultState()
const state = () => ({
  address: '',
  pinataKey: '',
  pinataSecret: '',
  registered: false,
  role: 10
});

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_CONFIG_TOGGLE(state) {
    return (state.registered = !state.registered);
  },
  SET_ACCOUNT: (state, account) => {
    state.address = account.address
    state.pinataKey = account.pinataKey
    state.pinataSecret = account.pinataSecret
    if (state.pinataKey)
      state.registered = true
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