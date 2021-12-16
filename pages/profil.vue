<template>
  <div>
    <div>
      <v-container class="grey lighten-5 mt-1" fill-height fluid>
        <v-row no-gutters>

          <v-col cols="4" sm="4" class="text-center">
            <img width="50%" src="https://meetanentrepreneur.lu/wp-content/uploads/2019/08/profil-linkedin.jpg"
                 alt="photo de profil utilisateur"
                 class="rounded-circle">
          </v-col>
          <v-col cols="8" class="mt-7">
            <div class="c1 mr-12 text-center">
                <p>{{ name }}</p>
                <p>{{ email }}</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="c1 ml-12 mr-14">
      <h2 class="ml-8">Changer de mot de passe</h2>
      <v-container class="" fill-height fluid>
        <v-row no-gutters>
          <v-col cols="12" class="text-center">
            <v-form v-model="valid"
                    lazy-validation>
              <v-container>

                    <v-text-field
                      v-model="lastPassword"
                      :rules="lastPasswordRules"
                      label="Ancien mot de passe..."
                      required
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'current-password'"
                      @click:append="show1 = !show1"
                    />

                    <v-text-field
                      v-model="password"
                      :rules="passwordRules"
                      label="Nouveau mot de passe..."
                      required
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show2 ? 'text' : 'new-password'"
                      @click:append="show2 = !show2"
                    />

                    <v-text-field
                      v-model="confirmPassword"
                      :rules="confirmPasswordRules"
                      label="Confirmer nouveau mot de passe..."
                      required
                      :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show3 ? 'text' : 'new-password'"
                      @click:append="show3 = !show3"
                    />

              </v-container>

              <v-row justify='end'>
                <v-btn
                  color="#778DA9"
                  elevation="2"
                  x-large
                >Enregistrer</v-btn>
              </v-row>

            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>


<script>
import Header from '~/components/Header.vue'
import {BUS_ACTIONS} from "~/store/bus";
import {ACTIONS} from "~/store/users";

export default {
  components: { Header },
  data: () => ({
    name: "",
    email: "",
    users: [],
    show1: false,
    show2: false,
    show3: false,
    valid: true,

    lastPassword: "",
    lastPasswordRules: [
      v => !!v || 'Ancien Mot de passe obligatoire',
      // v => v !== this.lastPassword  || 'Ancien mot de passe incorrect',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Mot de passe obligatoire',
      v => (v && v.length >= 6) || 'Mot de passe doit avoir au moins 6 caractères',
    ],
    confirmPassword: '',
    confirmPasswordRules: [
      // v => v === this.password || 'Les mots de passes doivent correspondre',
    ],
  }),
  methods: {
    async changePassword() {
      if (this.lastPassword === '' || this.password === '' || this.confirmPassword === '') {
        await this.$store.dispatch(
          BUS_ACTIONS.SET_MESSAGE,
          'Tous les champs sont requis.'
        )
        return
      }
      try {
        await this.$store.dispatch(ACTIONS.CHANGE_PASSWORD_METHOD, {
        })
        await this.$router.push('/profile')
      } catch (error) {
        await this.$store.dispatch(
          BUS_ACTIONS.SET_MESSAGE,
          'Une erreur est survenue pendant la modification de votre mot de passe.'
        )
      }
    },
  },
  mounted() {
    this.email = this.$fire.auth.currentUser['email']
    this.name = this.$fire.auth.currentUser["displayName"]
  },
}
</script>



<style>
p {
  font-weight: bold;
  font-size: 1.2em;
}

.c1 {
  margin-bottom: 1.5em;
  padding: 1em;
  border: 1px solid grey;
  background-color: #C4C4C4;
  border-radius: 28px;
}

.v-text-field {
  background-color: white;
  border: 1px solid white;
  border-radius:28px;
  padding: 0.3em;
  margin-bottom: 1.2em;
}

.v-btn {
  border-radius: 28px;
  width: 20%;
  margin-right: 1.1em;
}

</style>
