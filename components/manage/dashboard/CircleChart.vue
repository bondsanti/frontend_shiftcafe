<template>
  <v-card class="rounded-lg" color="shades">
    <v-app-bar flat color="rgba(0,0,0,0)">
      <h3>
        จำนวนอาหารและเครื่องดื่มที่ขายได้ ประจำวันที่ {{ formatDate(dateNow) }}
      </h3>
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
            @input="sendDate2"
            locale="th-TH"
            @change="sendDate2"
          ></v-date-picker>
        </v-menu>
      </div>
    </v-app-bar>
    <client-only>
      <div class="ml-3">
        <component
          :is="apexchart"
          max-width="100"
          height="auto"
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
    year: Array,
    category: Array,
    title: String,
    phylum: String,
    product: Array
  },
  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          type: "bar",
          height: 380,
          toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: true
            },
            export: {
              csv: {
                filename: "รายงานสินค้าประจำวันที่",
                columnDelimiter: ",",
                headerCategory: "ชื่อสินค้า",
                headerValue: "จำนวนที่ขายได้",
                dateFormatter(timestamp) {
                  return new Date(timestamp).toDateString();
                }
              },
              svg: {
                filename: "รายงานสินค้าประจำวันที่"
              },
              png: {
                filename: "รายงานสินค้าประจำวันที่"
              }
            }
          }
        },
        plotOptions: {
          bar: {
            barHeight: "100%",
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: "bottom"
            }
          }
        },

        dataLabels: {
          enabled: true,
          textAnchor: "start",
          style: {
            colors: ["#fff"]
          },
          formatter: function(val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },
        xaxis: {
          categories: []
        },
        yaxis: {
          labels: {
            show: false
          }
        },

        tooltip: {
          theme: "dark",
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function() {
                return "";
              }
            }
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
    sendDate2() {
      this.checkFileName();
      this.series = [];
      this.mergeProduct();
      this.menu2 = false;
      // console.log(this.dateNow);
      //this.mergeProduct();
    },
    checkFileName() {
      const label = this.product.map(p => p.product_name);
      const chartOptions2 = {
        chart: {
          type: "bar",
          height: 380,
          toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: true
            },
            export: {
              csv: {
                filename: "รายงานสินค้า " + this.dateNow,
                columnDelimiter: ",",
                headerCategory: "ชื่อสินค้า",
                headerValue: "จำนวนที่ขายได้",
                dateFormatter(timestamp) {
                  return new Date(timestamp).toDateString();
                }
              },
              svg: {
                filename: "รายงานสินค้า " + this.dateNow
              },
              png: {
                filename: "รายงานสินค้า " + this.dateNow
              }
            }
          }
        },
        plotOptions: {
          bar: {
            barHeight: "100%",
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: "bottom"
            }
          }
        },

        dataLabels: {
          enabled: true,
          textAnchor: "start",
          style: {
            colors: ["#fff"]
          },
          formatter: function(val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },
        xaxis: {
          categories: label
        },
        yaxis: {
          labels: {
            show: false
          }
        },

        tooltip: {
          theme: "dark",
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function() {
                return "";
              }
            }
          }
        }
      };
      this.chartOptions = chartOptions2;
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
    getProductById(arr, id) {
      let newPro = [];

      newPro = arr.filter(a => {
        return a.ref_pro_id._id === id;
      });
      let countQty = 0;
      newPro.map(n => {
        countQty += n.qty;
      });
      //console.log(countQty);

      return countQty;
    },
    mergeProduct() {
      let pro = [];
      let res = [];
      this.getItemByDay().map(item => {
        item.ref_order_id ? pro.push(...item.ref_order_id.list_product) : "";
      });
      this.product.map(p => {
        //this.series[0].data.push(this.getProductById(pro, p._id).length);
        res.push(this.getProductById(pro, p._id));
      });
      const resObj = {
        data: res
      };
      this.series.push(resObj);
      //console.log(this.series[0].data);
    }
  },
  created() {
    this.checkFileName();
    this.mergeProduct();
  }
};
</script>

<style></style>
