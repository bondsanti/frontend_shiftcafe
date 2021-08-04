<template>
  <div class="" style="height: 100%">
    <v-card class="py-5 px-5" style="height: 100%;" color="secondary">
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-form>
            <v-card-title>
              <span class="text-h"
                ><v-icon left id="printable"> mdi-note-text-outline </v-icon>
                หมายเลขใบเสร็จรับเงิน : {{ itemBy.invoice }}</span
              >
            </v-card-title>
            <v-divider class="mb-3"></v-divider>
            <v-card-text>
              <v-row v-for="(de, i) in detailArr" :key="i">
                <v-col cols="6" class="flex-grow-0 flex-shrink-0 text-center"
                  ><h4>{{ de.name }}</h4></v-col
                >
                <v-col cols="6" class="flex-grow-0 flex-shrink-0 text-center"
                  ><h4>{{ de.value }}</h4></v-col
                >
              </v-row>
            </v-card-text>
            <v-divider class="mt-3"></v-divider>
            <v-card-actions>
              <v-btn color="teal" @click="printInvoice" dark>
                <v-icon left> mdi-printer </v-icon>พิมพ์ใบเสร็จรับเงิน
              </v-btn>
              <v-spacer></v-spacer>

              <v-btn color="error" @click="close">
                <v-icon left> mdi-close </v-icon>ปิด
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <v-row>
        <v-col xs="12" sm="12" md="12" class="">
          <v-card class="px-6 py-5 mb-5">
            <v-card-title>
              <h2 class="text-center">ข้อมูลใบสั่งซื้อ</h2>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="invoiceTableData"
              :search="search"
              :items-per-page="15"
              :footer-props="{
                'items-per-page-options': [15, 20, 30, 40, 50, -1],
                prevIcon: 'mdi-chevron-left',
                nextIcon: 'mdi-chevron-right',
                'items-per-page-text': 'ข้อมูลหน้าต่อไป'
              }"
              :sort-by="['datetime']"
              :sort-desc="[true, false]"
              class="mb-n5"
            >
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
                  class="mr2"
                  color="light-green accent-3"
                  @click="Detail(item.actions)"
                  small
                >
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-eye-settings
                  </v-icon>
                  ดูรายละเอียด
                </v-btn>
                <v-btn
                  class="ml-2"
                  color="red accent-3"
                  @click="disableBill(item.actions)"
                  small
                  v-if="item.actions.status === 0"
                  dark
                  :disabled="$store.getters['position'] === 'cashier'"
                >
                  <v-icon aria-hidden="false" class="mx-2">
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
    <v-dialog v-model="dialogDelete" max-width="450px" width="auto">
      <v-card>
        <v-card-title class="text-h5 white--text  primary text-center">
          {{
            typePayment === "disable"
              ? "แน่ใจแล้วใช่มั้ยที่จะยกเลิกบิล"
              : "แน่ใจแล้วใช่มั้ยที่จะเปิดการใช้งานบิล"
          }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="ma-2" @click="dialogDelete = false">
            <v-icon aria-hidden="false" class="mx-2"> mdi-close-box </v-icon
            >ไม่ละ เปลี่ยนใจแล้ว</v-btn
          >
          <v-btn color="red" class="ma-2" @click="manageBill" dark>
            <v-icon aria-hidden="false"
              >{{
                typePayment === "disable"
                  ? "mdi-delete-forever"
                  : "mdi-newspaper-variant-outline"
              }} </v-icon
            >{{
              typePayment === "disable" ? "ยกเลิกบิล" : "เปิดการใช้งานบิล"
            }}</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      dialog: false,

      itemBy: {},
      headers: [
        {
          text: "วัน เวลา",
          align: "start",
          sortable: true,
          value: "datetime"
        },
        { text: "หมายเลขบิล", value: "invoice" },
        { text: "ประเภทการชำระเงิน", value: "type_payment" },
        { text: "ยอดสุทธิ", value: "net_price" },
        { text: "เงินรับมา", value: "receive_money" },
        { text: "เงินทอน", value: "withdraw_money" },
        { text: "สถานะ", value: "status" },
        { text: "หมายเหตุ", value: "actions", sortable: false }
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
    async printInvoice() {
      //console.log(window.location.href);
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
          }</td><td style='padding-left:20px;'>${
            order.list_product[i].qty
          }</td><td style='padding-left:20px;'>${this.formatPrice(
            order.list_product[i].price
          )} </td><td style='padding-right:20px;'>฿</td>`
        );
        WinPrint.document.write("</tr>");
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
      await setTimeout(WinPrint.print(), 50000);
      //WinPrint.print();
      //WinPrint.close();
    }
  },

  props: ["historyInvoice"]
};
</script>
