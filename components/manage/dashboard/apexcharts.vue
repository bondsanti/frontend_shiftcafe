<template>
  <v-card class="rounded-lg" color="">
    <v-app-bar flat color="rgba(0,0,0,0)">
      <v-toolbar-title class="title white--text pl-0 ml-2">
        ภาพรวมร้านค้าในวันนี้
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              วันที่ {{ formatDate(Date.now()) }}
            </v-btn>
          </template>
          <v-list> </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <client-only>
      <div>
        <VueApexCharts
          max-width="100"
          height="350"
          type="area"
          :options="chartOptions"
          :series="series"
        ></VueApexCharts>
      </div>
    </client-only>
  </v-card>
</template>

<script>
import moment from "moment";
export default {
  components: {
    VueApexCharts: () => import("vue-apexcharts")
  },
  data: () => ({
    chartOptions: {
      chart: {
        id: "vuechart-example"
      },
      fill: {
        colors: ["#FFFFFF", "#FFFFFF", "#FFFFFF"]
      },
      xaxis: {
        fontWeight: 400,
        strokeColor: "#fff",
        categories: [
          "9.00.น",
          "10.00.น",
          "11.00 น",
          "12.00.น",
          "13.00 น",
          "14.00 น",
          "15.00 น",
          "16.00.น",
          "17.00.น",
          "18.00.น"
        ],
        fontColor: "red"
      }
    },

    series: [
      {
        name: "ยอดขาย ณ เวลา",
        data: [30, 40, 35, 50, 100, 60, 20, 10, 50, 40]
      }
    ]
  }),
  methods: {
    formatDate(date) {
      var strdate = moment(date).add(543, "years");
      return moment(strdate).format("D/MM/YY ");
    }
  }
};
</script>

<style></style>
