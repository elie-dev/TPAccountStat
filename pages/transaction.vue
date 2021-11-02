<template>

  <div>
    <v-data-table style='margin-bottom: 50px'
      :headers="headers"
      :items="desserts"
      class="elevation-1"
    >
      <template v-slot:item.calories="{ item }">
        <v-chip
          :color="getColor(item.calories)"
          dark
        >
          {{ item.calories }}
        </v-chip>
      </template>
    </v-data-table>


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
            <v-btn color="warning" text @click="dialog = false">
              Annuler
            </v-btn>
            <v-btn color="success" text @click="dialog = false">
              Enregistrer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

  </div>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ],
    }
  },
  methods: {
    getColor (calories) {
      if (calories > 400) return 'red'
      else if (calories > 200) return 'orange'
      else return 'green'
    },
  },
}
</script>
