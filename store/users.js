export const ACTIONS = {
  INIT_USER_METHOD: 'users/initUser',
  ADD_USER_METHOD: 'users/addUser',
  SIGN_IN_METHOD: 'users/signIn',
  SIGN_OUT_METHOD: 'users/signOut',
  REMOVE_USER_METHOD: 'users/removeUser',
}

export const state = () => ({
  data: [],
  profile: {},
})

export const mutations = {
  INIT_USER: (state, { profile, users }) => {
    state.data = users
    state.profile = profile
  },
  ADD_USER: (state, data) => {
    if (state.data.findIndex((user) => user.email == data.email) == -1) {
      state.data.push(data)

      localStorage.setItem('users', JSON.stringify(state.data))
    }
  },
  SIGN_IN: (state, data) => {
    const user = state.data.find(
      (user) => user.email == data.email && user.password == data.password
    )

    console.log(user)

    state.profile = user ?? {}
  },
  SIGN_OUT: (state) => {
    state.profile = {}
  },
  REMOVE_USER: (state, data) => {
    const index = state.data.findIndex((el) => el.email == data.email)
    state.data.splice(index, 1)
  },
}

export const actions = {
  initUser({ commit }) {
    const profile = this.$cookies.get('profile') ?? {}
    const users = JSON.parse(localStorage.getItem('users')) ?? []

    commit('INIT_USER', { profile, users })
  },
  signIn({ commit, state }, data) {
    commit('SIGN_IN', data)

    if (state.profile.email == undefined) {
      throw Error('User not found')
    }

    this.$cookies.set('profile', JSON.stringify(state.profile), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
  },
  signOut({ commit }) {
    this.$cookies.remove('profile')

    commit('SIGN_OUT')
  },
  async addUser({ commit }, data) {
    // const email = data.email
    const { email, password } = data

    try {
      await this.$fire.auth.createUserWithEmailAndPassword(email, password)
    } catch (error) {
      console.log(error)
    }

    commit('ADD_USER', data)
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
