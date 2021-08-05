<template>
  <v-card class="rounded-lg" color="">
    <v-app-bar flat color="rgba(0,0,0,0)">
      <v-spacer></v-spacer>

      <div class="text-center">
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-left="280"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              วันที่ {{ formatDate(dateNow) }}
            </v-btn>
          </template>
          <v-date-picker
            v-model="dateNow"
            @input="sendDate"
            locale="th-TH"
            @change="sendDate"
          ></v-date-picker>
        </v-menu>
      </div>
    </v-app-bar>
    <client-only>
      <div class="ml-3">
        <component
          :is="apexchart"
          max-width="100"
          height="350"
          type="bar"
          :options="chartOptions"
          :series="series"
        ></component>
      </div>
    </client-only>
  </v-card>
</template>

<script>
import moment from "moment";
//const today = new Date();
export default {
  props: {
    animations: {
      type: Boolean,
      default: true
    },
    year: Array
  },
  data() {
    return {
      series: [
        {
          name: "อาหารและเครื่องดื่ม",
          data: []
        }
      ],
      chartOptions: {
        colors: ["#F44336"],
        chart: {
          height: 350,
          type: "bar"
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: "top" // top, center, bottom
            }
          }
        },
        dataLabels: {
          enabled: true,
          offsetY: -20,
          style: {
            fontSize: "16px",
            colors: ["#304758"]
          } // top, center, bottom
        },
        stroke: {
          curve: "smooth"
        },
        xaxis: {
          categories: [
            "09:00 น. - 10:00 น.",
            "10:00 น. - 11:00 น.",
            "11:00 น. - 12:00 น.",
            "12:00 น. - 13:00 น.",
            "13:00 น. - 14:00 น.",
            "14:00 น. - 15:00 น.",
            "15:00 น. - 16:00 น.",
            "16:00 น. - 17:00 น.",
            "17:00 น. - 18:00 น.",
            "18:00 น. - 19:00 น.",
            "19:00 น. - 20:00 น."
          ]
        },
        tooltip: {
          x: {
            //format: "dd/MM/yy HH:mm"
          }
        }
      },
      menu2: false,
      dateNow: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
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
  },
  methods: {
    formatDate(date) {
      var strdate = moment(date).add(543, "years");
      return moment(strdate).format("D/MM/YY ");
    },
    sendDate() {
      this.$emit("sendDateIndex", this.dateNow);
      this.getTime2();
      this.menu2 = false;
      //console.log(this.dateNow);
    },
    thinkTime(hours) {
      let date = new Date(this.dateNow);
      let date2 = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        hours,
        "00"
      );
      //console.log(date2);
      return date2;
    },
    getTime(min, max) {
      const minTime = this.thinkTime(min);
      const maxTime = this.thinkTime(max);
      const result = this.year.filter(n => {
        return (
          new Date(n.datetime).getTime() >= minTime.getTime() &&
          new Date(n.datetime).getTime() <= maxTime.getTime()
        );
      });
      //console.log(result);
      return result;
    },
    getTime2() {
      this.series = [
        {
          name: "อาหารและเครื่องดื่ม",
          data: [
            this.getTime("09", "10").length,
            this.getTime("10", "11").length,
            this.getTime("11", "12").length,
            this.getTime("12", "13").length,
            this.getTime("13", "14").length,
            this.getTime("14", "15").length,
            this.getTime("15", "16").length,
            this.getTime("16", "17").length,
            this.getTime("17", "18").length,
            this.getTime("18", "19").length,
            this.getTime("19", "20").length
          ]
        }
      ];
      //this.series[0].data =
      //console.log(this.getTime("14", "15").length);
    }
  },
  created() {
    //this.rangeTime();
    //console.log(this.year);
    this.getTime2();
  }
};
</script>

<style></style>
