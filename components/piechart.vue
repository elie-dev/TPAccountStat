<template>
  <div>
    <template>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-dialog ref="dialog" v-model="modal" :return-value.sync="dates" persistent width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="dates" label="Dates" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on:click:append="modal=true" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="dates" range scrollable>
              <v-spacer></v-spacer>
              <v-btn text @click="dates = []">Clear</v-btn>
              <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(dates)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select v-model="tagsValue" :items="tagsItems" attach chips label="Tags" multiple></v-select>
        </v-col>
      </v-row>
    </template>
    <div>
      <GChart
        type="PieChart"
        :data="setPieChartDepenseData($store.state.transaction.transactions, dates)"
        :options="chartOptions"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueGoogleCharts from 'vue-google-charts'
 
Vue.use(VueGoogleCharts)

export default {

  props: {
   typeTransaction: String
  },

  methods: {
    setPieChartDepenseData(data, dates) {
      let startDate= ''
      let endDate = ''
      const filterData = {}
      const chartData = [
        ['depense', 'en'],
      ]

      if (dates.length > 0) {
        startDate= new Date(dates[0])
        endDate = new Date()

        if (dates.length === 2){
          endDate = new Date(dates[1])
        } else {
          endDate = new Date(dates[0])
        }

        if (endDate < startDate) {
          const inverseDate = endDate
          endDate = startDate
          startDate = inverseDate
        }
        startDate = startDate.setDate(startDate.getDate() - 1)
        endDate = endDate.setDate(endDate.getDate() + 1)

        data.forEach(transaction => {
          if (transaction.categorie === this.typeTransaction) {
            if (startDate < (new Date(transaction.date)) && (new Date(transaction.date)) < endDate) { // verification de la date
              if (filterData[transaction.tag] !== undefined) {
                filterData[transaction.tag] = filterData[transaction.tag] + parseInt(transaction.montant) 
              } else {
                filterData[transaction.tag] = parseInt(transaction.montant) 
              }
            }
          }     
        });

      } else {
        data.forEach(transaction => {
          if (transaction.categorie === this.typeTransaction) {
            if (filterData[transaction.tag] !== undefined) {
              filterData[transaction.tag] = filterData[transaction.tag] + parseInt(transaction.montant) 
            } else {
              filterData[transaction.tag] = parseInt(transaction.montant) 
            }
          }     
        });
      }
      
      
      Object.keys(filterData).forEach(key => {
        // Si le tag n'est pas présent on met la valeur a zero
        if (this.tagsValue.find(element => element === key) !== undefined) {
          chartData.push([key, filterData[key]])
        } else {
          chartData.push([key, 0])
        }
      });
      return chartData
    },
  },

  data: () => ({
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        },
        height: 300,
        width: '100%',
      },
      dates: ['2021-01-01', '2022-01-01'],
      pieChartDepenseData: [],
      menu: false,
      modal: false,
      menu2: false,
      tagsItems: ['voiture', 'jeux', 'maison', 'nourriture'],
      tagsValue: ['voiture', 'jeux', 'maison', 'nourriture'],
  }),
}
</script>
