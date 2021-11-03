export const ACTIONS = {
  ADD_TRANSACTION: 'transaction/addTransaction',
}

export const state = () => ({
  transactions: []
})

export const mutations = {
  ADD_TRANSACTION: (state, transaction) => {
    state.transactions.push(transaction) 
  },
}

export const actions = {
  async addTransaction({ commit }, data) {

    try {
      const currentUser = this.$fire.auth.currentUser
      //console.log(this.$fire.firestore.collection('transaction').add(data))

      this.$fire.firestore
       .collection('transactions')
       .add(data)
       /*.then(
         (data) => (console.log(data.docs.map((transaction) => transaction.data())))
       )*/
      } catch (error) {
        console.log(error)
        throw new Error()
      }

      
  },
}
