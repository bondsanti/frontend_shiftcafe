<template>
  <div class="" style="height: 100%">
    <v-card class="py-5 px-5" style="height: 100%;" color="secondary">
      <v-dialog v-model="dialog" max-width="566px">
        <v-card class="rounded-xl" id="printable">
          <v-form>
            <v-card-title class="primary rounded-t-xl">
              <span class="text-h-6 shades--text">
                <v-icon left color="shades"> mdi-note-text-outline </v-icon>
                หมายเลขใบเสร็จรับเงิน : {{ itemBy.invoice }}
              </span>
            </v-card-title>
            <v-divider class="mx-auto"></v-divider>
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
            <v-divider class="mt-1"></v-divider>
            <v-card-actions class="shades rounded-xl">
              <v-btn color="teal" text @click="printInvoice" dark>
                <v-icon left> mdi-printer </v-icon>
                <h4 class="hidden-sm-and-down">พิมพ์ใบเสร็จรับเงิน</h4>
              </v-btn>

              <v-btn color="#FFB344" text @click="printInvoicePdf" dark>
                <v-icon>mdi-cellphone </v-icon>
                <h4 class="hidden-sm-and-down">ใบเสร็จรับเงินเต็ม</h4>
              </v-btn>
              <v-btn text color="#E05D5D" @click="printInvoicePdfPos" dark>
                <v-icon>mdi-printer-pos </v-icon>
                <h4 class="hidden-sm-and-down">PDF</h4>
              </v-btn>
              <v-spacer></v-spacer>

              <v-btn
                color="error"
                small
                text
                @click="close"
                class="rounded-xl d-flex flex-row-reverse"
              >
                <v-icon left> mdi-close </v-icon>
                <span class="hidden-sm-and-down" >ปิด</span>
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
                  :disabled="
                    $store.getters['position'] === 'cashier' ||
                      $store.getters['position'] === 'checker'
                  "
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
    <v-dialog v-model="dialogDelete" max-width="410px" width="auto">
      <v-card>
        <v-card-title class="shades--text justify-center error">
          {{
            typePayment === "disable"
              ? "แน่ใจแล้วใช่มั้ยที่จะยกเลิกบิล"
              : "แน่ใจแล้วใช่มั้ยที่จะเปิดการใช้งานบิล"
          }}
          <v-icon color="shades" class="mx-2">mdi-delete</v-icon>
        </v-card-title>
        <v-divider class="mx-auto"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            x-large
            color="warning"
            text
            rounded
            class="rounded-xl"
            @click="dialogDelete = false"
          >
            <v-icon aria-hidden="false" class="mx-2"> mdi-close-box </v-icon>ปิด
          </v-btn>
          <v-btn
            class="rounded-xl my-3"
            text
            x-large
            rounded
            color="success"
            @click="manageBill"
            dark
          >
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
import { printInvoicePdfPos } from "@/instant/invoice_for_pdf_pos.js";
import { printInvoicePdf } from "@/instant/invoice_for_pdf.js";
import { printInvoiceOnly } from "@/instant/invoice_only.js";

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
          sortable: false,
          value: "datetime"
        },
        {
          text: "หมายเลขบิล",
          align: "start",
          sortable: false,
          value: "invoice"
        },
        {
          text: "ประเภทการชำระเงิน",
          align: "start",
          sortable: false,
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
      return this.historyInvoice.reverse().map(item => {
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
      printInvoicePdfPos(pay, show, this.$store.getters["setting"][0]);
    },
    async printInvoicePdf() {
      const pay = this.itemBy;
      const img = `${this.$nuxt.context.env.config.IMG_URL}${this.$store.getters["setting"][0].logo}`;
      const show = await this.convertImgToBase64URL(img);
      printInvoicePdf(pay, show, this.$store.getters["setting"][0]);
    },
    async printInvoice() {
      //console.log(this.itemBy);
      //const order = await this.$axios.$get("/order/" + this.order_id);
      const pay = this.itemBy;
      const show = `${this.$nuxt.context.env.config.IMG_URL}${this.$store.getters["setting"][0].logo}`;
      const setting = this.$store.getters["setting"][0];
      printInvoiceOnly(pay, show, setting);
    }
  },

  props: ["historyInvoice"]
};
</script>
