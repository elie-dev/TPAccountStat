<template>
  <div>
    <div class="d-flex flex-wrap">
      <piechart :typeTransaction="'depense'" />
      <piechart :typeTransaction="'revenu'" />
    </div> 
    <div></div>
  </div>  
</template>

<style scoped>
</style>

<script>

import { ACTIONS } from '~/store/transaction'
import piechart from '~/components/piechart.vue'
import columnChart from '~/components/columnChart.vue'

export default {
  components: { piechart, columnChart },
  async created() {
     try {
        await this.$store.dispatch(ACTIONS.GET_TRANSACTION)
      } catch (error) {
        return new Error()
      }
  },

  data: () => ({
      
  }),
}
</script>
