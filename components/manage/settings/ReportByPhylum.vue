<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialogPhylum"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="$emit('closeRe')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>
            {{
              reportType === "ประจำวัน"
                ? "รายงานยอดขายประจำวันที่ " + formatDate(daytime)
                : "รายงานยอดขายประจำเดือน " + formatDate2(daytime)
            }}</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="open">
              บันทึกเป็น PDF
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-sheet
          elevation="18"
          class="ma-auto pa-5 "
          height="auto"
          width="210mm"
          id="print"
        >
          <v-row class="justify-center align-center">
            <h2>{{ $store.getters["setting"][0].restaurant }}</h2>
          </v-row>
          <v-row class="justify-center align-center">
            <h3>
              {{
                reportType === "ประจำวัน"
                  ? "รายงานยอดขายประจำวันที่ " + formatDate(daytime)
                  : "รายงานยอดขายประจำเดือน " + formatDate2(daytime)
              }}
            </h3>
          </v-row>
          <v-row class="justify-center align-center">
            <h3>แยกตามประเภทสินค้า</h3>
          </v-row>
          <v-row class="justify-center align-center mt-6">
            <p style="font-size:14px">
              สินค้าขายดี 5 อันดับแรก
            </p>
          </v-row>
          <v-row class="mx-auto my-5" v-for="(unit, i) in units" :key="i">
            <v-col cols="12">
              <h4>{{ unit.u_name }}ขายดี 5 อันดับแรก</h4>
            </v-col>
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left" width="60px">
                      ลำดับ
                    </th>
                    <th class="text-left" width="300px">
                      รายการ
                    </th>
                    <th class="text-left" width="100px">
                      จำนวน
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in filterProduct(unit._id)" :key="i">
                    <td>{{ i + 1 }}</td>
                    <td>
                      {{
                        item.topping.length !== 0
                          ? item.name + " - " + item.topping.map(t => t.name)
                          : item.name
                      }}
                    </td>
                    <td>{{ item.qty }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-row>
        </v-sheet>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "./vfs_fonts";
export default {
  props: ["dialogPhylum", "daytime", "reportType", "reportBy", "units"],

  data() {
    return {
      list: []
    };
  },
  methods: {
    formatDate(date) {
      this.$moment().format("LLLL");
      let strdate = this.$moment(date).add(543, "years");
      return this.$moment(strdate).format("DD MMMM YYYY ");
    },
    formatDate2(date) {
      this.$moment().format("LLLL");
      let strdate = this.$moment(date).add(543, "years");
      return this.$moment(strdate).format("MMMM YYYY ");
    },
    makeReport(payments) {
      this.list = [];
      const res = [];
      payments.map(p => {
        if (p.ref_order_id) {
          res.push(...p.ref_order_id.list_product);
        }
      });
      res.map(r => {
        this.replace(r);
      });

      //console.log(this.list);
    },
    replace(obj) {
      //console.log(obj);
      let toppingPrice = 0;
      obj.topping.map(t => (toppingPrice += t.price));
      const newObj = {
        name: obj.name,
        qty: obj.qty,
        price: parseInt(obj.normal_price) + parseInt(toppingPrice),
        total: obj.price,
        topping: obj.topping,
        unit: obj.ref_pro_id ? obj.ref_pro_id.ref_uid : ""
      };
      for (let i in this.list) {
        let newTopping = newObj.topping.map(t => t._id);
        let oldTopping = this.list[i].topping.map(t => t._id);
        const res = newTopping.map(t => oldTopping.includes(t));
        let check = value => value === true;

        if (this.list[i].name === newObj.name) {
          if (this.list[i].topping.length === newObj.topping.length) {
            if (res.every(check)) {
              this.list[i].qty += newObj.qty;
              this.list[i].total =
                parseInt(this.list[i].total) + parseInt(newObj.total);
              this.list[i].price = this.list[i].total / this.list[i].qty;
              // setTimeout(this.totalPrice, 300);
              return;
            }
          }
        }
      }
      this.list.push(newObj);
    },
    filterProduct(id) {
      const result = this.list.filter(l => l.unit === id);
      const result2 = result.sort((a, b) => b.qty - a.qty);
      //console.log(result2);
      return result2.slice(0, 5);
    },
    formatPrice(value2) {
      const value = parseInt(value2);
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async open() {
      const content2 = [];
      for (let i in this.units) {
        const response = this.filterProduct(this.units[i]._id);
        const res = [];
        //แปลงข้อมูลให้ตรงฟอแมตกับตางรางของพีดีเอฟเมค
        response.map((l, i) => {
          res.push([
            i + 1,
            l.topping.length !== 0
              ? l.name + " - " + l.topping.map(t => t.name)
              : l.name,
            l.qty
          ]);
        });

        const name = {
          text: this.units[i].u_name + "ขายดี 5 อันดับแรก",
          fontSize: 16,
          bold: true,
          alignment: "start",
          listType: "none"
        };
        const table = {
          layout: "lightHorizontalLines", // optional
          table: {
            fontSize: 18,
            headerRows: 1,
            widths: [30, "*", 80],

            body: [["ลำดับ", "รายการ", "จำนวน"], ...res]
          }
        };
        content2.push(name, table);
        // console.log(response);
        // console.log(res);
        // console.log(content2);
      }

      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.fonts = {
        THSarabunNew: {
          normal: "THSarabunNew.ttf",
          bold: "THSarabunNew-Bold.ttf",
          italics: "THSarabunNew-Italic.ttf",
          bolditalics: "THSarabunNew-BoldItalic.ttf"
        }
      };
      const documentDefinitions = {
        info: {
          title:
            this.reportType === "ประจำวัน"
              ? "รายงานยอดขายประจำวันที่ " + this.formatDate(this.daytime)
              : "รายงานยอดขายประจำเดือน " + this.formatDate2(this.daytime),
          author: this.$store.getters["setting"][0].restaurant
        },
        header: {
          ul: [
            {
              text: this.$store.getters["setting"][0].restaurant,
              fontSize: 20,
              bold: true,
              alignment: "center",
              listType: "none"
            },
            {
              text:
                this.reportType === "ประจำวัน"
                  ? "รายงานยอดขายประจำวันที่ " + this.formatDate(this.daytime)
                  : "รายงานยอดขายประจำเดือน " + this.formatDate2(this.daytime),
              fontSize: 16,
              bold: true,
              alignment: "center",
              listType: "none"
            },
            {
              text: `แยกตามประเภทสินค้า`,
              fontSize: 16,
              bold: true,
              alignment: "center",
              listType: "none"
            },
            {
              text: `สินค้าขายดี 5 อันดับแรก`,
              fontSize: 16,

              alignment: "center",
              listType: "none"
            }
          ]
        },
        pageMargins: [40, 100, 40, 60],
        content: content2,
        footer: function(currentPage, pageCount) {
          return {
            text: "หน้า " + currentPage.toString() + " จาก " + pageCount,
            alignment: "center",
            columns: [
              {
                text: "หน้า " + currentPage.toString() + " จาก " + pageCount,
                color: "#aaaaab",
                bold: true,
                fontSize: 14,
                alignment: "left",
                margin: [10, 0, 0, 0]
              },
              {
                text: "Powered by DEV FONG",
                color: "#aaaaab",
                bold: true,
                fontSize: 14,
                alignment: "right",
                margin: [0, 0, 10, 0]
              }
            ]
          };
        },

        defaultStyle: {
          font: "THSarabunNew"
        }
      };
      pdfMake.createPdf(documentDefinitions).open();
      // pdfMake
      //   .createPdf(documentDefinitions)
      //   .download( this.reportType === "ประจำวัน"
      //           ? "รายงานยอดขายประจำวันที่ " + this.formatDate(this.daytime)
      //           : "รายงานยอดขายประจำเดือน " + this.formatDate2(this.daytime));
    }
  },
  created() {}
};
</script>
