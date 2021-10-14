<!--<template>
  <v-toolbar
    dark
    prominent
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >

    <v-app-bar-nav-icon>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        bottom
        temporary
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            v-model="group"
            active-class="deep-purple&#45;&#45;text text&#45;&#45;accent-4"
          >
            <v-list-item>
              <v-list-item-title>Foo</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Bar</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Fizz</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Buzz</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-app-bar-nav-icon>



    <v-layout align-center justify-end>
      <v-toolbar-title class="ma-8">Gestion de Compte</v-toolbar-title>
    </v-layout>
    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-toolbar>
</template>-->


<template>
  <main>
    <v-app-bar class="bar grey"
      prominent
    >
      <!--src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"-->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-layout align-center justify-end>
        <v-toolbar-title class="mt-8">Gestion de Budget</v-toolbar-title>
      </v-layout>

      <v-spacer></v-spacer>

      <v-btn icon>
        <nuxt-link to="/auth" class="nav-link"><v-icon>mdi-account</v-icon></nuxt-link>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      left
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple&#45;&#45;text text&#45;&#45;accent-4"
        >
          <v-list-item>
            <nuxt-link to="/dashboard" class="nav-link">
              <v-list-item-title>Evolution des dépenses</v-list-item-title>
            </nuxt-link>
          </v-list-item>

          <v-list-item>
            <nuxt-link to="/dashboard" class="nav-link">
              <v-list-item-title>Récapitulatif des transactions</v-list-item-title>
            </nuxt-link>
          </v-list-item>

          <v-list-item>
            <nuxt-link to="/dashboard" class="nav-link">
            <v-list-item-title>Tableau de bord</v-list-item-title>
            </nuxt-link>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

  </main>
</template>


<script>

  export default {
    data: () => ({
      drawer: false,
      group: null,
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>

<style>
.bar {
  color: #778DA9;
}
</style>
