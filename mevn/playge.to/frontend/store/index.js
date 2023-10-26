const getDefaultState = () => {
  return {
    isSidebarToggled: false,
    isModal: false,
    status: -1, // 0: normal, 1: under maintenance, 2: registration disabled
    config: {
      maintenance: 0,
      registration: 0,
      sea: 0,
      global: 0,
      paymentwall: 0
    }
  }
};
// const state = getDefaultState()
const state = () => ({
  loading: true,
  isSidebarToggled: false,
  isModal: false,
  modalType: '',
  isMobileView: true,
  device: {},
  status:  -1, // 0: normal, 1: under maintenance, 2: registration disabled
  config: {
    maintenance: 0,
    registration: 0,
    sea: 0,
    global: 0,
    paymentwall: 0
  },
  mobileTab: false
});

const mutations = {
  setLoading(state) {
    return (state.loading = false);
  },
  setRightPanelToggle(state){
    return (state.isRightPanelToggled = !state.isRightPanelToggled);
  },
  // sidebar toggle handler
 
  // modal handler
  showModal(state) {
    state.isModal = true;

  },
  closeModal(state) {
    state.isModal = false;
    state.modalType = ''
  },
  logout(state) {
    Object.assign(state, getDefaultState())
  },
  setDevice(state, value){
    state.device = value
    if (value.isMobile || value.isTablet){
      state.isLeftPanelToggled = false;
      state.isRightPanelToggled = false;
    }
  },
  SET_MODAL_TYPE(state, value){
    state.isModal = true
    state.modalType = value
  },
  SET_STATUS(state, status) {
    state.status = status
  },
  SET_CONFIG(state, config) {
    state.config.maintenance = config.maintenance
    state.config.registration = config.registration
    state.config.sea = config.sea
    state.config.global = config.global
    state.config.paymentwall = config.paymentwall

  },
  SET_MOBILE_TAB(state, index) {
    if (index == 0)
      state.mobileTab = !state.mobileTab
    else
      state.mobileTab = false
  },
  SET_SIDE_BAR(state, index) {
    if (index == 0)
      state.isSidebarToggled = !state.isSidebarToggled
    else if (index == 1)
      state.isSidebarToggled = false
    else
      state.isSidebarToggled = true
  },

};
const actions = {
  setModalType({commit}, role){
    commit('SET_MODAL_TYPE', role)
  },
}

export default {
  state,
  mutations,
  actions
  // getters
}