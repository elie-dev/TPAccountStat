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
        ></v-text-field>

        <v-btn color="success" class="mr-4" @click="register">
          M'enregister
        </v-btn>

        <NuxtLink to="/auth">Me connecter</NuxtLink>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script>
import { ACTIONS } from '~/store/users'
import { BUS_ACTIONS } from '~/store/bus'

export default {
  data: () => ({
    headers: [
      {
        text: 'E-mail',
        value: 'email',
      },
      {
        text: 'Password',
        value: 'password',
      },
    ],
    email: '',
    password: '',
  }),

  methods: {
    async register() {

      if (this.email == '' || this.password == '') {
        this.$store.dispatch(
          BUS_ACTIONS.SET_MESSAGE,
          'Tous les champs sont requis.'
        )

        return
      }

      try {
        await this.$store.dispatch(ACTIONS.ADD_USER_METHOD, {
          email: this.email,
          password: this.password,
        })
      } catch (error) {
        this.$store.dispatch(
          BUS_ACTIONS.SET_MESSAGE,
          'Une erreur est survenue pendant votre enregistrement.'
        )
      }
    },
  },
}
</script>
