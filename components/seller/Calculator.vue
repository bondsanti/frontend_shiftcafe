<template>
  <v-row justify="center">
    <v-dialog v-model="checkout" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">ตรวจสอบการชำระเงิน</span>
        </v-card-title>
        <v-card-text>
          <div>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  style="font-size:2em;font-weight:900"
                  min="1"
                  label="รับเงินมา"
                  outlined
                  v-model="receive"
                  type="number"
                  @keypress.enter="calMoney"
                  @keydown="calMoney"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3"
                ><v-btn block @click="addNum('1')">1</v-btn></v-col
              >
              <v-col cols="3"
                ><v-btn block @click="addNum('2')">2</v-btn></v-col
              >
              <v-col cols="3"
                ><v-btn block @click="addNum('3')">3</v-btn></v-col
              >
              <v-col cols="3"
                ><v-btn block color="red" @click="silver('100')"
                  >100 ฿</v-btn
                ></v-col
              >
            </v-row>
            <v-row>
              <v-col cols="3" nogu
                ><v-btn block @click="addNum('4')">4</v-btn></v-col
              >
              <v-col cols="3"
                ><v-btn block @click="addNum('5')">5</v-btn></v-col
              >
              <v-col cols="3"
                ><v-btn block @click="addNum('6')">6</v-btn></v-col
              >
              <v-col cols="3"
                ><v-btn block color="purple darken-1" @click="silver('500')"
                  >500 ฿</v-btn
                ></v-col
              >
            </v-row>
            <v-row>
              <v-col cols="3"
                ><v-btn block @click="addNum('7')">7</v-btn></v-col
              >
              <v-col cols="3"
                ><v-btn block @click="addNum('8')">8</v-btn></v-col
              >
              <v-col cols="3"
                ><v-btn block @click="addNum('9')">9</v-btn></v-col
              >
              <v-col cols="3"
                ><v-btn block color="orange lighten-4" @click="silver('1000')"
                  >1000 ฿</v-btn
                ></v-col
              >
            </v-row>
            <v-row>
              <v-col cols="3"
                ><v-btn color="red" block @click="clearNum()" dark
                  >ล้างค่า</v-btn
                ></v-col
              >
              <v-col cols="3"
                ><v-btn block @click="addNum('0')">0</v-btn></v-col
              >
              <v-col cols="3"
                ><v-btn block @click="delNum"
                  ><v-icon> mdi-backspace-outline</v-icon></v-btn
                ></v-col
              >
              <v-col cols="3"
                ><v-btn block color="green" @click="silver('2000')"
                  >ชำระเต็ม</v-btn
                ></v-col
              >
            </v-row>
            <v-row class="justify-center" v-if="error2">
              <v-alert
                color="red"
                dark
                icon="mdi-alert-circle"
                border="left"
                prominent
                style="width:100%; font-size:1.5em"
              >
                ยอดเงินที่รับมาไม่พอยังขาดอีก
                <strong class="mx-3">{{ diff }}</strong> บาท
              </v-alert>
            </v-row>
            <v-row class="justify-center" v-if="error1">
              <v-alert
                color="teal"
                dark
                icon="mdi-arrow-right-bold"
                border="left"
                prominent
                style="width:100% ;font-size:2em"
              >
                <div class="d-flex flex-row justify-md-space-around ">
                  เงินทอน
                  <strong class="mx-3">{{ formatPrice(withdraw) }}</strong>
                  บาท
                </div>
              </v-alert>
            </v-row>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeCheckout">
            ปิด
          </v-btn>
          <v-btn color="blue darken-1" text @click="save" :disabled="error2">
            <!-- <v-btn color="blue darken-1" text @click="save2"> -->
            บันทึก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" persistent max-width="400">
      <v-card>
        <v-card-title class="text-h5">
          พิมพ์ใบเสร็จรับเงินหรือไม่ ?
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="noBill">
            ไม่พิมพ์ใบเสร็จรับเงิน
          </v-btn>
          <v-btn color="green darken-1" dark @click="save2">
            พิมพ์ใบเสร็จรับเงิน
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    receive: 0,
    withdraw: "",
    error2: true,
    error1: false,
    dialog2: false,
    diff: 0
  }),
  props: ["netPrice", "checkout", "subPrice"],
  methods: {
    calMoney() {
      setTimeout(() => {
        //console.log(this.receive);

        const netPrice = Math.round(this.netPrice);
        if (
          parseInt(this.receive) < netPrice ||
          this.receive === NaN ||
          this.receive === null ||
          this.receive === 0 ||
          this.receive === ""
        ) {
          this.error2 = true;
          this.withdraw = 0;
          this.error1 = false;
          this.diff = netPrice - parseInt(this.receive);
        } else {
          this.withdraw = parseInt(this.receive) - netPrice;
          this.error2 = false;
          this.error1 = true;
        }
      }, 100);
      //console.log(this.receive);
    },
    closeCheckout() {
      this.$emit("closeCheckout");
    },
    noBill() {
      let money = {
        withdraw: this.withdraw,
        receive: this.receive,
        noBill: true
      };
      this.$emit("save", money);
      this.$emit("closeCheckout");
      this.dialog2 = false;
      this.receive = 0;
      this.withdraw = 0;
    },
    save() {
      const netPrice = Math.round(this.netPrice);
      if (
        parseInt(this.receive) < netPrice ||
        this.receive === NaN ||
        this.receive === null ||
        this.receive === 0 ||
        this.receive === ""
      ) {
        this.error2 = true;
        this.withdraw = 0;
        this.error1 = false;
        this.calMoney();
      } else {
        this.withdraw = parseInt(this.receive) - netPrice;
        this.error2 = false;
        this.error1 = true;
        this.dialog2 = true;
      }
    },
    save2() {
      let money = {
        withdraw: this.withdraw,
        receive: this.receive,
        noBill: false
      };
      this.$emit("save", money);
      this.$emit("closeCheckout");
      this.dialog2 = false;
      this.receive = 0;
      this.withdraw = 0;
    },
    silver(value) {
      if (value === "100" || value === "500" || value === "1000") {
        if (this.receive == 0 || this.receive == NaN) {
          this.receive = 0;
          this.receive = parseInt(this.receive) + parseInt(value);
        } else {
          this.receive = parseInt(this.receive) + parseInt(value);
        }
      } else {
        this.receive = Math.round(this.netPrice);
      }
      this.calMoney();
    },
    addNum(num) {
      if (this.receive === 0 || this.receive === NaN) {
        this.receive = "";
        this.receive += num;
      } else {
        this.receive += num;
      }
      this.calMoney();
      //console.log(this.receive.length);
    },
    delNum() {
      let number = `${this.receive}`;
      this.receive = number.substring(0, number.length - 1);
      this.calMoney();
    },
    clearNum() {
      this.receive = 0;
      this.withdraw = 0;
      this.calMoney();
    },
    formatPrice(value2) {
      const value = parseInt(value2);
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  created() {}
};
</script>
