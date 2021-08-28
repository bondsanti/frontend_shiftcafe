<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialogDay"
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
            }}
          </v-toolbar-title>
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
            <h4>แยกตามชนิดสินค้า</h4>
          </v-row>
          <v-row class="mx-auto justify-center ">
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left" width="60px">
                      ลำดับ
                    </th>
                    <th class="text-left" width="auto">
                      รายการ
                    </th>
                    <th class="text-left" width="auto">
                      จำนวน
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in listSort" :key="i">
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
                  <tr>
                    <td></td>
                    <td>ยอดรวม</td>
                    <td>{{ count }} รายการ</td>
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
  props: ["dialogDay", "daytime", "reportType", "reportBy"],

  data() {
    return {
      listSort: [],
      list: [],
      count: 0
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
      this.count = 0;
      this.list = [];
      const res = [];

      payments.map(p => {
        res.push(...p.ref_order_id.list_product);
      });

      res.map(r => {
        this.replace(r);
      });
      this.list.map(l => {
        this.count += parseInt(l.qty);
      });
      //console.log(this.list);
      this.listSort = this.list.sort((a, b) => b.qty - a.qty);
    },
    replace(obj) {
      let toppingPrice = 0;
      obj.topping.map(t => (toppingPrice += t.price));
      const newObj = {
        name: obj.name,
        qty: obj.qty,
        price: parseInt(obj.normal_price) + parseInt(toppingPrice),
        total: obj.price,
        topping: obj.topping
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
              // setTimeout(this.totalPrice, 300);
              return;
            }
          }
        }
      }
      this.list.push(newObj);
    },
    formatPrice(value2) {
      const value = parseInt(value2);
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async open() {
      const res = [];
      //แปลงข้อมูลให้ตรงฟอแมตกับตางรางของพีดีเอฟเมค
      this.listSort.map((l, i) => {
        res.push([
          i + 1,
          l.topping.length !== 0
            ? l.name + " - " + l.topping.map(t => t.name)
            : l.name,
          l.qty
        ]);
      });

      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.fonts = {
        THSarabunNew: {
          normal: "THSarabunNew.ttf",
          bold: "THSarabunNew-Bold.ttf",
          italics: "THSarabunNew-Italic.ttf",
          bolditalics: "THSarabunNew-BoldItalic.ttf"
        },
        Roboto: {
          normal: "Roboto-Regular.ttf",
          bold: "Roboto-Medium.ttf",
          italics: "Roboto-Italic.ttf",
          bolditalics: "Roboto-MediumItalic.ttf"
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
              text: `แยกตามสินค้า`,
              fontSize: 16,
              bold: true,
              alignment: "center",
              listType: "none"
            }
          ]
        },
        pageMargins: [40, 80, 40, 60],
        content: [
          {
            layout: "lightHorizontalLines", // optional
            table: {
              fontSize: 18,
              headerRows: 1,
              widths: [30, "*", 80],

              body: [
                ["ลำดับ", "รายการ", "จำนวน"],
                ...res,
                [
                  "",
                  {
                    text: "ยอดรวม",
                    fontSize: 16,
                    bold: true
                  },
                  {
                    text: this.count + " รายการ",
                    fontSize: 16,
                    bold: true
                  }
                ]
              ]
            }
          }
        ],
        footer: function(currentPage, pageCount) {
          return {
            text: "หน้า " + currentPage.toString() + " จาก " + pageCount,
            alignment: "center"
          };
        },

        defaultStyle: {
          font: "THSarabunNew"
        }
      };
      pdfMake.createPdf(documentDefinitions).open();
      // pdfMake
      //   .createPdf(documentDefinitions)
      //   .download(
      //     this.reportType === "ประจำวัน"
      //       ? "รายงานยอดขายประจำวันที่ " + this.formatDate(this.daytime)
      //       : "รายงานยอดขายประจำเดือน " + this.formatDate2(this.daytime)
      //   );
    }
  },
  created() {}
};
</script>
