<template>
  <v-card class="rounded-lg" color="">
    <v-app-bar flat color="rgba(0,0,0,0)">
      <h3>{{ title }}</h3>
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
          type="pie"
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
    year: Array,
    category: Array,
    title: String,
    phylum: String
  },
  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          width: "100%",
          type: "pie"
        },

        labels: [],
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -5
            }
          }
        },
        fill: {
          type: "gradient"
        },

        legend: {
          show: false
        },
        dataLabels: {
          formatter(val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex];
            return [name, val.toFixed(1) + "%"];
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
      this.series = [];
      this.mergeProduct();
      this.menu2 = false;
    },
    getItemByDay() {
      let date = new Date(this.dateNow);
      const day = this.year.filter(d => {
        return (
          new Date(d.datetime).getDate() === date.getDate() &&
          new Date(d.datetime).getMonth() === date.getMonth() &&
          new Date(d.datetime).getFullYear() === date.getFullYear()
        );
      });
      //console.log(day);
      return day;
    },
    getProductByCategory(arr, id) {
      let newCat = [];
      if (this.phylum === "category") {
        newCat = arr.filter(a => {
          return a.ref_pro_id.ref_cate_id === id;
        });
        //console.log(newCat);
      } else {
        newCat = arr.filter(a => {
          return a.ref_pro_id.ref_uid === id;
        });
      }
      return newCat;
    },
    mergeProduct() {
      let pro = [];

      this.getItemByDay().map(item => {
        pro.push(...item.ref_order_id.list_product);
      });
      this.category.map(c => {
        this.series.push(this.getProductByCategory(pro, c._id).length);
      });
    }
  },
  created() {
    this.chartOptions.labels = this.category.map(c => {
      return this.phylum === "category" ? c.cate_name : c.u_name;
    });

    this.mergeProduct();
  }
};
</script>

<style></style>
