<template>

  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Ajouter une donnée
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Ajouter une transaction</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-btn-toggle borderless>
                <v-btn value="left">
                  <span class="hidden-sm-and-down">Revenue</span>
                </v-btn>

                <v-btn value="center">
                  <span class="hidden-sm-and-down">Dépense</span>
                </v-btn>
              </v-btn-toggle>
              <v-col cols="12">
                <v-text-field label="nom" type='text' required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="sous-categorie" type='text' required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="montant" type="number" required></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="date" label="Picker in menu" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                  </template>

                  <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                  </v-date-picker>

                </v-menu>
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="warning"
            text
            @click="dialog = false"
          >
            Annuler
          </v-btn>
          <v-btn
            color="success"
            text
            @click="dialog = false"
          >
            Enregistrer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu: false,
  }),
}
</script>
