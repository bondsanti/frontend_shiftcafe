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
        <component
          :is="apexchart"
          max-width="100"
          height="400"
          type="line"
          :options="chartOptions"
         :series="formattedData"
        ></component>
      </div>
    </client-only>
  </v-card>
</template>

<script>
import moment from "moment";
export default {
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
    animations: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  computed: {
     apexchart() {
      return () => {
        if (process.client) {
          return import("vue-apexcharts");
        }
      };
    },
    chartOptions() {
      return {
        title: {
        //  text: 'Sieben Sterngasse 3 Location Campaign Grosser',
         // align: "left",
        },
        chart: {
          animations: {
            enabled: this.animations,
          },
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: [
          // {
          //   title: {
          //     text: "ความชื้นใน %",
          //     style: {
          //       //fontSize:  '14px',
          //       //fontWeight:  'bold',
          //       color: "rgb(0, 143, 251)",
          //     },
          //   },
          //   labels: {
          //     formatter: (val) => val * 1,
          //   },
          // },
          {
            opposite: true,
            title: {
              text: "อุณหภูมิ (ในเซลเซียส)",
              style: {
                //fontSize:  '14px',
                //fontWeight:  'bold',
                color: "rgb(0, 227, 150)",
              },
            },
          },
        ],

        labels: this.formattedLabels,
      };
    },
    formattedLabels() {
      return this.chartData.map((d) => d.date);
    },
    formattedData() {
    //  const volumeSeries = this.chartData.map((d) => d.Feuchtigkeit);
      const closeSeries = this.chartData.map((d) => d.Temperatur);
      return [
        // {
        //   name: "Feuchtigkeit",
        //   //type: "column",
        //   type: "line",
        //   data: volumeSeries,
        // },
        {
          name: "Temperatur",
          type: "line",
          data: closeSeries,
        },
      ];
    },
  },
  methods: {
    formatDate(date) {
      var strdate = moment(date).add(543, "years");
      return moment(strdate).format("D/MM/YY ");
    }
  },
};
</script>

<style></style>
