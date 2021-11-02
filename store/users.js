export const ACTIONS = {
  ADD_USER_METHOD: 'users/addUser',
  SIGN_IN_METHOD: 'users/signIn',
  SIGN_OUT_METHOD: 'users/signOut',
  FORGOT_PASSWORD_METHOD: 'users/forgotPassword',
  REMOVE_USER_METHOD: 'users/removeUser',
}

export const state = () => ({
  user: null,
})

export const mutations = {
  SIGN_IN: (state, user) => {
    state.user = user
  },
  REMOVE_USER: (state, data) => {
    const index = state.data.findIndex((el) => el.email == data.email)
    state.data.splice(index, 1)
  },
}

export const actions = {
  async signIn({ commit, state }, data) {
    try {
      let user = await this.$fire.auth.signInWithEmailAndPassword(data.email, data.password)
      user = JSON.parse(JSON.stringify(user.user))
      //console.log(user);
      this.$cookies.set('user', JSON.stringify(user), {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
      console.log(this.$cookies.get('user'))
      commit('SIGN_IN', user)
    } catch (error) {
      throw new Error()
    }
  },
  signOut({ commit }) {
    this.$cookies.remove('user')

    commit('SIGN_OUT')
  },
  forgotPassword({}, data) {
    try {
      const response = this.$fire.auth.sendPasswordResetEmail(data.email)
      console.log(response)
    } catch (error) {
      throw new Error()
    }
  },
  async addUser({ commit }, data) {
    // const email = data.email
    const { email, password } = data

    try {
      await this.$fire.auth.createUserWithEmailAndPassword(email, password)
    } catch (error) {
      throw new Error()
    }
  },
  removeUser({ commit }) {
    const profile = this.$cookies.get('profile')

    const users = JSON.parse(localStorage.getItem('users'))

    const newUserList = users.filter((user) => user.email != profile.email)

    // ICI

    localStorage.setItem('users', JSON.stringify(newUserList))

    this.dispatch(ACTIONS.INIT_USER_METHOD, newUserList)

    commit('REMOVE_USER', profile)

    this.$cookies.remove('profile')
  },
}
