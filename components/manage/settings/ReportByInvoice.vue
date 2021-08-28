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
                      {{
                        reportType === "ประจำวัน"
                          ? "เลขที่ใบเสร็จรับเงิน "
                          : "วันที่ "
                      }}
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
                    <td>
                      {{
                        reportType === "ประจำวัน"
                          ? item.invoice
                          : formatDate(item.invoice)
                      }}
                    </td>
                    <td>{{ formatPrice(item.total_price) }}</td>
                    <td>{{ formatPrice(item.discount_price) }}</td>
                    <td>{{ formatPrice(item.vat_price) }}</td>
                    <td>{{ formatPrice(item.net_price) }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="font-weight-black">
                    <td>ยอดรวม</td>
                    <td>{{ count }} รายการ</td>
                    <td>{{ formatPrice(total) }}</td>
                    <td>{{ formatPrice(discount) }}</td>
                    <td>{{ formatPrice(vat) }}</td>
                    <td>{{ formatPrice(net) }}</td>
                  </tr>
                  <tr
                    class="font-weight-black"
                    v-if="reportType === 'ประจำวัน'"
                  >
                    <td></td>
                    <td>เงินสด</td>
                    <td>{{ formatPrice(cash) + " ฿" }}</td>
                    <td>โอนผ่านธนาคาร</td>
                    <td>{{ formatPrice(transfer) + " ฿" }}</td>
                    <td></td>
                  </tr>
                </tfoot>
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
      net: 0,
      cash: 0,
      transfer: 0
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
      if (this.reportType === "ประจำวัน") {
        this.forToday(payments);
      } else {
        this.forMonth(payments);
      }
    },
    forMonth(payments) {
      this.count = 0;
      this.total = 0;
      this.discount = 0;
      this.vat = 0;
      this.net = 0;
      this.cash = 0;
      this.transfer = 0;
      let date = new Date(this.daytime);
      let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.count = lastDay.getDate();
      //console.log(lastDay.getDate());
      for (let i = 1; i <= lastDay.getDate(); i++) {
        let res = this.filterPayment(
          new Date(date.getFullYear(), date.getMonth(), i),
          payments
        );
        let total = 0;
        let discount = 0;
        let vat = 0;
        let net = 0;

        res.map(r => {
          total += r.total_price;
          discount += r.discount_price;
          vat += r.vat_price;
          net += r.net_price;
        });
        this.total += total;
        this.discount += discount;
        this.vat += vat;
        this.net += net;

        this.list.push({
          invoice: new Date(date.getFullYear(), date.getMonth(), i),
          total_price: total,
          discount_price: discount,
          vat_price: vat,
          net_price: net
        });
      }
    },
    filterPayment(datePara, payments) {
      let date = new Date(datePara);
      const day = payments.filter(d => {
        return (
          new Date(d.datetime).getDate() === date.getDate() &&
          new Date(d.datetime).getMonth() === date.getMonth() &&
          new Date(d.datetime).getFullYear() === date.getFullYear()
        );
      });
      // this.paymentToday = day;
      //console.log(this.paymentToday);
      return day;
    },

    forToday(payments) {
      this.count = 0;
      this.total = 0;
      this.discount = 0;
      this.vat = 0;
      this.net = 0;
      this.cash = 0;
      this.transfer = 0;
      payments.map(p => {
        this.count++;
        this.total += p.total_price;
        this.discount += p.discount_price;
        this.vat += p.vat_price;
        this.net += p.net_price;
      });
      const cash = payments.filter(p => p.type_payment === "cash");
      const transfer = payments.filter(p => p.type_payment === "transfer");

      cash.map(c => {
        this.cash += c.net_price;
      });

      transfer.map(t => {
        this.transfer += t.net_price;
      });

      this.list = payments;
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
          this.reportType === "ประจำวัน"
            ? l.invoice
            : this.formatDate(l.invoice),
          this.formatPrice(l.total_price),
          this.formatPrice(l.discount_price),
          this.formatPrice(l.vat_price),
          this.formatPrice(l.net_price)
        ]);
      });

      let content2 = [];
      if (this.reportType === "ประจำวัน") {
        content2 = [
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
                ],
                [
                  "",
                  {
                    text: "เงินสด",
                    fontSize: 16,
                    bold: true
                  },
                  {
                    text: this.formatPrice(this.cash) + " ฿",
                    fontSize: 16,
                    bold: true
                  },
                  {
                    text: "โอนผ่านธนาคาร",
                    fontSize: 16,
                    bold: true
                  },
                  {
                    text: this.formatPrice(this.transfer) + " ฿",
                    fontSize: 16,
                    bold: true
                  },
                  ""
                ]
              ]
            }
          }
        ];
      } else {
        content2 = [
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
        ];
      }

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
        content: content2,
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
