<template>
  <div>
    <div class="form">
        <div><v-form
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
    margin-left: 5%;
    display: flex;
    align-items: center;
  }

  .form > div {
    flex: 1;
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
        //this.$router.push('/')
      } catch (error) {
        console.log('test')
        this.$store.dispatch(
          BUS_ACTIONS.SET_MESSAGE,
          'Vos identifiants ne sont pas corrects.'
        )
      }
    },
  },
}
</script>
