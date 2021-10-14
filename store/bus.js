export const BUS_ACTIONS = {
  SET_MESSAGE: 'bus/setMessage',
  RESET_MESSAGE: 'bus/resetMessage',
}

export const state = () => ({
  message: '',
})

export const mutations = {
  SET_MESSAGE: (state, message) => (state.message = message),
  RESET_MESSAGE: (state) => (state.message = ''),
}

export const actions = {
  setMessage({ commit }, message) {
    commit('SET_MESSAGE', message)

    setTimeout(() => {
      this.dispatch(BUS_ACTIONS.RESET_MESSAGE)
    }, 3000)
  },
  resetMessage({ commit }) {
    commit('RESET_MESSAGE')
  },
}
