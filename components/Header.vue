
<template>
  <main>

    <v-app-bar class="head"
    >
      <!--src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"-->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <img class="ml-12 logo" width="30em" src="~/assets/images/logoStat.png"/>

      <v-spacer></v-spacer>

      <v-btn icon>
        <nuxt-link to="/profil" class="nav-link">
          <v-icon color="white">
            mdi-account
          </v-icon></nuxt-link>
      </v-btn>

      <v-btn icon @click="logOut">
        <nuxt-link to="/auth" class="nav-link">
          <v-icon color="white">
            mdi-export
          </v-icon></nuxt-link>
      </v-btn>

    </v-app-bar>

    <v-navigation-drawer class="light-grey sideBar"
      v-model="drawer"
      absolute
      left
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group class="sideList"
          v-model="group"
          active-class="deep-purple&#45;&#45;text text&#45;&#45;accent-4"
        >
          <v-list-item>
              <v-list-item-title class="menuTexte text-white nvbar-text pt-16 mb-4">Menu :</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <nuxt-link to="/profil" class="nav-link">
              <v-list-item-title class="listeTexte nvbar-text">Page de Profil</v-list-item-title>
            </nuxt-link>
          </v-list-item>

          <v-list-item>
            <nuxt-link to="/stat" class="nav-link">
              <v-list-item-title class="listeTexte nvbar-text">Evolution des dépenses</v-list-item-title>
            </nuxt-link>
          </v-list-item>

          <v-list-item>
            <nuxt-link to="/" class="nav-link">
              <v-list-item-title class="listeTexte nvbar-text">Transaction(s)</v-list-item-title>
            </nuxt-link>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

  </main>
</template>


<script>
  import { ACTIONS } from '~/store/users'

  export default {
    data: () => ({
      drawer: false,
      group: null,
      title: 'Gestion de Budget',
    }),
    methods: {
      logOut() {
        this.$store.dispatch(ACTIONS.SIGN_OUT_METHOD)
        .then(() => {
          this.$router.push('/auth/login')
        })
      },
    },
    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>

<style scoped>
.menuTexte {
  font-size: 1.4em!important;
  font-weight: bolder!important;
  outline: none;
}

.listeTexte {
  font-size: 1.05em!important;
  font-weight: bold!important;
  outline: none;
}

.sideBar {
  z-index: 4;
}
.head {
  z-index: 8;
  /* background-color: #778DA9!important; */
  background-color: rgb(70, 20, 70)!important;
  vertical-align: middle;
}
.sideList {
  padding-top: 2em;
}
.nav-link {
  text-decoration: none!important;
}

</style>

