<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialogInvoice"
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
            <h4>แยกตามใบเสร็จรับเงิน</h4>
          </v-row>
          <v-row class="mx-auto justify-center ">
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left" width="auto">
                      ลำดับ
                    </th>
                    <th class="text-left" width="auto">
                      เลขที่ใบเสร็จรับเงิน
                    </th>
                    <th class="text-left" width="auto">
                      จำนวนเงิน
                    </th>
                    <th class="text-left" width="auto">
                      ส่วนลด
                    </th>
                    <th class="text-left" width="auto">
                      ภาษี
                    </th>
                    <th class="text-left" width="auto">
                      รวมทั้งสิ้น
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in list" :key="i">
                    <td>
                      {{ i + 1 }}
                    </td>
                    <td>{{ item.invoice }}</td>
                    <td>{{ formatPrice(item.total_price) }}</td>
                    <td>{{ formatPrice(item.discount_price) }}</td>
                    <td>{{ formatPrice(item.vat_price) }}</td>
                    <td>{{ formatPrice(item.net_price) }}</td>
                  </tr>
                  <tr>
                    <td>ยอดรวม</td>
                    <td>{{ count }} รายการ</td>
                    <td>{{ formatPrice(total) }}</td>
                    <td>{{ formatPrice(discount) }}</td>
                    <td>{{ formatPrice(vat) }}</td>
                    <td>{{ formatPrice(net) }}</td>
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
  props: ["dialogInvoice", "daytime", "reportType", "reportBy"],

  data() {
    return {
      listSort: [],
      list: [],
      count: 0,
      total: 0,
      discount: 0,
      vat: 0,
      net: 0
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
      payments.map(p => {
        this.count++;
        this.total += p.total_price;
        this.discount += p.discount_price;
        this.vat += p.vat_price;
        this.net += p.net_price;
      });
      this.list = payments;
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
      this.list.map((l, i) => {
        res.push([
          i + 1,
          l.invoice,
          this.formatPrice(l.total_price),
          this.formatPrice(l.discount_price),
          this.formatPrice(l.vat_price),
          this.formatPrice(l.net_price)
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
              text: `แยกตามใบเสร็จรับเงิน`,
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
              widths: ["*", "*", "*", "*", "*", "*"],

              body: [
                [
                  "ลำดับ",
                  "เลขที่ใบเสร็จรับเงิน",
                  "จำนวนเงิน",
                  "ส่วนลด",
                  "ภาษี",
                  "รวมทั้งสิ้น"
                ],
                ...res,
                [
                  {
                    text: "ยอดรวม",
                    fontSize: 16,
                    bold: true
                  },
                  {
                    text: this.count + " รายการ",
                    fontSize: 16,
                    bold: true
                  },
                  {
                    text: this.formatPrice(this.total),
                    fontSize: 16,
                    bold: true
                  },
                  {
                    text: this.formatPrice(this.discount),
                    fontSize: 16,
                    bold: true
                  },
                  {
                    text: this.formatPrice(this.vat),
                    fontSize: 16,
                    bold: true
                  },
                  {
                    text: this.formatPrice(this.net),
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
