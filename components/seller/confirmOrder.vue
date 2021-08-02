<template>
  <div>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-tabs
              v-model="tab"
              background-color="primary"
              started
              dark
              icons-and-text
            >
              <v-tabs-slider></v-tabs-slider>
              <v-tab href="#tab-1">
                ยืนยันคำสั่งซื้อ
                <v-icon>mdi-food</v-icon>
              </v-tab>
              <v-tab href="#tab-2">
                สมัครสมาชิก
                <v-icon>mdi-account</v-icon>
              </v-tab>
            </v-tabs>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="closeDialog">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-tabs-items v-model="tab">
            <v-tab-item value="tab-1">
              <div class="d-flex flex-row flex-wrap">
                <v-col cols="12" md="6">
                  <v-row class="ma-4">
                    <v-col>
                      <v-row align="center">
                        <h2 class="mr-5">ประเภทลูกค้า</h2>
                        <v-radio-group
                          v-model="cus_type"
                          row
                          @change="checkDiscountType"
                        >
                          <v-radio label="ทั่วไป" value="guest"></v-radio>
                          <v-radio label="สมาชิก" value="member"></v-radio>
                        </v-radio-group>
                      </v-row>
                      <v-autocomplete
                        v-model="cusId"
                        chips
                        clearable
                        label="ค้นหาข้อมูลลูกค้า"
                        :items="customers2.flat()"
                        item-value="_id"
                        item-text="name"
                        v-if="cus_type === 'member'"
                        @change="checkDiscountType"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row class="ma-4" v-if="cus_type === 'member'">
                    <v-col>
                      <v-row align="center">
                        <h2 class="mr-5">ส่วนลด</h2>
                        <v-radio-group
                          v-model="discount_type"
                          row
                          @change="checkDiscountType"
                        >
                          <v-radio label="บัตรสมาชิก" value="member"></v-radio>
                          <v-radio label="ส่วนลด (%)" value="coupong"></v-radio>
                        </v-radio-group>
                      </v-row>
                      <v-autocomplete
                        v-model="coupon"
                        chips
                        clearable
                        label="% ส่วนลด"
                        :items="items2"
                        item-text="name"
                        item-value="value"
                        v-if="discount_type === 'coupong'"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row class="ma-3" align="center">
                    <h2 class="d-flex mr-5">ประเภทการสั่งอาหาร</h2>
                    <v-radio-group v-model="type_order" row class="d-flex">
                      <v-radio label="ทานที่ร้าน" value="1"></v-radio>
                      <v-radio label="กลับบ้าน" value="2"></v-radio>
                    </v-radio-group>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row class="ma-4">
                    <v-col>
                      <v-row align="center">
                        <h2 class="mr-5">ช่องทางการชำระเงิน</h2>
                        <v-radio-group
                          v-model="bank"
                          row
                          @change="checkTypePayment"
                        >
                          <v-radio label="เงินสด" value="cash"></v-radio>
                          <v-radio
                            label="โอนผ่านธนาคาร"
                            value="transfer"
                          ></v-radio>
                        </v-radio-group>
                      </v-row>

                      <v-row v-if="bank === 'transfer'">
                        <v-card
                          width="30%"
                          height="10%"
                          class="mx-1"
                          v-for="(bank, i) in bank2"
                          :key="i"
                          @click="bank_id = bank._id"
                          :color="
                            bank_id === bank._id
                              ? 'light-green accent-3'
                              : 'white'
                          "
                        >
                          <v-img
                            :src="$nuxt.context.env.config.IMG_URL + bank.img"
                            height="100px"
                            class="grey darken-4"
                          ></v-img>
                          <v-card-title class="text-h6">
                            {{ bank.bank_name }}
                          </v-card-title>
                        </v-card>
                      </v-row>
                    </v-col>
                  </v-row>

                  <v-row class="ma-3" align="center">
                    <h2 class="d-flex mr-5">ภาษี</h2>
                    <v-radio-group
                      v-model="vat"
                      row
                      class="d-flex"
                      @change="thinkPrice"
                    >
                      <v-radio label="ไม่บวกภาษี" value="1"></v-radio>
                      <v-radio label="บวกภาษี" value="2"></v-radio>
                    </v-radio-group>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-btn
                        rounded
                        large
                        block
                        color="red"
                        dark
                        :disabled="statusCook === 1"
                        @click="cancelOrder"
                        >ยกเลิกออเดอร์</v-btn
                      >
                    </v-col>
                    <v-col>
                      <v-btn
                        rounded
                        large
                        block
                        color="info"
                        @click="checkout = true"
                        >บันทีกการจ่ายเงิน</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" md="6">
                  <v-row class="ma-2 mx-14">
                    <v-col cols="6" justify-center>
                      <h1>ชื่ออาหาร</h1>
                    </v-col>
                    <v-col cols="3">
                      <h1>จำนวน</h1>
                    </v-col>
                    <v-col cols="3">
                      <h1>ราคา</h1>
                    </v-col>
                  </v-row>
                  <div
                    class="d-flex flex-row ma-1 mx-16"
                    v-for="order in orders"
                    :key="order.name"
                  >
                    <v-col cols="6">
                      <h3>{{ order.name }}</h3>
                    </v-col>
                    <v-col cols="3" class="pl-16">
                      <h3>{{ order.qty }}</h3>
                    </v-col>
                    <v-col cols="3" class="pl-10">
                      <h3>{{ order.price }} ฿.</h3>
                    </v-col>
                  </div>
                  <v-row
                    v-if="coupon !== 0"
                    class="justify-space-between ma-1 mx-16 mt-14"
                  >
                    <h2>ส่วนลด (%)</h2>
                    <h2>{{ coupon }} %</h2>
                  </v-row>
                  <v-row class="justify-space-between ma-1 mx-16">
                    <h2>ราคา</h2>
                    <h2>{{ formatPrice(subtotal) }}</h2>
                  </v-row>
                  <v-row
                    v-if="tax !== 0"
                    class="justify-space-between ma-1 mx-16"
                  >
                    <h2>ภาษี</h2>
                    <h2>{{ tax }} %</h2>
                  </v-row>
                  <v-row class="justify-space-between ma-1 mx-16">
                    <h2>ราคาสุทธิ</h2>
                    <h2>{{ formatPrice(thinkPrice(subtotal)) }} บาท</h2>
                  </v-row>
                </v-col>
              </div>
            </v-tab-item>
          </v-tabs-items>
          <v-tabs-items v-model="tab">
            <v-tab-item value="tab-2">
              <v-container>
                <v-row class="justify-center ma-3">
                  <h1>ข้อมูลลูกค้า</h1>
                </v-row>
                <v-form v-model="valid" ref="form">
                  <v-row class="mx-16">
                    <v-col cols="12">
                      <v-select
                        v-model="cus.pname"
                        label="คำนำหน้า"
                        outlined
                        color="primary"
                        :items="items"
                        :rules="rules"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6" class="mt-n7">
                      <v-text-field
                        v-model="cus.fname"
                        outlined
                        label="ชื่อ"
                        required
                        color="primary"
                        :rules="rules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="mt-n7">
                      <v-text-field
                        v-model="cus.lname"
                        outlined
                        label="นามสกุล"
                        required
                        color="primary"
                        :rules="rules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="mt-n7">
                      <v-text-field
                        v-model="cus.birthday"
                        type="date"
                        outlined
                        label="วันเกิด"
                        required
                        color="primary"
                        :rules="rules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="mt-n7">
                      <v-text-field
                        v-model="cus.tel"
                        type="number"
                        outlined
                        label="เบอร์โทร"
                        required
                        color="primary"
                        counter="10"
                        :rules="telRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="mt-n7">
                      <v-text-field
                        v-model="cus.email"
                        outlined
                        label="อีเมล์"
                        required
                        color="primary"
                        :rules="rules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="mt-n7">
                      <v-textarea
                        v-model="cus.address"
                        color="primary"
                        outlined
                        name=""
                        label="ที่อยู่"
                        :rules="rules"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-form>
                <v-row class="justify-center">
                  <v-btn color="primary" @click="addCus" :disabled="!valid"
                    >บันทึก</v-btn
                  >
                </v-row>
                <v-row justify="center">
                  <v-dialog v-model="dialog2" persistent max-width="350">
                    <v-card>
                      <v-card-title class="text-h5">
                        {{ error }}
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="green darken-1"
                          text
                          @click="dialog2 = false"
                        >
                          ตกลง
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>
              </v-container>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-dialog>
    </v-row>
    <Calculator
      :checkout="checkout"
      :netPrice="thinkPrice(subtotal)"
      @closeCheckout="checkout = false"
      @save="save"
      @print="print"
    />
  </div>
</template>
<script>
import Calculator from "@/components/seller/Calculator.vue";
export default {
  components: {
    Calculator
  },
  props: [
    "orders",
    "subtotal",
    "dialog",
    "customers",
    "idOrder",
    "bank2",
    "statusCook"
  ],
  data: () => ({
    items: ["นาย", "นาง", "น.ส.", "ด.ช.", "ด.ญ"],
    items2: [
      { value: 0, name: "0 %" },
      { value: 3, name: "3 %" },
      { value: 6, name: "6 %" },
      { value: 9, name: "9 %" },
      { value: 12, name: "12 %" },
      { value: 15, name: "15 %" },
      { value: 18, name: "18 %" }
    ],
    cus_type: "guest",
    discount_type: "coupong",
    type_order: "1",
    bank: "cash",
    cusId: "60fa3812dc42a9589e33ba1b",
    customers2: [],
    tab: "tab-1",
    cus: {
      pname: "",
      fname: "",
      lname: "",
      birthday: "",
      tel: "",
      email: "",
      address: "",
      ref_level_id: "60e439b7c7d6ae35548c7b62"
    },
    valid: true,
    rules: [value => !!value || "โปรดกรอกข้อมูลให้ครบถ้วน"],
    telRules: [
      v => !!v || "โปรดกรอกข้อมูลให้ครบถ้วน",
      v => v.length >= 10 || "เบอร์โทรศัพท์ไม่ถูกต้อง",
      v => v.length <= 10 || "เบอร์โทรศัพท์ไม่ถูกต้อง"
    ],
    dialog2: false,
    error: null,
    error2: false,
    vat: "1",
    coupon: 0,
    checkout: false,
    bank_id: null,
    tax: 0
    //bank3: []
  }),
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    show() {
      // console.log(this.customers);
    },
    improveCus() {
      for (let i in this.customers) {
        let cus = {
          _id: this.customers[i]._id,
          name: `${this.customers[i].fname} ${this.customers[i].lname} || tel : ${this.customers[i].tel}`
        };
        this.customers2.push(cus);
      }
    },

    async addCus() {
      this.$refs.form.validate();
      //console.log(this.cus);
      this.dialog2 = true;
      const res = await this.$axios.post("/customer", this.cus);
      if (res.status === 200) {
        this.customers = await this.$axios.$get("/customer");
        this.improveCus();
        this.error = res.data.message;
        this.dialog2 = true;
        this.tab = "tab-1";
      } else {
        this.error = res.data.message;
        this.dialog2 = true;
      }
    },
    formatPrice(value2) {
      const value = parseInt(value2);
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    thinkPrice() {
      if (this.cus_type === "member") {
        if (this.vat === "1") {
          this.tax = 0;
          return Math.round(
            this.subtotal - (this.subtotal * this.coupon) / 100
          );
        } else {
          this.tax = 7;
          let net =
            (this.subtotal * this.tax) / 100 +
            this.subtotal -
            (this.subtotal * this.coupon) / 100;
          return Math.round(net);
        }
      } else {
        if (this.vat === "1") {
          this.tax = 0;
          return Math.round(this.subtotal);
        } else {
          this.tax = 7;
          return Math.round((this.subtotal * this.tax) / 100 + this.subtotal);
        }
      }
    },
    async save(money) {
      const prePayment = this.checkTypePayment();
      //console.log({ ...prePayment, ref_order_id: "11111111" });
      if (this.idOrder !== null) {
        const newPayment = {
          ...prePayment,
          ref_order_id: this.idOrder,
          receive_money: money.receive,
          withdraw_money: money.withdraw
        };
        this.$axios.post("/payment", newPayment).then(pay => {
          //console.log(pay);
          if (pay.status === 200) {
            if (!money.noBill) {
              this.print(money, pay.data.data);
            }

            this.$emit("closeDialog_cook");
            this.$emit("closeDialog");
            this.$emit("clearOrder");
            this.checkout = false;
            this.cus_type = "guest";
            this.discount_type = "coupong";
            this.type_order = "1";
            this.bank = "cash";
            this.cusId = "60fa3812dc42a9589e33ba1b";
            this.vat = "1";
          } else {
            this.$swal({
              position: "center",
              type: "warning",
              title: pay.data.message,
              showConfirmButton: false,
              timer: 2500
            });
          }
        });
        //console.log(newPayment);
      } else {
        const newOrder = {
          status: 1,
          status_cook: 1,
          list_product: this.orders,
          type_order: this.type_order,
          total_price: this.subtotal,
          bill_name: "cash now"
        };
        const order = await this.$axios.$post("/order", newOrder);
        //console.log(order.data);
        const newPayment = {
          ...prePayment,
          ref_order_id: order.data._id,
          receive_money: money.receive,
          withdraw_money: money.withdraw
        };
        this.$axios.post("/payment", newPayment).then(pay => {
          //console.log(pay);
          if (pay.status === 200) {
            this.invoice = pay.data.invoice;
            if (!money.noBill) {
              this.print(money, pay.data.data);
            }
            this.$emit("closeDialog_cook");
            this.$emit("closeDialog");
            this.$emit("clearOrder");
            this.checkout = false;
            this.cus_type = "guest";
            this.discount_type = "coupong";
            this.type_order = "1";
            this.bank = "cash";
            this.cusId = "60fa3812dc42a9589e33ba1b";
            this.vat = "1";
          } else {
            this.idOrder = order.data._id;
            this.$swal({
              position: "center",
              type: "warning",
              title: pay.data.message,
              showConfirmButton: false,
              timer: 2500
            });
          }
        });
        //console.log(newPayment);
      }
    },
    async checkDiscountType() {
      if (this.discount_type === "member" && this.cus_type === "member") {
        const res = await this.$axios.$get("/customer/" + this.cusId);
        //console.log(res);
        this.coupon = res.ref_level_id.discount;
        //this.cusId = "";
        //console.log(this.cusId);
      } else {
        if (this.cus_type === "guest") {
          this.cusId = "60fa3812dc42a9589e33ba1b";
        }
        this.coupon = 0;
        //console.log(this.cusId);
      }
    },
    checkTypePayment() {
      if (this.bank === "cash") {
        this.bank_id = null;
        const newPayment1 = {
          ref_cus_id: this.cusId,
          type_payment: this.bank,
          orders: this.orders,
          type_order: this.type_order,
          total_price: this.subtotal,
          discount_price: Math.round((this.subtotal * this.coupon) / 100),
          after_discount: Math.round(
            this.subtotal - [(this.subtotal * this.coupon) / 100]
          ),
          vat_price: Math.round((this.subtotal * this.tax) / 100),
          after_vat: Math.round(
            (this.subtotal * this.tax) / 100 + this.subtotal
          ),
          net_price: Math.round(this.thinkPrice(this.subtotal))
        };
        return newPayment1;
      } else {
        this.bank_id = "60e6e7fbc4c3411dcc562608";
        const newPayment2 = {
          ref_cus_id: this.cusId,
          ref_bank_id: this.bank_id,
          type_payment: this.bank,
          orders: this.orders,
          type_order: this.type_order,
          total_price: this.subtotal,
          discount_price: Math.round((this.subtotal * this.coupon) / 100),
          after_discount: Math.round(
            this.subtotal - [(this.subtotal * this.coupon) / 100]
          ),
          vat_price: Math.round((this.subtotal * this.tax) / 100),
          after_vat: Math.round(
            (this.subtotal * this.tax) / 100 + this.subtotal
          ),
          net_price: Math.round(this.thinkPrice(this.subtotal))
        };
        return newPayment2;
      }
    },
    cancelOrder() {
      if (this.idOrder !== null) {
        this.$axios
          .$delete("/order/" + this.idOrder)
          .then(() => {
            this.$emit("clearOrder");
            this.$emit("closeDialog");
          })
          .catch(e => {
            this.$swal(e);
          });
      } else {
        this.$emit("clearOrder");
        this.$emit("closeDialog");
      }
    },
    print(money, pay) {
      const cusName = this.customers.filter(cus => cus._id === this.cusId);
      //console.log(cusName);
      var WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
      );
      WinPrint.document.write("<table >");
      WinPrint.document.write(
        "<tr><th>SHIFT restaurant</th><th style='padding-left:60px'><img width='70px' height='70px' src='https://api.shift-cafe.com/logo.jpg'></th></tr>"
      );
      WinPrint.document.write("</table>");
      WinPrint.document.write("<table style='width: 100%;font-size: 0.4em;'>");
      WinPrint.document.write(
        "<tr><th align='left'>บริษัท ชิฟท์ เรสเตอรองต์ จำกัด</th></tr>"
      );
      WinPrint.document.write(
        "<tr><th align='left'>ที่อยู่ : 89/1 ถนนสุขสวัสดิ์ 4 ตำบลพระบาท</th></tr>"
      );
      WinPrint.document.write(
        "<tr><th align='left'>อำเภอเมือง จังหวัดลำปาง 52000</th></tr>"
      );
      WinPrint.document.write(
        "<tr><th align='left'>เบอร์มือถือ : 0917961816</th></tr>"
      );
      WinPrint.document.write(
        `<tr><th align='left'>พนักงานรับเงิน : ${this.$store.getters["displayName"]}</th></tr>`
      );
      if (cusName[0].fname !== "guest") {
        WinPrint.document.write(
          `<tr><th align='left'>ลูกค้า : คุณ ${cusName[0].fname} ${cusName[0].lname}</th></tr>`
        );
      }
      WinPrint.document.write(
        `<tr><th align='center' >ใบเสร็จรับเงินเลขที่ : ${pay.invoice}</th></tr>`
      );
      WinPrint.document.write(
        `<tr><th align='center' >วันที่ ${this.formatDate(
          pay.datetime
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
      for (let i in this.orders) {
        WinPrint.document.write("<tr style='border-bottom: thin solid'>");
        WinPrint.document.write(
          `<td style='padding-left:20px;'>${parseInt(i) + 1}</td><td >${
            this.orders[i].name
          }</td><td style='padding-left:20px;'>${
            this.orders[i].qty
          }</td><td style='padding-left:20px;'>${this.formatPrice(
            this.orders[i].price
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
        `<tr><th width='1000px' align=left style='padding-right:60px;'>อาหารเครื่องดื่ม</th><th width='100px'>${this.formatPrice(
          this.subtotal
        )} </th><th>บาท</th></tr>`
      );
      if (this.coupon !== 0) {
        const dis = Math.round((this.subtotal * this.coupon) / 100);
        WinPrint.document.write(
          `<tr><th width='1000px' align=left style='padding-right:60px;'>ส่วนลด</th><th width='100px'>${this.formatPrice(
            dis
          )} </th><th>บาท</th></tr>`
        );
      }
      if (this.tax !== 0) {
        const vat = Math.round((this.subtotal * this.tax) / 100);
        WinPrint.document.write(
          `<tr><th width='1000px' align=left style='padding-right:60px;'>ภาษี</th><th width='100px'>${this.formatPrice(
            vat
          )} </th><th>บาท</th></tr>`
        );
      }
      WinPrint.document.write(
        `<tr><th width='1000px' align=left style='padding-right:60px'>ยอดรวมสุทธิ</th><th width='100px'>${this.formatPrice(
          Math.round(this.thinkPrice(this.subtotal))
        )} </th><th>บาท</th></tr>`
      );
      WinPrint.document.write(
        `<tr><th width='1000px' align=left style='padding-right:60px'>เงินสด</th><th width='100px'>${this.formatPrice(
          money.receive
        )} </th><th>บาท</th></tr>`
      );
      WinPrint.document.write(
        `<tr><th width='1000px' align=left style='padding-right:60px'>เงินทอน</th><th width='100px'>${this.formatPrice(
          money.withdraw
        )} </th><th>บาท</th></tr>`
      );
      WinPrint.document.write(
        `<tr><th  align=center style='padding-left:60px' >**ขอบคุณที่ใช้บริการ**</th></tr>`
      );
      WinPrint.document.write("</table>");
      WinPrint.document.close();
      WinPrint.focus();
      setTimeout(WinPrint.print(), 3000);
      //WinPrint.close();
    },
    formatDate(date) {
      this.$moment().format("LLLL");
      let strdate = this.$moment(date).add(543, "years");
      return this.$moment(strdate).format("D MMMM YYYY H:mm");
    }
  },
  created() {
    this.improveCus();
    //this.improveBank();
  }
};
</script>
