<template>
  <div>
    <template>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-date-picker
            v-model="dates"
            range
          ></v-date-picker>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="dateRangeText"
            label="Date range"
            prepend-icon="mdi-calendar"
            readonly
          ></v-text-field>
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

import { ACTIONS } from '~/store/transaction'
import { BUS_ACTIONS } from '~/store/bus'

import Vue from 'vue'
import VueGoogleCharts from 'vue-google-charts'
 
Vue.use(VueGoogleCharts)

export default {

  props: {
   typeTransaction: String
  },

  methods: {
    setPieChartDepenseData(data, dates) {
      console.log(this.typeTransaction)
      let startDate= new Date(dates[0])
      
      let endDate = new Date()
      if (dates.length < 2) {
        endDate = new Date(dates[0])
      } else {
        endDate = new Date(dates[1])
      }

      if (endDate < startDate) {
        const inverseDate = endDate
        endDate = startDate
        startDate = inverseDate
      }
      startDate = startDate.setDate(startDate.getDate() - 1)
      endDate = endDate.setDate(endDate.getDate() + 1)


      const filterData = {}
      const chartData = [
        ['depense', 'en'],
      ]
      data.forEach(transaction => {
        if (transaction.categorie === this.typeTransaction) {
          if (startDate < (new Date(transaction.date)) && (new Date(transaction.date)) < endDate) {
            if (filterData[transaction.tag] !== undefined) {
              filterData[transaction.tag] = filterData[transaction.tag] + parseInt(transaction.montant) 
            } else {
              filterData[transaction.tag] = parseInt(transaction.montant) 
            }
          }
        }     
      });
      Object.keys(filterData).forEach(key => {
        chartData.push([key, filterData[key]])
      });
      return chartData
    },
  },

  async mounted() {
     try {
        await this.$store.dispatch(ACTIONS.GET_TRANSACTION)
      } catch (error) {
        console.log(error)
        this.$store.dispatch(
          BUS_ACTIONS.SET_MESSAGE,
          'Une erreur est survenue pendant la récupération des transactions.'
        )
      }
  },

  data: () => ({
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        },
        height: 500,
        width: 600,
      },
      dates: ['2021-01-01', '2022-01-01'],
      pieChartDepenseData: [],
  }),

  computed: {
    dateRangeText () {
      return this.dates.join(' ~ ')
    },
  },
}
</script>
