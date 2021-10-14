<template>
  <div>
    <v-card class="mx-auto" max-width="400">
      <v-card-subtitle class="pb-0">
        {{ $store.state.users.profile.email }}
      </v-card-subtitle>

      <v-card-actions>
        <v-btn color="orange" text @click="logout"> Déconnexion </v-btn>

        <v-btn color="error" text @click="removeProfile">
          Supprimer mon profil
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { ACTIONS } from '~/store/users'

export default {
  methods: {
    logout() {
      try {
        this.$store.dispatch(ACTIONS.SIGN_OUT_METHOD)

        this.$router.push('/auth')
      } catch (error) {}
    },
    removeProfile() {
      try {
        this.$store.dispatch(ACTIONS.REMOVE_USER_METHOD)

        this.$router.push('/auth')
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
