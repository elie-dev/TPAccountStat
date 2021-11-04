<template>
  <div>
    <div class="form">
      <div>
        <div class="logo"><img src="~/assets/images/logoStat.png" /></div>
        <div class="font-weight-bold text-h3 text-center mt-5 mb-5">Se connecter</div>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          outlined
          required
        />

        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="show1 ? 'text' : 'password'"
          label="Mot de passe"
          outlined
          required
          @click:append="show1 = !show1"
        />
        <div>
          <NuxtLink to="/auth/forgotPassword">Mot de passe oublié</NuxtLink>
        </div>
        <div>
          <NuxtLink to="/auth/register">M'enregister</NuxtLink>
        </div>
        <div class="mt-4">
          <v-row justify="center">
            <v-btn
              color="success"
              class="mr-4"
              @click="login"
            >
              Se connecter
            </v-btn>
          </v-row>
        </div>

      </v-form></div>
    </div>
    <div class="image d-none d-lg-block">
    </div>
  </div>
  
</template>

<style lang="scss" scoped>
  .form {
    max-width: 500px;
    height: 90vh;
    vertical-align: middle;
    display: flex;
    align-items: center;
  }

  .form > div {
    flex: 1;
  }

  .logo {
    margin-left: auto;
    margin-right: auto;
    width: 150px;
  }

  .logo > img {
    width: 100%;
  }

  .image  {
    position: absolute;
    background: url("~/assets/images/statFond.jpg");
    background-size: 200%;
    background-position: center top;
    right: 0;
    top: 0;
    width: 50%;
    height: 100vh;
  }
</style>

<script>

import { ACTIONS } from '~/store/users'
import { BUS_ACTIONS } from '~/store/bus'
import AlertComponent from '~/components/AlertComponent.vue'

export default {
  components: { AlertComponent },
  data: () => ({
      show1: false,
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail est obligatoire',
        v => /.+@.+\..+/.test(v) || 'E-mail doit être valide',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Mot de passe obligatoire',
      ],
      isInvalid: false,
    }),
  methods: {
    async login() {

      if (this.email == '' || this.password == '') {
        this.$store.dispatch(
          BUS_ACTIONS.SET_MESSAGE,
          'Tous les champs sont requis.'
        )

        return
      }

      try {
        await this.$store.dispatch(ACTIONS.SIGN_IN_METHOD, {
          email: this.email,
          password: this.password,
        })
        this.$router.push('/')
      } catch (error) {
        this.$store.dispatch(
          BUS_ACTIONS.SET_MESSAGE,
          'Vos identifiants ne sont pas corrects.'
        )
      }
    },
  },
}
</script>
