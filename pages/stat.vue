<template>
  <div>
    <piechart :typeTransaction="'depense'" />
    <piechart :typeTransaction="'revenue'" />
  </div>  
</template>

<style scoped>
</style>

<script>

import { ACTIONS } from '~/store/transaction'
import piechart from '~/components/pichart.vue'

export default {
  components: { piechart },
  async mounted() {
     try {
        await this.$store.dispatch(ACTIONS.GET_TRANSACTION)
        pieChartDepenseData()
      } catch (error) {
        return new Error()
      }
  },

  data: () => ({
      
  }),
}
</script>
