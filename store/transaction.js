export const ACTIONS = {
  ADD_TRANSACTION: 'transaction/addTransaction',
  GET_TRANSACTION: 'transaction/getTransaction',
  DELETE_TRANSACTION: 'transaction/deleteTransaction',
}

export const state = () => ({
  transactions: []
})

export const mutations = {

  ADD_TRANSACTION: (state, transaction) => {
    state.transactions.push(transaction.data) 
    console.log(state.transactions)
  },

  SET_TRANSACTION: (state, transactions) => {
    state.transactions = transactions 
  },

  DELETE_TRANSACTION: (state, transactions) => {
    const index = state.data.findIndex((el) => el.transactions == data.transactions)
    state.data.splice(index, 1)
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
        console.log(error)
        throw new Error()
      }      
  },

  async getTransaction({ commit }) {
    try {
      const currentUser = this.$fire.auth.currentUser
      //console.log(this.$fire.firestore.collection('transaction').add(data))
      this.$fire.firestore
       .collection('dataUser').doc(currentUser.uid).collection('transactions')
       .get()
       .then(
         (data) => (commit('SET_TRANSACTION', data.docs.map((transaction) => transaction.data().data)))
       )
      } catch (error) {
        console.log(error)
        throw new Error()
      } 
  },

  //method for delete transaction
  deleteTransaction({ commit }) {
    try {
      const currentUser = this.$fire.auth.currentUser
      this.$fire.firestore
       .collection('dataUser').doc(currentUser.uid).collection('transactions')
       .splice(index, 1)
       .then(
         () => (commit('DELETE_TRANSACTION', data))
       )
      } catch (error) {
        console.log(error)
        throw new Error()
      }   
  },

  
}
