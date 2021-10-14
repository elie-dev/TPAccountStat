<template>
  <v-form ref="form">
    <alert-component />

    <v-card class="mb-10">
      <v-card-text>
        <v-text-field
          type="email"
          v-model="email"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          type="password"
          v-model="password"
          label="Mot de passe"
          required
        ></v-text-field
        ><v-btn color="success" class="mr-4" @click="login"> Connexion </v-btn>

        <NuxtLink to="/auth/register">M'enregister</NuxtLink>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script>
import { ACTIONS } from '~/store/users'
import { BUS_ACTIONS } from '~/store/bus'
import AlertComponent from '~/components/AlertComponent.vue'

export default {
  components: { AlertComponent },
  data: () => ({
    email: '',
    password: '',
    isInvalid: false,
  }),
  methods: {
    login() {

      if (this.email == '' || this.password == '') {
        this.$store.dispatch(
          BUS_ACTIONS.SET_MESSAGE,
          'Tous les champs sont requis.'
        )

        return
      }

      try {
        this.$store.dispatch(ACTIONS.SIGN_IN_METHOD, {
          email: this.email,
          password: this.password,
        })
        //this.$router.push('/')
      } catch (error) {
        console.log(error)
        this.$store.dispatch(
          BUS_ACTIONS.SET_MESSAGE,
          'Vos identifiants ne sont pas corrects.'
        )
      }
    },
  },
}
</script>
