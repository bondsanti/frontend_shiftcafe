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
                        <v-radio-group v-model="cus_type" row>
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
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row class="ma-4" v-if="cus_type === 'member'">
                    <v-col>
                      <v-row align="center">
                        <h2 class="mr-5">ส่วนลด</h2>
                        <v-radio-group v-model="discount_type" row>
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
                        <v-radio-group v-model="bank" row>
                          <v-radio label="เงินสด" value="cash"></v-radio>
                          <v-radio
                            label="โอนผ่านธนาคาร"
                            value="transfer"
                          ></v-radio>
                        </v-radio-group>
                      </v-row>
                      <v-autocomplete
                        v-model="value"
                        chips
                        clearable
                        label="เลือกธนาคาร"
                        :items="customers._id"
                        v-if="bank === 'transfer'"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row class="ma-3" align="center">
                    <h2 class="d-flex mr-5">การชำระเงิน</h2>
                    <v-radio-group v-model="status" row class="d-flex">
                      <v-radio label="รอชำระเงิน" value="0"></v-radio>
                      <v-radio label="ชำระเงินแล้ว" value="1"></v-radio>
                    </v-radio-group>
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
                      <v-btn rounded large block color="red" dark
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
                  <v-row class=" ma-2 mx-14">
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
                    class="d-flex flex-row  ma-1 mx-16"
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
                  <v-row class="justify-space-between ma-1 mx-16 mt-14">
                    <h2>ส่วนลด (%)</h2>
                    <h2>{{ coupon }} %</h2>
                  </v-row>
                  <v-row class="justify-space-between ma-1 mx-16 ">
                    <h2>ราคา</h2>
                    <h2>{{ formatPrice(subtotal) }}</h2>
                  </v-row>
                  <v-row class="justify-space-between ma-1 mx-16 ">
                    <h2>ภาษี</h2>
                    <h2>7 %</h2>
                  </v-row>
                  <v-row class="justify-space-between ma-1 mx-16 ">
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
    <v-row justify="center">
      <v-dialog v-model="checkout" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Check Out</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="รับเงินมา"
                    autofocus
                    outlined
                    v-model="receive"
                    @keypress.enter="calMoney"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="เงินทอน"
                    outlined
                    v-model="withdraw"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="checkout = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="save">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
export default {
  async asyncData(conntext) {
    // const [customers] = await Promise.all([context.$axios.$get("/category")]);
    // return { customers };
  },
  props: ["orders", "subtotal", "dialog", "customers", "idOrder"],
  data: () => ({
    items: ["นาย", "นาง", "น.ส.", "ด.ช.", "ด.ญ"],
    items2: [
      { value: 3, name: "3 %" },
      { value: 6, name: "6 %" },
      { value: 9, name: "9 %" },
      { value: 12, name: "12 %" },
      { value: 15, name: "15 %" },
      { value: 18, name: "18 %" }
    ],
    cus_type: "member",
    discount_type: "member",
    type_order: "1",
    bank: "cash",
    status: "0",
    cusId: "",
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
    vat: "1",
    coupon: 3,
    checkout: false,
    receive: "",
    withdraw: ""
  }),
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    show() {
      console.log(this.customers);
    },
    improveCus() {
      for (let i in this.customers) {
        let cus = {
          _id: this.customers[i]._id,
          name: this.customers[i].fname + " " + this.customers[i].lname
        };
        this.customers2.push(cus);
      }
    },
    async addCus() {
      this.$refs.form.validate();
      console.log(this.cus);
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
          return this.subtotal - (this.subtotal * this.coupon) / 100;
        } else {
          let net =
            (this.subtotal * 7) / 100 +
            this.subtotal -
            (this.subtotal * this.coupon) / 100;
          return net;
        }
      } else {
        if (this.vat === "1") {
          return this.subtotal;
        } else {
          return (this.subtotal * 7) / 100 + this.subtotal;
        }
      }
    },
    async save() {
      //this.checkout = true;
      console.log(this.idOrder);
      if (this.idOrder !== null) {
        const newPayment = {
          ref_order_id: this.idOrder,
          ref_cus_id: this.cusId,
          type_payment: this.bank,
          receive_money: this.receive,
          withdraw_money: this.withdraw,
          pure_price: this.subtotal,
          type_order: this.type_order,
          net_price: this.thinkPrice(this.subtotal)
        };
        this.$axios.$post("/payment", newPayment).then(res => {
          this.checkout = false;
        });
        //console.log(newPayment);
      } else {
        const newOrder = {
          status: 1,
          list_product: this.orders,
          type_order: this.type_order,
          total_price: this.subtotal,
          bill_name: "cash now"
        };
        const order = await this.$axios.$post("/order", newOrder);
        //console.log(order.data);
        const newPayment = {
          ref_order_id: order.data._id,
          ref_cus_id: this.cusId,
          type_payment: this.bank,
          receive_money: this.receive,
          withdraw_money: this.withdraw,
          pure_price: this.subtotal,
          type_order: this.type_order,
          net_price: this.thinkPrice(this.subtotal)
        };
        this.$axios.$post("/payment", newPayment).then(() => {
          this.checkout = false;
        });
      }
      this.$emit("closeDialog");
      this.$emit("clearOrder");
    },
    calMoney() {
      this.withdraw =
        parseInt(this.receive) - Math.floor(this.thinkPrice(this.subtotal));
    }
  },
  created() {
    this.improveCus();
  }
};
</script>
