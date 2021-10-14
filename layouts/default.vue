<template>
  <v-app dark>
    <Header/>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ACTIONS } from '~/store/users'

export default {
  mounted() {
    this.$store.dispatch(ACTIONS.INIT_USER_METHOD)
  },
}
</script>
