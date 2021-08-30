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
              <!-- มีปัญหา -->
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
                  <v-row class="ma-4">
                    <v-col>
                      <v-row align="center">
                        <h2 class="mr-5">ส่วนลด</h2>
                        <v-radio-group
                          v-model="discount_type"
                          row
                          @change="checkDiscountType"
                        >
                          <v-radio
                            v-if="cus_type === 'member'"
                            label="บัตรสมาชิก"
                            value="member"
                          ></v-radio>
                          <v-radio label="คูปอง" value="coupong"></v-radio>
                          <v-radio label="ไม่ใช้ส่วนลด" value="no"></v-radio>
                        </v-radio-group>
                      </v-row>
                      <v-autocomplete
                        @change="checkCoupon"
                        v-model="coupon_id"
                        chips
                        clearable
                        label="รหัสคูปอง"
                        :items="couponParent"
                        item-text="codename"
                        item-value="_id"
                        v-if="discount_type === 'coupong'"
                      ></v-autocomplete>
                      <v-alert
                        :value="alert"
                        color="primary"
                        dark
                        border="top"
                        icon="mdi-fire"
                        transition="scale-transition"
                      >
                        {{ alertText }}
                      </v-alert>
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
                          class="ma-1"
                          v-for="(bank, i) in bank2"
                          :key="i"
                          @click="bank_id = bank._id"
                          :color="
                            bank_id === bank._id ? 'primary' : 'secondary'
                          "
                        >
                          <v-img
                            :src="
                              $nuxt.context.env.config.IMG_URL + bank.img_cover
                            "
                            height="100px"
                            style="background-color:#FFEBEE; "
                          ></v-img>
                          <v-card-title
                            :class="
                              bank_id === bank._id
                                ? 'text-h6 white--text'
                                : 'text-h6'
                            "
                          >
                            {{ bank.bank_name }}
                          </v-card-title>
                        </v-card>
                      </v-row>
                    </v-col>
                  </v-row>

                  <v-card-actions>
                    <v-btn color="orange lighten-2" text>
                      <h2>เปิดการใช้งานภาษี</h2>
                    </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn icon @click="show = !show">
                      <v-icon>{{
                        show ? "mdi-chevron-up" : "mdi-chevron-down"
                      }}</v-icon>
                    </v-btn>
                  </v-card-actions>

                  <v-expand-transition>
                    <div v-show="show">
                      <v-divider></v-divider>
                      <v-card-text>
                        <!-- เปิดภาษี -->
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
                      </v-card-text>
                    </div>
                  </v-expand-transition>

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
                      <!-- <v-btn
                        rounded
                        large
                        block
                        color="red"
                        dark
                        @click="for_chef('61176050b67417169c7ba9b0')"
                        >test</v-btn
                      > -->
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

                <v-col cols="12" md="6" style="border: 1px inset #757575; ">
                  <v-row class="ma-2 mx-14">
                    <v-col cols="6" justify-center>
                      <h2>ชื่ออาหาร</h2>
                    </v-col>
                    <v-col cols="3">
                      <h2>จำนวน</h2>
                    </v-col>
                    <v-col cols="3">
                      <h2>ราคา</h2>
                    </v-col>
                  </v-row>
                  <!-- <div
                    class="d-flex flex-row ma-1 mx-16"
                    v-for="(order, i) in orders"
                    :key="i"
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
                  </div> -->
                  <v-list-item-group
                    active-class="deep-primary--text text--accent-4"
                    multiple
                  >
                    <v-list-item
                      three-line
                      v-for="(order, i) in orders"
                      :key="i"
                      style="border: 1px inset #757575;"
                    >
                      <v-list-item-content>
                        <v-list-item-title class="d-flex flex-row ma-1 mx-16">
                          <v-col cols="6">
                            <h3>{{ order.name }}</h3>
                          </v-col>
                          <v-col cols="3" class="pl-16">
                            <h3>{{ order.qty }}</h3>
                          </v-col>
                          <v-col cols="3" class="pl-10">
                            <h3>{{ order.price }} ฿.</h3>
                          </v-col>
                        </v-list-item-title>
                        <v-list-item-subtitle class="ml-16">{{
                          convertArrayToString(order.topping)
                        }}</v-list-item-subtitle>
                        <v-list-item-subtitle class="ml-16">{{
                          order.detail
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                  <v-row
                    v-if="coupon !== 0"
                    class="justify-space-between ma-1 mx-16 mt-14"
                  >
                    <h2>ส่วนลด (%)</h2>
                    <h2>{{ coupon }} %</h2>
                  </v-row>
                  <v-row class="justify-space-between ma-1 mx-16">
                    <h2>ราคา</h2>
                    <h2>{{ formatPrice(subtotal) }} บาท</h2>
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
              <div class="ma-10">
                <v-form v-model="valid" ref="form">
                  <v-row class="justify-center align-center my-1">
                    <h1>ข้อมูลลูกค้า</h1>
                  </v-row>
                  <v-row class="justify-center align-center my-1">
                    <v-col cols="12">
                      <v-select
                        hide-details
                        v-model="cus.pname"
                        label="คำนำหน้า"
                        outlined
                        color="primary"
                        :items="items"
                        :rules="rules"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row class="justify-center align-center my-1">
                    <v-col cols="12" md="6">
                      <v-text-field
                        hide-details
                        v-model="cus.fname"
                        outlined
                        label="ชื่อ"
                        required
                        color="primary"
                        :rules="rules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        hide-details
                        v-model="cus.lname"
                        outlined
                        label="นามสกุล"
                        required
                        color="primary"
                        :rules="rules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="my-1">
                    <v-col cols="12" md="6">
                      <!-- <v-text-field
                        v-model="cus.birthday"
                        type="date"
                        outlined
                        label="วันเกิด"
                        required
                        color="primary"
                        :rules="rules"
                      ></v-text-field> -->
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-x
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="cus.birthday"
                            clearable
                            label="วันเกิด"
                            :rules="rules"
                            append-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            outlined
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          @change="$refs.menu.save()"
                          v-model="cus.birthday"
                          locale="th"
                          :max="
                            new Date(
                              Date.now() -
                                new Date().getTimezoneOffset() * 60000
                            )
                              .toISOString()
                              .substr(0, 10)
                          "
                          min="1950-01-01"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        @click:append="checkTelephone"
                        append-icon="mdi-phone-check"
                        v-model="cus.tel"
                        type="number"
                        outlined
                        :label="checkTelRes"
                        required
                        color="primary"
                        counter="10"
                        :rules="telRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="justify-center align-center my-1">
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="cus.email"
                        outlined
                        label="อีเมล์"
                        required
                        color="primary"
                        :rules="rules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="cus.address"
                        color="primary"
                        outlined
                        name=""
                        label="ที่อยู่"
                        :rules="rules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="justify-center align-center">
                    <v-btn
                      color="primary"
                      @click="addCus"
                      :disabled="!valid"
                      class="ma-5"
                      >บันทึก</v-btn
                    >
                  </v-row>
                </v-form>

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
              </div>
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
    show: "",
  props: [
    "orders",
    "subtotal",
    "dialog",
    "idOrder",
    "bank2",
    "statusCook",
    "couponParent",
    "unit",
    "products",
    "printOrder"
  ],
  data: () => ({

    show: false,
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
    discount_type: "no",
    type_order: "1",
    bank: "cash",
    cusId: "",
    cusIdGuest: null,
    customers2: [],
    customers: [],
    tab: "tab-1",
    cus: {
      _id: "",
      pname: "",
      fname: "",
      lname: "",
      birthday: "",
      tel: "",
      email: "",
      address: ""
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
    coupon_id: null,
    checkout: false,
    bank_id: null,
    tax: 0,
    alert: false,
    alertText: "",
    checkTelRes: "เบอร์โทรศัพท์",
    menu: false,
    activePicker: null
  }),
  methods: {
    checkTelephone() {
      const resTel = this.customers.filter(c => c.tel === this.cus.tel);
      //console.log(resTel);
      if (this.cus.tel.length !== 10) {
        this.$swal.fire({
          type: "error",
          title: "เบอร์โทรศัพท์ไม่ถูกต้อง",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000
        });
      } else {
        if (resTel.length === 0) {
          this.$swal.fire({
            type: "success",
            title: "สามารถใช้หมายเลขโทรศัพท์นี้ได้",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000
          });
        } else {
          this.$swal.fire({
            type: "warning",
            title: "มีหมายเลขโทรศัพท์นี้ในระบบแล้ว",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000
          });
        }
      }
    },
    convertArrayToString(topping) {
      let string = "";
      topping.map(t => {
        string = `${string === "" ? "" : string + ","}  ${t.name}`;
      });
      return string;
    },
    color(i) {
      if (this.bank2[i]) {
        //return this.bank_id === this.bank2[i]._id ? "primary" : "secondary";
      }
    },
    closeDialog() {
      this.$emit("closeDialog");
    },

    show() {
      // console.log(this.customers);
    },
    async improveCus() {
      this.customers = await this.$axios.$get("/customer2");
      for (let i in this.customers) {
        let cus = {
          _id: this.customers[i]._id,
          name: `${this.customers[i].fname} ${this.customers[i].lname} || tel : ${this.customers[i].tel}`
        };
        this.customers2.push(cus);
      }

      if (this.customers) {
        const res = this.customers.find(c => {
          return c.fname === "guest" && c.lname === "guest";
        });
        // มีปัญหา
        this.cusId = res._id;
        //
        this.cusIdGuest = res._id;
      }
    },

    async addCus() {
      this.$refs.form.validate();
      //console.log(this.cus);
      this.dialog2 = true;
      const res = await this.$axios.post("/customer", this.cus);
      if (res.status === 200) {
        this.improveCus();
        this.cus = {
          _id: "",
          pname: "",
          fname: "",
          lname: "",
          birthday: "",
          tel: "",
          email: "",
          address: ""
        };
        this.error = res.data.message;
        this.dialog2 = true;
        this;
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
      if (this.cus_type === "member" || this.discount_type === "coupong") {
        if (this.vat === "1") {
          this.tax = 0;
          return Math.round(
            this.subtotal - (this.subtotal * this.coupon) / 100
          );
        } else {
          this.tax = 7;
          let discount = this.subtotal - (this.subtotal * this.coupon) / 100;
          let net = (discount * this.tax) / 100 + discount;
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
          withdraw_money: money.withdraw,
          coupon_id: this.coupon_id
        };
        this.$axios.post("/payment", newPayment).then(pay => {
          //console.log(pay);
          if (pay.status === 200) {
            if (!money.noBill) {
              this.print(money, pay.data.data, pay.data.order_id);
            }
            //this.for_chef(pay.data.order_id);
            this.$emit("closeDialog_cook");
            this.$emit("closeDialog");
            this.$emit("clearOrder2");
            this.checkout = false;
            this.cus_type = "guest";
            this.discount_type = "coupong";
            this.type_order = "1";
            this.bank = "cash";
            this.cusId = this.cusIdGuest;
            this.vat = "1";
            this.alert = false;
            this.coupon_id = null;
            this.coupon = 0;
            this.discount_type = "no";
            this.$swal.fire({
              position: "center",
              type: "success",
              title: "เงินทอน " + pay.data.data.withdraw_money + " บาท",
              text: pay.data.message,
              showConfirmButton: false,
              timer: 2500
            });
          } else {
            this.$swal.fire({
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
          bill_name: "จ่ายเงินสดตอนนี้"
        };
        //const order = await this.$axios.$post("/order", newOrder);
        //console.log(order.data);
        const newPayment = {
          ...prePayment,
          ref_order_id: "no",
          receive_money: money.receive,
          withdraw_money: money.withdraw,
          new_order: newOrder,
          coupon_id: this.coupon_id
        };
        this.$axios.post("/payment", newPayment).then(pay => {
          //console.log(pay.data.order_id);
          if (pay.status === 200) {
            this.invoice = pay.data.invoice;
            if (!money.noBill) {
              this.print(money, pay.data.data, pay.data.order_id);
            }
            // setTimeout(this.for_chef(pay.data.order_id), 2000);
            //this.for_chef(pay.data.order_id);
            this.$emit("closeDialog_cook");
            this.$emit("closeDialog");
            this.$emit("clearOrder2");
            this.checkout = false;
            this.cus_type = "guest";
            this.discount_type = "coupong";
            this.type_order = "1";
            this.bank = "cash";
            this.cusId = this.cusIdGuest;
            this.vat = "1";
            this.alert = false;
            this.coupon_id = null;
            this.coupon = 0;
            this.discount_type = "no";
            this.$swal.fire({
              position: "center",
              type: "success",
              title: "เงินทอน " + pay.data.data.withdraw_money + " บาท",
              text: pay.data.message,
              showConfirmButton: false,
              timer: 2500
            });
          } else {
            //this.idOrder = order.data._id;
            this.$swal.fire({
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
        this.coupon = res.ref_level_id ? res.ref_level_id.discount : 0;
        this.alert = false;
        //this.cusId = "";
        //console.log(this.cusId);
        this.coupon_id = null;
      } else {
        if (this.cus_type === "guest") {
          this.cusId = this.cusIdGuest;
        }
        this.coupon = 0;
        this.coupon_id = null;
        this.alert = false;
        //console.log(this.cusId);
      }
    },
    checkCoupon() {
      const selectCoupon = this.couponParent.filter(c => {
        return c._id === this.coupon_id;
      });
      if (selectCoupon.length >= 1) {
        if (selectCoupon[0].status === 0) {
          this.alertText = "คูปองนี้ยังไม่สามารถใช้งานได้";
          this.alert = true;
          this.coupon = 0;
        } else if (selectCoupon[0].status === 1) {
          const date = new Date();
          if (
            date.getTime() >= new Date(selectCoupon[0].start).getTime() &&
            date.getTime() <= new Date(selectCoupon[0].end).getTime()
          ) {
            if (selectCoupon[0].num_use === 0) {
              this.alertText = "คูปองนี้ใช้ครบจำนวนครั้งที่กำหนดแล้ว";
              this.alert = true;
              this.coupon = 0;
            } else {
              this.alertText = "";
              this.alert = false;
              this.coupon = selectCoupon[0].discount;
            }
          } else {
            this.alertText = `วันที่ใช้คูปองไม่อยู่ในระยะเวลาที่กำหนดคือวันที่ ${this.formatDate2(
              selectCoupon[0].start
            )} - ${this.formatDate2(selectCoupon[0].end)}`;
            this.alert = true;
            this.coupon = 0;
          }
        } else if (selectCoupon[0].status === 2) {
          this.alertText = "คูปองนี้หมดอายุการใช้งาน";
          this.alert = true;
          this.coupon = 0;
        } else if (selectCoupon[0].status === 3) {
          this.alertText = "คูปองนี้ได้ยกเลิกไปแล้ว";
          this.alert = true;
          this.coupon = 0;
        }
      } else {
        this.alert = false;
        this.coupon = 0;
      }
      //this.coupon = selectCoupon[0].discount;
      //console.log(selectCoupon);
    },
    checkTypePayment() {
      let discount = Math.round((this.subtotal * this.coupon) / 100);
      let afterDiscount = Math.round(this.subtotal - discount);
      let vat = Math.round((afterDiscount * this.tax) / 100);
      let afterVat = Math.round(afterDiscount + vat);
      if (this.bank === "cash") {
        this.bank_id = null;
        const newPayment1 = {
          ref_cus_id: this.cusId,
          type_payment: this.bank,
          orders: this.orders,
          type_order: this.type_order,
          total_price: this.subtotal,
          discount_price: discount,
          after_discount: afterDiscount,
          vat_price: vat,
          after_vat: afterVat,
          net_price: Math.round(this.thinkPrice(this.subtotal))
        };
        return newPayment1;
      } else {
        this.bank_id = this.bank2[0] ? this.bank2[0]._id : null;
        const newPayment2 = {
          ref_cus_id: this.cusId,
          ref_bank_id: this.bank_id,
          type_payment: this.bank,
          orders: this.orders,
          type_order: this.type_order,
          total_price: this.subtotal,
          discount_price: discount,
          after_discount: afterDiscount,
          vat_price: vat,
          after_vat: afterVat,
          net_price: Math.round(this.thinkPrice(this.subtotal))
        };
        return newPayment2;
      }
    },
    cancelOrder() {
      if (this.idOrder !== null) {
        //console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
        this.$axios
          .$delete("/order/" + this.idOrder)
          .then(() => {
            this.$emit("clearOrder2");
            this.$emit("closeDialog");
          })
          .catch(e => {
            this.$swal(e);
          });
      } else {
        this.$emit("clearOrder2");
        this.$emit("closeDialog");
      }
    },
    async print(money, pay, order_id) {
      const cusName = this.customers.filter(cus => cus._id === this.cusId);
      const order = await this.$axios.$get("/order/" + order_id);
      //console.log(cusName);
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
      WinPrint.document.write(
        "<table   style='width: 100%;font-size: 0.5em;'>"
      );
      WinPrint.document.write(
        "<tr ><th style='border-bottom: thin dotted;border-top: thin dotted' width=18% >ลำดับที่</th><th style='border-bottom: thin dotted;border-top: thin dotted' width='1000px' style='padding-right:60px'>รายการ</th><th style='border-bottom: thin dotted;border-top: thin dotted' width='100px' style='padding-right:30px'>จำนวน</th><th style='border-bottom: thin dotted;border-top: thin dotted' colspan='2' width='100px'>ราคา</th></tr>"
      );
      //console.log(this.orders);
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
            `<tr><td></td><td > - ${order.list_product[i].topping[j].name} เพิ่ม ${order.list_product[i].topping[j].price} บาท</td></td></tr>`
          );
        }
      }
      WinPrint.document.write(
        "<tr><td style='border-bottom: thin dotted'></td><td style='border-bottom: thin dotted'></td><td style='border-bottom: thin dotted'></td><td style='border-bottom: thin dotted'></td><td style='border-bottom: thin dotted'></td></tr>"
      );
      WinPrint.document.write("</table>");
      WinPrint.document.write(
        "<table  style='margin-top:20px;margin-bottom:30px;font-size: 0.6em;'>"
      );
      WinPrint.document.write(
        `<tr><th width='1000px' align=left style='padding-right:60px;'>อาหารเครื่องดื่ม</th><th width='100px'>${this.formatPrice(
          pay.total_price
        )} </th><th>บาท</th></tr>`
      );
      if (pay.discount_price !== 0) {
        //const dis = Math.round((this.subtotal * this.coupon) / 100);
        WinPrint.document.write(
          `<tr><th width='1000px' align=left style='padding-right:60px;'>ส่วนลด</th><th width='100px'>${this.formatPrice(
            pay.discount_price
          )} </th><th>บาท</th></tr>`
        );
      }
      if (pay.vat_price !== 0) {
        //const vat = Math.round((this.subtotal * this.tax) / 100);
        WinPrint.document.write(
          `<tr><th width='1000px' align=left style='padding-right:60px;'>ภาษี</th><th width='100px'>${this.formatPrice(
            pay.vat_price
          )} </th><th>บาท</th></tr>`
        );
      }
      WinPrint.document.write(
        `<tr><th width='1000px' align=left style='padding-right:60px'>ยอดรวมสุทธิ</th><th width='100px'>${this.formatPrice(
          Math.round(this.thinkPrice(pay.net_price))
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

      const food = this.unit.find(u => u.u_name == "อาหาร");
      const drink = this.unit.find(u => u.u_name == "เครื่องดื่ม");
      let list = order.list_product;
      const compareFood = id => {
        const res = this.products.find(p => p._id === id);
        return res;
      };
      list.map(l => {
        l.unit = compareFood(l.ref_pro_id).ref_uid._id;
      });
      // const filterFood = (id)=>{
      //   const res = list.map(l.unit === id)
      //   return res
      // }
      const foodArr = list.filter(l => l.unit === food._id);
      const drinkArr = list.filter(l => l.unit === drink._id);
      //WinPrint.document.write("<img src='" + __dirname + "25.png'>");
      if (this.printOrder === true) {
        if (foodArr.length !== 0) {
          //for drink **************************************************************************************

          WinPrint.document.write(
            "<hr style='break-after:page'><table style='width: 100%;font-size: 0.4em;'>"
          );

          WinPrint.document.write(
            `<tr><th align='left'>พนักงานที่รับออเดอร์ : ${order.ref_emp_id.fname} ${order.ref_emp_id.lname}</th></tr>`
          );
          WinPrint.document.write(
            `<tr><th align='left'>ชื่อบิล : ${order.bill_name}</th></tr>`
          );
          WinPrint.document.write(
            `<tr><th align='center'>วันที่ ${this.formatDate(
              order.datetime
            )} </th></tr>`
          );
          WinPrint.document.write(
            "<tr><th align='center'>***สำหรับจัดทำอาหาร***</th></tr>"
          );
          WinPrint.document.write("</table>");
          WinPrint.document.write(
            "<table   style='width: 100%;font-size: 0.5em;margin-bottom:30px;'>"
          );
          WinPrint.document.write(
            "<tr ><th style='border-bottom: thin dotted;border-top: thin dotted' width=18% >ลำดับที่</th><th style='border-bottom: thin dotted;border-top: thin dotted' width='1000px' style='padding-right:60px'>รายการ</th><th style='border-bottom: thin dotted;border-top: thin dotted' width='100px' style='padding-right:30px'>จำนวน</th></tr>"
          );
          //let subTotal = 0;

          for (let j in foodArr) {
            //subTotal = subTotal + parseInt(list[j].price);
            WinPrint.document.write("<tr style='border-bottom: thin solid'>");
            WinPrint.document.write(
              `<td style='padding-left:20px;'>${parseInt(j) + 1}</td><td >${
                foodArr[j].name
              }</td><td style='padding-left:20px;'>${foodArr[j].qty}</td>`
            );
            WinPrint.document.write("</tr>");
            for (let k in foodArr[j].topping) {
              WinPrint.document.write(
                `<tr><td></td><td > - ${foodArr[j].topping[k].name} </td></td></tr>`
              );
            }
            if (foodArr[j].detail.length !== 0) {
              WinPrint.document.write(
                `<tr><td></td><td > ** ${foodArr[j].detail} **</td></td></tr>`
              );
            }
          }
          WinPrint.document.write(
            "<tr><td style='border-bottom: thin dotted'></td><td style='border-bottom: thin dotted'></td><td style='border-bottom: thin dotted'></td><td style='border-bottom: thin dotted'></td><td style='border-bottom: thin dotted'></td></tr>"
          );
          WinPrint.document.write("</table>");
        }

        if (drinkArr.length !== 0) {
          //for drink************************************************************************************************************
          WinPrint.document.write(
            "<hr style='break-after:page'><table style='width: 100%;font-size: 0.4em;'>"
          );

          WinPrint.document.write(
            `<tr><th align='left'>พนักงานที่รับออเดอร์ : ${order.ref_emp_id.fname} ${order.ref_emp_id.lname}</th></tr>`
          );
          WinPrint.document.write(
            `<tr><th align='left'>ชื่อบิล : ${order.bill_name}</th></tr>`
          );
          WinPrint.document.write(
            `<tr><th align='center'>วันที่ ${this.formatDate(
              order.datetime
            )} </th></tr>`
          );
          WinPrint.document.write(
            "<tr><th align='center'>***สำหรับจัดทำเครื่องดื่ม***</th></tr>"
          );
          WinPrint.document.write("</table>");
          WinPrint.document.write(
            "<table   style='width: 100%;font-size: 0.5em;'>"
          );
          WinPrint.document.write(
            "<tr ><th style='border-bottom: thin dotted;border-top: thin dotted' width=18% >ลำดับที่</th><th style='border-bottom: thin dotted;border-top: thin dotted' width='1000px' style='padding-right:60px'>รายการ</th><th style='border-bottom: thin dotted;border-top: thin dotted' width='100px' style='padding-right:30px'>จำนวน</th></tr>"
          );
          //let subTotal = 0;

          for (let j in drinkArr) {
            //subTotal = subTotal + parseInt(drinkArr[j].price);
            WinPrint.document.write("<tr style='border-bottom: thin solid'>");
            WinPrint.document.write(
              `<td style='padding-left:20px;'>${parseInt(j) + 1}</td><td >${
                drinkArr[j].name
              }</td><td style='padding-left:20px;'>${drinkArr[j].qty}</td>`
            );
            WinPrint.document.write("</tr>");
            for (let k in drinkArr[j].topping) {
              WinPrint.document.write(
                `<tr><td></td><td > - ${drinkArr[j].topping[k].name} </td></td></tr>`
              );
            }
            if (drinkArr[j].detail.length !== 0) {
              WinPrint.document.write(
                `<tr><td></td><td > ** ${drinkArr[j].detail} **</td></td></tr>`
              );
            }
          }
          WinPrint.document.write(
            "<tr><td style='border-bottom: thin dotted'></td><td style='border-bottom: thin dotted'></td><td style='border-bottom: thin dotted'></td><td style='border-bottom: thin dotted'></td><td style='border-bottom: thin dotted'></td></tr>"
          );
          WinPrint.document.write("</table>");
        }
      }

      WinPrint.document.close();
      WinPrint.focus();
      setTimeout(() => {
        WinPrint.print();
        WinPrint.close();
      }, 500);
      //setTimeout(this.for_chef(pay.ref_order_id), 700);
      //WinPrint.close();
    },

    formatDate(date) {
      this.$moment().format("LLLL");
      let strdate = this.$moment(date).add(543, "years");
      return this.$moment(strdate).format("D MMMM YYYY H:mm");
    },
    formatDate2(date) {
      this.$moment().format("LLLL");
      let strdate = this.$moment(date).add(543, "years");
      return this.$moment(strdate).format("D MMMM YYYY ");
    }
  },
  created() {
    this.improveCus();
    this.cusId = this.cusIdGuest;
    //this.improveBank();
  }
};
</script>
