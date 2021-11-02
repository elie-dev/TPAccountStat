
<template>
  <main>

    <v-app-bar class="head"
      prominent
    >
      <!--src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"-->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <img class="ml-12 logo" width="30em" src="~/assets/logos/logoStat.png"/>

      <v-spacer></v-spacer>

      <v-btn icon>
        <nuxt-link to="/auth" class="nav-link">
          <v-icon color="white">
            mdi-account
          </v-icon></nuxt-link>
      </v-btn>

      <v-btn icon dark @click="logOut">
        <v-icon>mdi-export</v-icon>
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
            <nuxt-link to="/dashboard" class="nav-link sideList">
              <v-list-item-title class="text-white nvbar-text font-weight-bold">Evolution des dépenses</v-list-item-title>
            </nuxt-link>
          </v-list-item>

          <v-list-item>
            <nuxt-link to="/dashboard" class="nav-link">
              <v-list-item-title class="nvbar-text font-weight-bold">Récapitulatif des transactions</v-list-item-title>
            </nuxt-link>
          </v-list-item>

          <v-list-item>
            <nuxt-link to="/dashboard" class="nav-link">
            <v-list-item-title class="nvbar-text font-weight-bold">Tableau de bord</v-list-item-title>
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

.sideBar {
  z-index: 4;
}
.head {
  z-index: 8;
  background-color: #778DA9!important;
  vertical-align: middle;
  height: 60px!important;
}

.sideList {
  margin-top: 12em;
}

</style>

