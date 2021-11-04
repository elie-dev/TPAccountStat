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
          v-model="name"
          :rules="nameRules"
          label="Name"
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

        <v-text-field
          v-model="confirmPassword"
          :rules="confirmPasswordRules"
          label="Confirm Password"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          outlined
          required
          @click:append="show2 = !show2"
        />
        <div>
          <NuxtLink to="/auth/login">Me connecter</NuxtLink>
        </div>
        <div class="mt-4">
          <v-row justify="center">
            <v-btn
              color="success"
              class="mr-4"
              @click="register"
            >
              Créer un compte
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
    margin-left: 5%;
    display: flex;
    align-items: center;
  }

  .form > div {
    flex: 1;
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


export default {
  data() {
    return {
      show1: false,
      show2: false,
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail est obligatoire',
        v => /.+@.+\..+/.test(v) || 'E-mail doit être valide',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Mot de passe obligatoire',
        v => (v && v.length >= 6) || 'Mot de passe doit avoir au moins 6 caractères',
      ],
      confirmPassword: '',
      confirmPasswordRules: [
        v => v === this.password || 'Les mots de passes doivent correspondre',
      ],
      checkbox: false,
    }
  },

  methods: {
    async register() {

      if (this.email == '' || this.password == '' || this.name == '') {
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
          name: this.name,
        })
        this.$router.push('/auth/login')
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
