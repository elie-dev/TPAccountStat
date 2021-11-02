<template>
  <div>
    <div class="form">
      <div>
        <div class="logo"><img src="~/assets/images/logoStat.png" /></div>
        <div class="font-weight-bold text-h3 text-center mt-5 mb-5">réinitialiser mot de passe</div>
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
        <div>
          <NuxtLink to="/auth/login">Me connecter</NuxtLink>
        </div>
        <div class="mt-4">
          <v-row justify="center">
            <v-btn
              color="success"
              class="mr-4"
              @click="forgotPassword"
            >
              Envoyer
            </v-btn>
          </v-row>
        </div>

      </v-form></div>
    </div>
    <div class="kwadrat d-none d-lg-block">
      <div class="trojkat">
        <div class="trojkat_bg"></div>
      </div>
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

  .kwadrat
  { 
    position: absolute;
    bottom: 0;
    right: 0;
    width: 750px; 
    height: 1300px; 
    border-bottom: 1px solid #000; 
    overflow: hidden; 
  }
  .trojkat
  { 
    position: relative; 
    overflow: hidden; 
    transform: rotate(45deg) skew(10deg,10deg); 
    width: 1080px;
    height: 1300px;
    margin:720px 0 0 32px;
  }

  .trojkat_bg
  {
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    z-index: -1;
    background: url("~/assets/images/statFond.jpg");
    background-size: 100%;
    background-position: center top;
    transform: skew(-10deg,-10deg) rotate(-45deg) ;
    transition: .3s;
  }
</style>

<script>

import { ACTIONS } from '~/store/users'
import { BUS_ACTIONS } from '~/store/bus'
import AlertComponent from '~/components/AlertComponent.vue'

export default {
  components: { AlertComponent },
  data: () => ({
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail est obligatoire',
        v => /.+@.+\..+/.test(v) || 'E-mail doit être valide',
      ],
      password: '',
      isInvalid: false,
    }),
  methods: {
    async forgotPassword() {

      try {
        await this.$store.dispatch(ACTIONS.FORGOT_PASSWORD_METHOD, {
          email: this.email,
        })
        //this.$router.push('/')
      } catch (error) {
        console.log(error)
        this.$store.dispatch(
          BUS_ACTIONS.SET_MESSAGE,
          'Email inconnu'
        )
      }
    },
  },
}
</script>
