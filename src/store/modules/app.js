
const app = {
  state: {
    device: 'desktop',
    smallDevice: false
  },
  mutations: {
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SETSMALL: (state, val) => {
      state.smallDevice = val
    }
  },
  actions: {
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setSmallDevice({ commit }, val) {
      commit('SETSMALL', val)
    }
  }
}

export default app
