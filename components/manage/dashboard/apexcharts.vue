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
          height="350"
          type="area"
          :options="chartOptions"
          :series="series"
        ></component>
      </div>
    </client-only>
  </v-card>
</template>

<script>
import moment from "moment";
const today = new Date();
export default {
  props: {
    chartData: {
      type: Array,
      default: () => []
    },
    animations: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      series: [
        {
          name: "อาหาร",
          data: [11, 32, 45, 32, 34, 52, 41, 25, 63, 50, 32, 4, 10]
        },
        {
          name: "เครื่องดื่ม",
          data: [15, 50, 55, 60, 62, 0, 56, 46, 50, 49, 44, 40, 25]
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "area"
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        xaxis: {
          type: "datetime",
          categories: [
            "2018-09-19T00:00:00.000Z",
            "2018-09-19T01:30:00.000Z",
            "2018-09-19T02:30:00.000Z",
            "2018-09-19T03:30:00.000Z",
            "2018-09-19T04:30:00.000Z",
            "2018-09-19T05:30:00.000Z",
            "2018-09-19T06:30:00.000Z"
          ]
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm"
          }
        }
      }
    };
  },
  computed: {
    apexchart() {
      return () => {
        if (process.client) {
          return import("vue-apexcharts");
        }
      };
    }
    // chartOptions() {
    //   return {
    //     title: {
    //     //  text: 'Sieben Sterngasse 3 Location Campaign Grosser',
    //      // align: "left",
    //     },
    //     chart: {
    //       animations: {
    //         enabled: this.animations,
    //       },
    //     },
    //     xaxis: {
    //       type: "datetime",
    //     },
    //     yaxis: [
    //       // {
    //       //   title: {
    //       //     text: "ความชื้นใน %",
    //       //     style: {
    //       //       //fontSize:  '14px',
    //       //       //fontWeight:  'bold',
    //       //       color: "rgb(0, 143, 251)",
    //       //     },
    //       //   },
    //       //   labels: {
    //       //     formatter: (val) => val * 1,
    //       //   },
    //       // },
    //       {
    //         opposite: true,
    //         title: {
    //           text: "อุณหภูมิ (ในเซลเซียส)",
    //           style: {
    //             //fontSize:  '14px',
    //             //fontWeight:  'bold',
    //             color: "rgb(0, 227, 150)",
    //           },
    //         },
    //       },
    //     ],

    //     labels: this.formattedLabels,
    //   };
    // },
    // formattedLabels() {
    //   return this.chartData.map((d) => d.date);
    // },
    // formattedData() {
    // //  const volumeSeries = this.chartData.map((d) => d.Feuchtigkeit);
    //   const closeSeries = this.chartData.map((d) => d.Temperatur);
    //   return [
    //     // {
    //     //   name: "Feuchtigkeit",
    //     //   //type: "column",
    //     //   type: "line",
    //     //   data: volumeSeries,
    //     // },
    //     {
    //       name: "Temperatur",
    //       type: "line",
    //       data: closeSeries,
    //     },
    //   ];
    // },
  },
  methods: {
    formatDate(date) {
      var strdate = moment(date).add(543, "years");
      return moment(strdate).format("D/MM/YY ");
    },
    rangeTime() {
      const today = new Date();
      this.chartOptions.xaxis.categories = [
        `${new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          "16",
          "00"
        )}`,
        `${new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          "17",
          "00"
        )}`,
        `${new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          "18",
          "00"
        )}`,
        `${new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          "19",
          "00"
        )}`,
        `${new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          "20",
          "00"
        )}`,
        `${new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          "21",
          "00"
        )}`,
        `${new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          "22",
          "00"
        )}`,
        `${new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          "23",
          "00"
        )}`,
        `${new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          "24",
          "00"
        )}`,
        `${new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1,
          "01",
          "00"
        )}`,
        `${new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1,
          "02",
          "00"
        )}`,
        `${new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1,
          "03",
          "00"
        )}`,
        `${new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1,
          "04",
          "00"
        )}`
      ];
    }
  },
  created() {
    this.rangeTime();
    //console.log(this.chartOptions.xaxis.categories);
  }
};
</script>

<style></style>
