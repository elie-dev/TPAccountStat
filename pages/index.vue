<template>

  <div>
    <v-data-table style='margin-bottom: 50px'
      :headers="headers"
      :items="$store.state.transaction.transactions"
      class="elevation-1"
    >
      <template v-slot:item.categorie="{ item }">
        <v-chip :color="getCategorie(item.categorie)" dark>
          {{ item.categorie }}
        </v-chip>
      </template>
      <template v-slot:item.montant="{ item }">
          {{ item.montant }} €
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
            dark
            v-bind="attrs"
            v-on="on"
            color="success"
            text
          >
            Ajouter une donnée
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Ajouter une transaction</span>
          </v-card-title>


          <v-form  ref="form"
                   v-model="valid"
                   lazy-validation>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-btn-toggle
                    borderless
                    v-model="categorie"
                  >
                    <v-btn value="revenue">
                      <span class="hidden-sm-and-down">Revenue</span>
                    </v-btn>
                    <v-btn value="depense">
                      <span class="hidden-sm-and-down">Dépense</span>
                    </v-btn>
                  </v-btn-toggle>
                  <v-col cols="12">
                    <v-text-field
                      :rules="nameRules"
                      v-model="name"
                      label="nom"
                      type='text'
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">

                    <v-combobox :rules="categorieRules"
                      v-model="tag"
                      label="sous-categorie"
                      required
                      :filter="filter"
                      :hide-no-data="!search"
                      :items="items"
                      :search-input.sync="search"
                      hide-selected
                      small-chips
                      solo>
      <template v-slot:no-data>
        <v-list-item>
          <span class="subheading">Create</span>
          <v-chip
            :color="`${colors[nonce - 1]} lighten-3`"
            label
            small
          >
            {{ search }}
          </v-chip>
        </v-list-item>
      </template>
      <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip
          v-if="item === Object(item)"
          v-bind="attrs"
          :color="`${item.color} lighten-3`"
          :input-value="selected"
          label
          small
        >
          <span class="pr-2">
            {{ item.text }}
          </span>
          <v-icon
            small
            @click="parent.selectItem(item)"
          >
            $delete
          </v-icon>
        </v-chip>
      </template>
    </v-combobox>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      :rules="montantRules"
                      v-model="montant"
                      label="montant"
                      type="number"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :rules="dateRules"
                          v-model="date"
                          label="Picker in menu"
                          prepend-icon="mdi-calendar"
                          readonly v-bind="attrs"
                          v-on="on"
                        >
                        </v-text-field>
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
          </v-form>


          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" text @click="dialog = false">
              Annuler
            </v-btn>
            <v-btn color="success" text @click="addTransaction">
              Enregistrer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <template>
          <v-btn
            dark
            color="success"
            text
            @click="generateDB"
          >
           Générer données aléatoire
          </v-btn>
        </template>
    </v-row>
  </div>
</template>

<script>

import { ACTIONS } from '~/store/transaction'
import { BUS_ACTIONS } from '~/store/bus'
import AlertComponent from '~/components/AlertComponent.vue'
import dataDB from '~/assets/database.json'

export default {
  components: { AlertComponent },
  async mounted() {
     try {
        this.$store.dispatch(ACTIONS.GET_TRANSACTION)
      } catch (error) {
        this.$store.dispatch(
          BUS_ACTIONS.SET_MESSAGE,
          'Une erreur est survenue pendant la récupération des transactions.'
        )
      }
  },

  data: () => ({
    activator: null,
      attach: null,
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      editing: null,
      editingIndex: -1,
      items: [
        
      ],
      nonce: 1,
      menu: false,
      tag: [
        {
          text: 'A Catégoriser',
          color: 'blue',
        },
      ],
      x: 0,
      search: null,
      y: 0,
    dialog: false,
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu: false,
    valid: true,
    isInvalid: false,

    name: '',
    nameRules: [
      v => !!v || 'Un nom est obligatoire',
    ],
    montant: '',
    montantRules: [
      v => !!v || 'Un montant est obligatoire',
    ],
    tag: '',
    tagRules: [
      v => !!v || 'Un tag est obligatoire',
    ],
    date: '',
    dateRules: [
      v => !!v || 'Une date est obligatoire',
    ],
    categorie: '',
    categorieRules: [
      v => !!v || 'Une categorie est obligatoire',
    ],


    headers: [
        {
          text: 'Nom',
          align: 'start',
          sortable: false,
          value: 'name',
          selected: [],
        },
        { text: 'Categorie', value: 'categorie' },
        { text: 'Montant', value: 'montant' },
        { text: 'Tag', value: 'tag' },
        { text: 'Date', value: 'date' },
        { text: 'Actions', value: '' },
      ],
  }),

  computed: {
  doneTodosCount () {
      return this.$store.state.transaction.tags
    }
  },

  watch: {
      model (val, prev) {
        if (val.length === prev.length) return
        this.tag = val.map(v => {
          if (typeof v === 'string') {
            v = {
              text: v,
              color: this.colors[this.nonce - 1],
            }
            this.items.push(v)
            this.nonce++
          }
          return v
        })
      },
      doneTodosCount() {
        const tagsList = []
        this.$store.state.transaction.tags.forEach((item, index) => {
          tagsList.push({
            'text': item,
            'color': this.colors[index % this.colors.length]
          })
        })
        this.items = tagsList
      }
    },

  methods: {
    
      filter (item, queryText, itemText) {
        if (item.header) return false
        const hasValue = val => val != null ? val : ''
        const text = hasValue(itemText)
        const query = hasValue(queryText)
        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      },



    getCategorie (categorie) {
      if (categorie === "depense") return 'red'
      else return 'green'
    },

    generateDB () {
      dataDB.data.forEach(element => {
        try {
          this.$store.dispatch(ACTIONS.ADD_TRANSACTION, {
            data: element
          })
        } catch (error) {
          this.$store.dispatch(
            BUS_ACTIONS.SET_MESSAGE,
            'Une erreur est survenue pendant l ajout de votre transaction.'
          )
        }
      });
    },

    async addTransaction() {
      if (this.tag == '' || this.name == '' || this.categorie == '' || this.montant == '' || this.date == '') {
        this.$store.dispatch(
          BUS_ACTIONS.SET_MESSAGE,
          'Tous les champs sont requis.'
        )
        return
      }

        this.dialog = false
        const data = {
          categorie : this.categorie,
          name : this.name,
          tag : this.tag.text,
          montant : this.montant,
          date : this.date
      }

      try {
        await this.$store.dispatch(ACTIONS.ADD_TRANSACTION, {
          data: data
        })
      } catch (error) {
        this.$store.dispatch(
          BUS_ACTIONS.SET_MESSAGE,
          'Une erreur est survenue pendant l\'ajout de votre transaction.'
        )
      }
    },
  },
}


</script>
