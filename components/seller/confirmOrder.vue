<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>ยืนยันการชำระเงิน</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="closeDialog">
              บันทึก
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
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
                  v-model="value"
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
            <v-divider></v-divider>
            <v-row class="ma-3" align="center">
              <h2 class="d-flex mr-5">ประเภทการสั่งอาหาร</h2>
              <v-radio-group v-model="order_type" row class="d-flex">
                <v-radio label="ทานที่ร้าน" value="1"></v-radio>
                <v-radio label="กลับบ้าน" value="2"></v-radio>
                <v-radio label="Delivery" value="3"></v-radio>
              </v-radio-group>
            </v-row>
            <v-divider></v-divider>
            <v-row class="ma-4">
              <v-col>
                <v-row align="center">
                  <h2 class="mr-5">ช่องทางการชำระเงิน</h2>
                  <v-radio-group v-model="bank" row>
                    <v-radio label="เงินสด" value="1"></v-radio>
                    <v-radio label="โอนผ่านธนาคาร" value="2"></v-radio>
                  </v-radio-group>
                </v-row>
                <v-autocomplete
                  v-model="value"
                  chips
                  clearable
                  label="เลือกธนาคาร"
                  :items="customers._id"
                  v-if="bank === '2'"
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
            <v-row>
              <v-col>
                <v-btn rounded large block color="red" dark
                  >ยกเลิกออเดอร์</v-btn
                >
              </v-col>
              <v-col>
                <v-btn rounded large block color="info" @click="show"
                  >พิมใบเสร็จรับเงิน</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-row class="justify-space-between ma-2 mx-14">
              <h1>ชื่ออาหาร</h1>
              <h1>จำนวน</h1>
              <h1>ราคา</h1>
            </v-row>
            <v-row
              class="justify-space-between ma-1 mx-16"
              v-for="order in orders"
              :key="order.name"
            >
              <h3>{{ order.name }}</h3>
              <h3>{{ order.qty }}</h3>
              <h3>{{ order.price }}</h3>
            </v-row>
            <v-row class="justify-space-between ma-1 mx-16 mt-14">
              <h2>ส่วนลด (%)</h2>
              <h2>5</h2>
            </v-row>
            <v-row class="justify-space-between ma-1 mx-16 ">
              <h2>ราคา</h2>
              <h2>{{ subtotal }}</h2>
            </v-row>
            <v-row class="justify-space-between ma-1 mx-16 ">
              <h2>ภาษี</h2>
              <h2>5</h2>
            </v-row>
            <v-row class="justify-space-between ma-1 mx-16 ">
              <h2>ราคาสุทธิ</h2>
              <h2>{{ subtotal }}</h2>
            </v-row>
          </v-col>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  async asyncData(conntext) {
    // const [customers] = await Promise.all([context.$axios.$get("/category")]);
    // return { customers };
  },
  props: ["orders", "subtotal", "dialog", "customers"],
  data: () => ({
    items: [1, 2, 3],
    cus_type: "member",
    order_type: "1",
    bank: "1",
    status: "0",
    value: "",
    customers2: []
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
    }
  },
  created() {
    this.improveCus();
  }
};
</script>
