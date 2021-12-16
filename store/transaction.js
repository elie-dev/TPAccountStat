export const ACTIONS = {
  ADD_TRANSACTION: 'transaction/addTransaction',
  GET_TRANSACTION: 'transaction/getTransaction',
}

export const state = () => ({
  transactions: []
})

export const mutations = {
  ADD_TRANSACTION: (state, transaction) => {
    state.transactions.push(transaction.data) 
  },
  SET_TRANSACTION: (state, transactions) => {
    state.transactions = transactions 
  },
}

export const actions = {
  async addTransaction({ commit }, data) {

    try {
      const currentUser = this.$fire.auth.currentUser

      this.$fire.firestore
       .collection('dataUser').doc(currentUser.uid).collection('transactions')
       .add(data)
       .then(
         () => (commit('ADD_TRANSACTION', data))
       )
      } catch (error) {
        throw new Error()
      }      
  },

  async getTransaction({ commit }) {
    try {
      const currentUser = this.$fire.auth.currentUser
      this.$fire.firestore
       .collection('dataUser').doc(currentUser.uid).collection('transactions')
       .get()
       .then(
         (data) => (commit('SET_TRANSACTION', data.docs.map((transaction) => transaction.data().data)))
       )
      } catch (error) {
        throw new Error()
      }

      
  },
}
