<template>
  <div class="" style="height: 100%">
    <v-card class="py-5 px-5" style="height: 100%;" color="secondary">
      <v-dialog v-model="dialog" max-width="500px">
        <v-card class="rounded-xl" id="printable">
          <v-form>
            <v-card-title>
              <span class="text-h-6">
                <v-icon left> mdi-note-text-outline </v-icon>
                หมายเลขใบเสร็จรับเงิน : {{ itemBy.invoice }}
              </span>
            </v-card-title>
            <v-divider class="mb-3"></v-divider>
            <v-card-text>
              <v-row v-for="(de, i) in detailArr" :key="i">
                <v-col cols="6" class="flex-grow-0 flex-shrink-0 text-center">
                  <h4>{{ de.name }}</h4>
                </v-col>
                <v-col cols="6" class="flex-grow-0 flex-shrink-0 text-center">
                  <h4>{{ de.value }}</h4>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider class="mt-3"></v-divider>
            <v-card-actions>
              <v-btn color="teal" @click="printInvoice" dark class="rounded-xl">
                <v-icon left> mdi-printer </v-icon>พิมพ์ใบเสร็จรับเงิน
              </v-btn>
              <v-btn fab color="green" @click="printInvoicePdf" dark small>
                <v-icon>mdi-cellphone </v-icon>
              </v-btn>
              <v-btn
                fab
                color="light-green accent-3"
                @click="printInvoicePdfPos"
                dark
                small
              >
                <v-icon>mdi-printer-pos </v-icon>
              </v-btn>
              <!-- <v-btn color="teal" @click="print" dark class="rounded-xl">
                <v-icon left> mdi-printer </v-icon>พิมพ์เทส
              </v-btn> -->
              <v-spacer></v-spacer>

              <v-btn color="error" @click="close" class="rounded-xl">
                <v-icon left> mdi-close </v-icon>ปิด
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <v-row>
        <v-col xs="12" sm="12" md="12" class="">
          <v-card class="px-6 py-5 mb-5 rounded-xl">
            <v-card-title>
              <h2 class="text-center">ข้อมูลใบสั่งซื้อ</h2>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ค้นหา"
                solo
                class="rounded-xl"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="invoiceTableData"
              :search="search"
              :items-per-page="40"
              :footer-props="{
                'items-per-page-options': [40, 50, 60],
                prevIcon: 'mdi-chevron-left',
                nextIcon: 'mdi-chevron-right',
                'items-per-page-text': 'ข้อมูลหน้าต่อไป'
              }"
              sort-by="datetime"
              :sort-desc="true"
              class="mb-n5"
            >
              <template v-slot:[`item.No`]="{ index }">
                {{ index + 1 }}
              </template>
              <template v-slot:[`item.type_payment`]="{ item }">
                <v-chip :color="getColor(item.type_payment)" dark small>
                  {{ item.type_payment }}
                </v-chip>
              </template>
              <template v-slot:[`item.receive_money`]="{ item }">
                <span class="">{{ formatPrice(item.receive_money) }} ฿</span>
              </template>
              <template v-slot:[`item.net_price`]="{ item }">
                <span class="">{{ formatPrice(item.net_price) }} ฿</span>
              </template>
              <template v-slot:[`item.withdraw_money`]="{ item }">
                <span class="">{{ formatPrice(item.withdraw_money) }} ฿</span>
              </template>
              <template v-slot:[`item.status`]="{ item }">
                <v-chip
                  :color="item.status === 'ใช้งานอยู่' ? 'green' : 'red'"
                  dark
                  small
                >
                  {{ item.status }}
                </v-chip>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn
                  class="my-2 rounded-xl white--text"
                  color="#3f51b5"
                  small
                  @click="Detail(item.actions)"
                >
                  <v-icon color="white" aria-hidden="false">
                    mdi-eye-settings
                  </v-icon>
                  รายละเอียด
                </v-btn>
                <v-btn
                  class=" rounded-xl my-2"
                  color="red accent-3"
                  @click="disableBill(item.actions)"
                  small
                  v-if="item.actions.status === 0"
                  dark
                  :disabled="$store.getters['position'] === 'cashier'"
                >
                  <v-icon aria-hidden="false">
                    mdi-stop-circle-outline
                  </v-icon>
                  ยกเลิกบิล
                </v-btn>
                <v-btn
                  class="ml-2"
                  color="blue"
                  @click="enableBill(item.actions)"
                  small
                  v-if="item.actions.status === 1"
                  dark
                  :disabled="$store.getters['position'] === 'cashier'"
                >
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-check-bold
                  </v-icon>
                  เปิดใช้งานบิล
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog v-model="dialogDelete" max-width="360px" width="auto">
      <v-card>
        <v-card-title class="text-h5 primary--text   text-center">
          {{
            typePayment === "disable"
              ? "แน่ใจแล้วใช่มั้ยที่จะยกเลิกบิล"
              : "แน่ใจแล้วใช่มั้ยที่จะเปิดการใช้งานบิล"
          }}
        </v-card-title>
        <v-divider class="mt-3"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="ma-2  rounded-xl"
            @click="dialogDelete = false"
          >
            <v-icon aria-hidden="false" class="mx-2"> mdi-close-box </v-icon>ปิด
          </v-btn>
          <v-btn color="red" class="ma-2  rounded-xl" @click="manageBill" dark>
            <v-icon aria-hidden="false"
              >{{
                typePayment === "disable"
                  ? "mdi-delete-forever"
                  : "mdi-newspaper-variant-outline"
              }} </v-icon
            >{{ typePayment === "disable" ? "ยกเลิกบิล" : "เปิดการใช้งานบิล" }}
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "@/components/manage/settings/vfs_fonts";
export default {
  data() {
    return {
      search: "",
      dialog: false,

      itemBy: {},
      headers: [
        {
          text: "ลำดับ",
          value: "No"
        },
        {
          text: "วัน เวลา",
          align: "start",
          // sortable: true,
          value: "datetime"
        },
        {
          text: "หมายเลขบิล",
          align: "start",
          // sortable: true,
          value: "invoice"
        },
        {
          text: "ประเภทการชำระเงิน",
          align: "start",
          // sortable: true,
          value: "type_payment"
        },
        {
          text: "ยอดสุทธิ",
          align: "start",
          sortable: false,
          value: "net_price"
        },
        {
          text: "เงินรับมา",
          align: "start",
          sortable: false,
          value: "receive_money"
        },
        {
          text: "เงินทอน",
          align: "start",
          sortable: false,
          value: "withdraw_money"
        },
        {
          text: "สถานะ",
          align: "start",
          sortable: false,
          value: "status"
        },
        {
          text: "หมายเหตุ",
          align: "start",
          sortable: false,
          value: "actions"
        }
      ],
      detailArr: [],
      order_id: "",
      dialogDelete: false,
      idPayment: null,
      typePayment: null
    };
  },
  computed: {
    invoiceTableData() {
      return this.historyInvoice.map(item => {
        return {
          datetime: this.formatDate(item.datetime),
          invoice: item.invoice,
          type_payment:
            item.type_payment === "cash" ? "เงินสด" : "โอนผ่านธนาคาร",
          net_price: item.net_price,
          receive_money: item.receive_money,
          withdraw_money: item.withdraw_money,
          status: item.status === 0 ? "ใช้งานอยู่" : "ยกเลิกใบเสร็จรับเงิน",
          actions: item
        };
      });
    }
  },
  methods: {
    customSort: function(items, index, isDesc) {
      items.sort((a, b) => {
        if (index[0] == "date") {
          if (!isDesc[0]) {
            return new Date(b[index]) - new Date(a[index]);
          } else {
            return new Date(a[index]) - new Date(b[index]);
          }
        } else {
          if (typeof a[index] !== "undefined") {
            if (!isDesc[0]) {
              return a[index]
                .toLowerCase()
                .localeCompare(b[index].toLowerCase());
            } else {
              return b[index]
                .toLowerCase()
                .localeCompare(a[index].toLowerCase());
            }
          }
        }
      });
      return items;
    },
    formatPrice(total_price) {
      const value = parseInt(total_price);
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getColor(status) {
      if (status === "เงินสด") return "teal darken-1";
      else return "indigo darken-1";
    },

    Detail(item) {
      //console.log(item);
      this.order_id = item.ref_order_id !== null ? item.ref_order_id._id : "";
      this.itemBy = item;
      if (item.type_payment === "transfer") {
        this.detailArr = [
          {
            name: "หมายเลขออเดอร์",
            value: item.ref_order_id ? item.ref_order_id.order_no : ""
          },
          {
            name: "พนักงานที่รับเงิน",
            value: item.ref_emp_id.fname + " " + item.ref_emp_id.lname
          },
          {
            name: "ชื่อลูกค้า",
            value: item.ref_cus_id.fname + " " + item.ref_cus_id.lname
          },
          {
            name: "ประเภทการชำระเงิน",
            value: item.type_payment
          },
          {
            name: "ธนาคาร",
            value: item.ref_bank_id.bank_name
          },
          {
            name: "เงินรับมา",
            value: this.formatPrice(item.receive_money) + "  ฿"
          },
          {
            name: "เงินทอน",
            value: this.formatPrice(item.withdraw_money) + "  ฿"
          },
          {
            name: "ราคาทั้งหมด",
            value: this.formatPrice(item.total_price) + "  ฿"
          },
          {
            name: "ส่วนลด",
            value: this.formatPrice(item.discount_price) + "  ฿"
          },
          {
            name: "ราคาหลังจากลด",
            value: this.formatPrice(item.after_discount) + "  ฿"
          },
          {
            name: "ภาษี",
            value: this.formatPrice(item.vat_price) + "  ฿"
          },
          {
            name: "ราคาหลังบวกภาษี",
            value: this.formatPrice(item.after_vat) + "  ฿"
          },
          {
            name: "ราคาสุทธิ",
            value: this.formatPrice(item.net_price) + "  ฿"
          },
          {
            name: "แต้มที่ได้",
            value: item.ref_point_pay_id.point
          }
        ];
      } else {
        this.detailArr = [
          {
            name: "หมายเลขออเดอร์",
            value: item.ref_order_id ? item.ref_order_id.order_no : ""
          },
          {
            name: "พนักงานที่รับเงิน",
            value: item.ref_emp_id.fname + " " + item.ref_emp_id.lname
          },
          {
            name: "ชื่อลูกค้า",
            value: item.ref_cus_id.fname + " " + item.ref_cus_id.lname
          },
          {
            name: "ประเภทการชำระเงิน",
            value: item.type_payment
          },

          {
            name: "เงินรับมา",
            value: this.formatPrice(item.receive_money) + " ฿"
          },
          {
            name: "เงินทอน",
            value: this.formatPrice(item.withdraw_money) + " ฿"
          },
          {
            name: "ราคาทั้งหมด",
            value: this.formatPrice(item.total_price) + " ฿"
          },
          {
            name: "ส่วนลด",
            value: this.formatPrice(item.discount_price) + " ฿"
          },
          {
            name: "ราคาหลังจากลด",
            value: this.formatPrice(item.after_discount) + " ฿"
          },
          {
            name: "ภาษี",
            value: this.formatPrice(item.vat_price) + " ฿"
          },
          {
            name: "ราคาหลังบวกภาษี",
            value: this.formatPrice(item.after_vat) + " ฿"
          },
          {
            name: "ราคาสุทธิ",
            value: this.formatPrice(item.net_price) + " ฿"
          },
          {
            name: "แต้มที่ได้",
            value: item.ref_point_pay_id.point
          }
        ];
      }

      this.dialog = true;
    },

    close() {
      this.dialog = false;
    },
    disableBill(item) {
      this.typePayment = "disable";
      this.idPayment = item._id;
      this.dialogDelete = true;
    },
    enableBill(item) {
      this.typePayment = "enable";
      this.idPayment = item._id;
      this.dialogDelete = true;
    },
    manageBill() {
      this.$axios
        .$put("/payment/" + this.idPayment, {
          status: this.typePayment === "disable" ? 1 : 0
        })
        .then(res => {
          this.idPayment = null;
          this.dialogDelete = false;
          this.$nuxt.refresh();
          this.$swal.fire({
            type: "success",
            title: res.message
          });
          this.typePayment = null;
        })
        .catch(e => {
          this.$swal.fire({
            type: "warning",
            title: e
          });
        });
    },
    formatDate(date) {
      this.$moment().format("LLLL");
      let strdate = this.$moment(date).add(543, "years");
      return this.$moment(strdate).format("D MMMM YYYY H:mm");
    },
    print() {
      window.document.body.innerHTML = document.getElementById(
        "printable"
      ).innerHTML; //(1

      window.print(); //(2

      this.$router.go({
        path: this.$router.currentRoute.path,
        force: true
      }); //(3
    },
    convertImgToBase64URL(url) {
      //console.log(url);
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          let canvas = document.createElement("CANVAS");
          const ctx = canvas.getContext("2d");
          canvas.height = img.height;
          canvas.width = img.width;
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL();
          canvas = null;
          resolve(dataURL);
        };
        img.src = url;
      });
    },
    async printInvoicePdfPos() {
      const pay = this.itemBy;

      const img = `${this.$nuxt.context.env.config.IMG_URL}${this.$store.getters["setting"][0].logo}`;
      const show = await this.convertImgToBase64URL(img);
      //console.log(this.itemBy);

      const dataForTable = [];
      pay.ref_order_id.list_product.map((o, i) => {
        const nameList = `${o.discount ? "" : "**"} ${
          o.topping.length === 0
            ? o.name
            : o.name + " " + o.normal_price + " บาท\n"
        }${o.topping.map(t =>
          t.price !== 0 ? t.name + " " + t.price + " ฿" : t.name
        )}`;
        dataForTable.push([
          {
            text: i + 1,
            border: [false, false, false, false],
            margin: [0, 2, 0, 2],
            alignment: "left",
            bold: true
          },
          {
            text: nameList,
            border: [false, false, false, false],
            margin: [0, 2, 0, 2],
            alignment: "left",
            bold: true
          },
          {
            text: o.qty,
            border: [false, false, false, false],
            margin: [0, 2, 0, 2],
            alignment: "left",
            bold: true
          },
          {
            border: [false, false, false, false],
            text: this.formatPrice(o.price) + " ฿",
            bold: true,
            alignment: "right",
            margin: [0, 2, 0, 2]
          }
        ]);
      });

      const discount = () => {
        const obj = {
          columns: [
            {
              text: "ส่วนลด",
              width: "*",
              fontSize: 14,
              bold: true,
              alignment: "left"
            },
            {
              text: this.formatPrice(pay.discount_price) + " บาท",
              width: "*",
              fontSize: 14,
              bold: true,
              alignment: "right"
            }
          ]
        };
        if (pay.discount_price !== 0) {
          return obj;
        }
      };

      const vat = () => {
        const obj = {
          columns: [
            {
              text: "ภาษี",
              width: "*",
              fontSize: 14,
              bold: true,
              alignment: "left"
            },
            {
              text: this.formatPrice(pay.vat_price) + " บาท",
              width: "*",
              fontSize: 14,
              bold: true,
              alignment: "right"
            }
          ]
        };
        if (pay.vat_price !== 0) {
          return obj;
        }
      };

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
          title: "ใบเสร็จรับเงินเลขที่ " + pay.invoice,
          author: this.$store.getters["setting"][0].restaurant
        },
        pageSize: {
          width: 320,
          height: "auto"
        },

        content: [
          {
            columns: [
              {
                text: this.$store.getters["setting"][0].restaurant,

                width: "*",
                fontSize: 14,
                bold: true,
                alignment: "left",
                margin: [0, 10, 0, 0]
              },
              {
                image: show,
                width: 30,
                margin: [0, 0, 0, 10]
              }
            ]
          },
          {
            columns: [
              {
                text: "ที่อยู่ :",
                width: 48,
                bold: true,
                fontSize: 10,
                alignment: "left"
              },
              {
                text: this.$store.getters["setting"][0].address,
                width: "*",
                bold: true,
                fontSize: 10,
                alignment: "left"
              }
            ]
          },
          {
            columns: [
              {
                text: "เบอร์มือถือ :",
                width: 48,
                bold: true,
                fontSize: 10,
                alignment: "left"
              },
              {
                text: this.$store.getters["setting"][0].tel,
                width: "*",
                bold: true,
                fontSize: 10,
                alignment: "left"
              }
            ]
          },
          {
            columns: [
              {
                text: "พนักงานรับเงิน :",
                bold: true,
                width: 48,
                fontSize: 10,
                alignment: "left"
              },
              {
                text: pay.ref_emp_id.fname + " " + pay.ref_emp_id.lname,
                width: "*",
                bold: true,
                fontSize: 10,
                alignment: "left"
              }
            ]
          },
          {
            text: "ใบเสร็จรับเงินเลขที่ : " + pay.invoice,
            bold: true,
            fontSize: 10,
            alignment: "center"
          },
          {
            text: "วันที่ " + this.formatDate(pay.datetime),
            bold: true,
            fontSize: 10,
            alignment: "center"
          },
          {
            table: {
              headerRows: 1,
              widths: [20, "*", 25, "*"],
              body: [
                [
                  {
                    text: "ลำดับ",
                    bold: true,
                    border: [false, true, false, true],
                    margin: [0, 5, 0, 5]
                  },
                  {
                    text: "รายการ",
                    bold: true,
                    border: [false, true, false, true],
                    margin: [0, 5, 0, 5]
                  },
                  {
                    text: "จำนวน",
                    bold: true,
                    border: [false, true, false, true],
                    margin: [0, 5, 0, 5]
                  },
                  {
                    text: "ราคา",
                    border: [false, true, false, true],
                    alignment: "right",
                    bold: true,
                    margin: [0, 5, 0, 5]
                  }
                ],
                ...dataForTable,
                [
                  {
                    text: "",
                    border: [false, true, false, false],

                    alignment: "left"
                  },
                  {
                    text: "",
                    border: [false, true, false, false],

                    alignment: "left"
                  },
                  {
                    text: "",
                    border: [false, true, false, false],

                    alignment: "left"
                  },
                  {
                    border: [false, true, false, false],
                    text: "",
                    alignment: "right"
                  }
                ]
              ]
            }
          },
          {
            columns: [
              {
                text: "อาหารเครื่องดื่ม",
                width: "*",
                fontSize: 14,
                bold: true,
                alignment: "left"
              },
              {
                text: this.formatPrice(pay.total_price) + " บาท",
                width: "*",
                fontSize: 14,
                bold: true,
                alignment: "right"
              }
            ]
          },
          discount(),
          vat(),
          {
            columns: [
              {
                text: "ราคาสุทธิ",
                width: "*",
                fontSize: 16,
                bold: true,
                alignment: "left"
              },
              {
                text: this.formatPrice(pay.net_price) + " บาท",
                width: "*",
                fontSize: 16,
                bold: true,
                alignment: "right"
              }
            ]
          },
          {
            text: "ขอบคุณที่ใช้บริการครับ/ค่ะ",
            bold: true,
            fontSize: 14,
            alignment: "center",
            margin: [0, 10, 0, 0]
          },
          {
            text: "หมายเหตุ ** สินค้าไม่สามารถใช้กับส่วนลดได้",
            bold: true,
            fontSize: 10,
            alignment: "left",
            margin: [0, 5, 0, 0]
          }
        ],
        styles: {
          notesTitle: {
            fontSize: 10,
            bold: true
          },
          notesText: {
            fontSize: 10
          }
        },
        defaultStyle: {
          columnGap: 5,
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
    },
    async printInvoicePdf() {
      const pay = this.itemBy;
      const { pname, fname, lname, tel, address } = pay.ref_cus_id;
      const clientName = () => {
        if (fname !== "guest" || lname !== "guest") {
          return pname + " " + fname + " " + lname;
        } else {
          return "-";
        }
      };
      const clientTel = fname !== "guest" || lname !== "guest" ? tel : "-";
      const clientAddress =
        fname !== "guest" || lname !== "guest" ? address : "-";

      const img = `${this.$nuxt.context.env.config.IMG_URL}${this.$store.getters["setting"][0].logo}`;
      const show = await this.convertImgToBase64URL(img);
      //console.log(this.itemBy);

      const dataForTable = [];
      pay.ref_order_id.list_product.map((o, i) => {
        const nameList = `${o.discount ? "" : "**"} ${
          o.topping.length === 0
            ? o.name
            : o.name + " " + o.normal_price + " บาท\n"
        }${o.topping.map(t =>
          t.price !== 0 ? t.name + " " + t.price + " บาท" : t.name
        )}`;
        dataForTable.push([
          {
            text: i + 1,
            border: [false, false, false, true],
            margin: [0, 2, 0, 2],
            alignment: "left"
          },
          {
            text: nameList,
            border: [false, false, false, true],
            margin: [0, 2, 0, 2],
            alignment: "left"
          },
          {
            text: o.qty,
            border: [false, false, false, true],
            margin: [0, 2, 0, 2],
            alignment: "left"
          },
          {
            border: [false, false, false, true],
            text: this.formatPrice(o.price) + " บาท",
            fillColor: "#f5f5f5",
            alignment: "right",
            margin: [0, 2, 0, 2]
          }
        ]);
      });

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
          title: "ใบเสร็จรับเงินเลขที่ " + pay.invoice,
          author: this.$store.getters["setting"][0].restaurant
        },
        content: [
          {
            columns: [
              {
                image: show,
                width: 100
              },
              [
                {
                  text: "ใบเสร็จรับเงิน",
                  color: "#333333",
                  width: "*",
                  fontSize: 28,
                  bold: true,
                  alignment: "right",
                  margin: [0, 0, 0, 1]
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: "เลขที่คำสั่งซื้อ",
                          color: "#aaaaab",
                          bold: true,
                          width: "*",
                          fontSize: 12,
                          alignment: "right"
                        },
                        {
                          text: pay.ref_order_id.order_no,
                          bold: true,
                          color: "#333333",
                          fontSize: 12,
                          alignment: "right",
                          width: 100
                        }
                      ]
                    },
                    {
                      columns: [
                        {
                          text: "วันที่สั่งซื้อ",
                          color: "#aaaaab",
                          bold: true,
                          width: "*",
                          fontSize: 12,
                          alignment: "right"
                        },
                        {
                          text: this.formatDate(pay.ref_order_id.datetime),
                          bold: true,
                          color: "#333333",
                          fontSize: 12,
                          alignment: "right",
                          width: 100
                        }
                      ]
                    },
                    {
                      columns: [
                        {
                          text: "สถานะ",
                          color: "#aaaaab",
                          bold: true,
                          fontSize: 12,
                          alignment: "right",
                          width: "*"
                        },
                        {
                          text: `จ่ายเงินแล้ว\n( ${
                            pay.type_payment === "cash"
                              ? "เงินสด"
                              : "โอนผ่านธนาคาร"
                          } )`,
                          bold: true,
                          fontSize: 14,
                          alignment: "right",
                          color: "green",
                          width: 100
                        }
                      ]
                    }
                  ]
                }
              ]
            ]
          },
          {
            columns: [
              {
                text: "จาก",
                color: "#aaaaab",
                bold: true,
                fontSize: 14,
                alignment: "left",
                margin: [0, 20, 0, 5]
              },
              {
                text: "ถึง",
                color: "#aaaaab",
                bold: true,
                fontSize: 14,
                alignment: "left",
                margin: [0, 20, 0, 5]
              }
            ]
          },
          {
            columns: [
              {
                text: this.$store.getters["setting"][0].restaurant,
                bold: true,
                color: "#333333",
                alignment: "left"
              },
              {
                text: clientName(),
                bold: true,
                color: "#333333",
                alignment: "left"
              }
            ]
          },
          {
            columns: [
              {
                text: "หมายเลขโทรศัพท์",
                color: "#aaaaab",
                bold: true,
                margin: [0, 7, 0, 3]
              },

              {
                text: "หมายเลขโทรศัพท์",
                color: "#aaaaab",
                bold: true,
                margin: [0, 7, 0, 3]
              }
            ]
          },
          {
            columns: [
              {
                text: this.$store.getters["setting"][0].tel,
                style: "invoiceBillingAddress"
              },
              {
                text: clientTel,
                style: "invoiceBillingAddress"
              }
            ]
          },
          {
            columns: [
              {
                text: "ที่อยู่",
                color: "#aaaaab",
                bold: true,
                margin: [0, 7, 0, 3]
              },

              {
                text: "ที่อยู่",
                color: "#aaaaab",
                bold: true,
                margin: [0, 7, 0, 3]
              }
            ]
          },
          {
            columns: [
              {
                text:
                  this.$store.getters["setting"][0].address + " \n   ประเทศไทย",
                style: "invoiceBillingAddress"
              },
              {
                text: clientAddress,
                style: "invoiceBillingAddress"
              }
            ]
          },
          "\n\n",
          {
            width: "100%",
            alignment: "center",
            text: `ใบเสร็จรับเงินเลขที่ ${pay.invoice}`,
            bold: true,
            margin: [0, 10, 0, 10],
            fontSize: 15
          },
          {
            layout: {
              defaultBorder: false,
              hLineWidth: function(i, node) {
                return 1;
              },
              vLineWidth: function(i, node) {
                return 1;
              },
              hLineColor: function(i, node) {
                if (i === 1 || i === 0) {
                  return "#bfdde8";
                }
                return "#eaeaea";
              },
              vLineColor: function(i, node) {
                return "#eaeaea";
              },
              hLineStyle: function(i, node) {
                // if (i === 0 || i === node.table.body.length) {
                return null;
                //}
              },
              // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
              paddingLeft: function(i, node) {
                return 10;
              },
              paddingRight: function(i, node) {
                return 10;
              },
              paddingTop: function(i, node) {
                return 2;
              },
              paddingBottom: function(i, node) {
                return 2;
              },
              fillColor: function(rowIndex, node, columnIndex) {
                return "#fff";
              }
            },
            table: {
              headerRows: 1,
              widths: [80, "*", 80, 80],
              body: [
                [
                  {
                    text: "ลำดับที่",
                    fillColor: "#eaf2f5",
                    border: [false, true, false, true],
                    margin: [0, 5, 0, 5]
                  },
                  {
                    text: "รายการ",
                    fillColor: "#eaf2f5",
                    border: [false, true, false, true],
                    margin: [0, 5, 0, 5]
                  },
                  {
                    text: "จำนวน",
                    fillColor: "#eaf2f5",
                    border: [false, true, false, true],
                    margin: [0, 5, 0, 5]
                  },
                  {
                    text: "ราคา",
                    border: [false, true, false, true],
                    alignment: "right",
                    fillColor: "#eaf2f5",
                    margin: [0, 5, 0, 5]
                  }
                ],
                ...dataForTable
              ]
            }
          },
          "\n",

          {
            layout: {
              defaultBorder: false,
              hLineWidth: function(i, node) {
                return 1;
              },
              vLineWidth: function(i, node) {
                return 1;
              },
              hLineColor: function(i, node) {
                return "#eaeaea";
              },
              vLineColor: function(i, node) {
                return "#eaeaea";
              },
              hLineStyle: function(i, node) {
                // if (i === 0 || i === node.table.body.length) {
                return null;
                //}
              },
              // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
              paddingLeft: function(i, node) {
                return 10;
              },
              paddingRight: function(i, node) {
                return 10;
              },
              paddingTop: function(i, node) {
                return 3;
              },
              paddingBottom: function(i, node) {
                return 1;
              },
              fillColor: function(rowIndex, node, columnIndex) {
                return "#fff";
              }
            },
            table: {
              headerRows: 1,
              widths: ["*", "auto"],
              body: [
                [
                  {
                    text: "อาหารเครื่องดื่ม",
                    border: [false, true, false, true],
                    alignment: "right",
                    margin: [0, 1, 0, 1]
                  },
                  {
                    border: [false, true, false, true],
                    text: this.formatPrice(pay.total_price) + " บาท",
                    alignment: "right",
                    fillColor: "#f5f5f5",
                    margin: [0, 1, 0, 1]
                  }
                ],
                [
                  {
                    text: "ส่วนลด",
                    border: [false, false, false, true],
                    alignment: "right",
                    margin: [0, 1, 0, 1]
                  },
                  {
                    text: this.formatPrice(pay.discount_price) + " บาท",
                    border: [false, false, false, true],
                    fillColor: "#f5f5f5",
                    alignment: "right",
                    margin: [0, 1, 0, 1]
                  }
                ],
                [
                  {
                    text: "ภาษี",
                    border: [false, false, false, true],
                    alignment: "right",
                    margin: [0, 1, 0, 1]
                  },
                  {
                    text: this.formatPrice(pay.vat_price) + " บาท",
                    border: [false, false, false, true],
                    fillColor: "#f5f5f5",
                    alignment: "right",
                    margin: [0, 1, 0, 1]
                  }
                ],
                [
                  {
                    text: "ยอดรวมสุทธิ",
                    bold: true,
                    fontSize: 20,
                    alignment: "right",
                    border: [false, false, false, true],
                    margin: [0, 1, 0, 1]
                  },
                  {
                    text: this.formatPrice(pay.net_price) + " บาท",
                    bold: true,
                    fontSize: 20,
                    alignment: "right",
                    border: [false, false, false, true],
                    fillColor: "#f5f5f5",
                    margin: [0, 1, 0, 1]
                  }
                ],
                [
                  {
                    text: "หมายเหตุ ** สินค้าไม่สามารถใช้กับส่วนลดได้",
                    bold: true,
                    fontSize: 14,
                    alignment: "left",
                    border: [false, false, false, false],
                    margin: [0, 5, 0, 5]
                  },
                  {
                    text: "",
                    bold: true,
                    fontSize: 20,
                    alignment: "right",
                    border: [false, false, false, false],

                    margin: [0, 5, 0, 5]
                  }
                ]
              ]
            }
          }
        ],
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
        styles: {
          notesTitle: {
            fontSize: 10,
            bold: true,
            margin: [0, 50, 0, 3]
          },
          notesText: {
            fontSize: 10
          }
        },
        defaultStyle: {
          columnGap: 20,
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
    },
    async printInvoice() {
      //console.log(this.itemBy);
      const order = await this.$axios.$get("/order/" + this.order_id);
      //const today = new Date(order.datetime);

      var WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
      );

      WinPrint.document.write("<table>");

      WinPrint.document.write(
        `<tr><th>${this.$store.getters["setting"][0].head_title}</th><th style='padding-left:60px'><img width='70px' height='70px' src='${this.$nuxt.context.env.config.IMG_URL}${this.$store.getters["setting"][0].logo}'></th></tr>`
      );
      WinPrint.document.write("</table>");
      WinPrint.document.write("<table style='width: 100%;font-size: 0.4em;'>");
      WinPrint.document.write(
        `<tr><th align='left'>${this.$store.getters["setting"][0].restaurant}</th></tr>`
      );
      WinPrint.document.write(
        `<tr><th align='left'>ที่อยู่ : ${this.$store.getters["setting"][0].address}</th></tr>`
      );

      WinPrint.document.write(
        `<tr><th align='left'>เบอร์มือถือ : ${this.$store.getters["setting"][0].tel}</th></tr>`
      );
      WinPrint.document.write(
        `<tr><th align='left'>พนักงานรับเงิน : ${this.itemBy.ref_emp_id.fname} ${this.itemBy.ref_emp_id.fname}</th></tr>`
      );
      if (this.itemBy.ref_cus_id.fname !== "guest") {
        WinPrint.document.write(
          `<tr><th align='left'>ลูกค้า : คุณ ${this.itemBy.ref_cus_id.fname} ${this.itemBy.ref_cus_id.lname}</th></tr>`
        );
      }
      WinPrint.document.write(
        `<tr><th align='center'  >ใบเสร็จรับเงินเลขที่ : ${this.itemBy.invoice}</th></tr>`
      );
      WinPrint.document.write(
        `<tr><th align='center'>วันที่ ${this.formatDate(
          this.itemBy.datetime
        )}</th></tr>`
      );
      WinPrint.document.write("</table>");
      //WinPrint.document.write("<img src='" + __dirname + "25.png'>");
      WinPrint.document.write(
        "<table   style='width: 100%;font-size: 0.5em;'>"
      );
      WinPrint.document.write(
        "<tr ><th style='border-bottom: thin dotted;border-top: thin dotted' width=18% >ลำดับที่</th><th style='border-bottom: thin dotted;border-top: thin dotted' width='1000px' style='padding-right:60px'>รายการ</th><th style='border-bottom: thin dotted;border-top: thin dotted' width='100px' style='padding-right:30px'>จำนวน</th><th style='border-bottom: thin dotted;border-top: thin dotted' colspan='2' width='100px'>ราคา</th></tr>"
      );
      for (let i in order.list_product) {
        WinPrint.document.write("<tr style='border-bottom: thin solid'>");
        WinPrint.document.write(
          `<td style='padding-left:20px;'>${parseInt(i) + 1}</td><td >${
            order.list_product[i].name
          } ${
            order.list_product[i].normal_price
          } บาท</td><td style='padding-left:20px;'>${
            order.list_product[i].qty
          }</td><td style='padding-left:20px;'>${this.formatPrice(
            order.list_product[i].price
          )} </td><td style='padding-right:20px;'>฿</td>`
        );
        WinPrint.document.write("</tr>");
        for (let j in order.list_product[i].topping) {
          WinPrint.document.write(
            `<tr><td></td><td > - ${order.list_product[i].topping[j].name}${
              order.list_product[i].topping[j].price !== 0
                ? "เพิ่ม " + order.list_product[i].topping[j].price + " บาท"
                : ""
            }</td></td></tr>`
          );
        }
      }
      WinPrint.document.write(
        "<tr><td style='border-bottom: thin dotted'></td><td style='border-bottom: thin dotted'></td><td style='border-bottom: thin dotted'></td><td style='border-bottom: thin dotted'></td><td style='border-bottom: thin dotted'></td></tr>"
      );
      WinPrint.document.write("</table>");
      WinPrint.document.write(
        "<table  style='margin-top:20px;font-size: 0.6em;'>"
      );
      WinPrint.document.write(
        `<tr><th width='1000px' align=left style='padding-right:60px;'>รวมเงิน</th><th width='100px'>${this.formatPrice(
          this.itemBy.total_price
        )} </th><th>บาท</th></tr>`
      );
      if (this.itemBy.discount_price > 0) {
        WinPrint.document.write(
          `<tr><th width='1000px' align=left style='padding-right:60px;'>ส่วนลด</th><th width='100px'>${this.formatPrice(
            this.itemBy.discount_price
          )}</th><th>บาท</th></tr>`
        );
      }
      if (this.itemBy.vat_price > 0) {
        WinPrint.document.write(
          `<tr><th width='1000px' align=left style='padding-right:60px;'>ภาษี</th><th width='100px'>${this.formatPrice(
            this.itemBy.vat_price
          )}</th><th>บาท</th></tr>`
        );
      }
      WinPrint.document.write(
        `<tr><th width='1000px' align=left style='padding-right:60px'>ยอดสุทธิ</th><th width='100px'>${this.formatPrice(
          this.itemBy.net_price
        )} </th><th>บาท</th></tr>`
      );
      WinPrint.document.write(
        `<tr><th width='1000px' align=left style='padding-right:60px'>เงินสด</th><th width='100px'>${this.formatPrice(
          this.itemBy.receive_money
        )} </th><th>บาท</th></tr>`
      );
      WinPrint.document.write(
        `<tr><th width='1000px' align=left style='padding-right:60px'>เงินทอน</th><th width='100px'>${this.formatPrice(
          this.itemBy.withdraw_money
        )} </th><th>บาท</th></tr>`
      );

      WinPrint.document.write(
        `<tr><th  align=center style='padding-left:60px' >**ขอบคุณที่ใช้บริการ**</th></tr>
        `
      );
      WinPrint.document.write("</table>");

      WinPrint.document.close();
      WinPrint.focus();
      // var ua = navigator.userAgent.toLowerCase();
      // var isAndroid = ua.indexOf("android") > -1;
      setTimeout(() => {
        WinPrint.print();
        //WinPrint.close();
      }, 500);
      //WinPrint.print();
    }
  },

  props: ["historyInvoice"]
};
</script>
