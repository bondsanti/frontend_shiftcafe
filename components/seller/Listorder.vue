<template>
  <!-- <v-col cols="12" sm="12" md="4" class="hidden-sm-and-down"> -->
  <v-col cols="12" sm="12" md="4">
    <v-card
      class="rounded-xl d-flex flex-row justify-center align-center"
      elevation="2"
      height="65px"
    >
      <h1>รายการสั่งซื้อ</h1>
    </v-card>
    <v-card
      class="rounded-xl d-flex flex-column mt-3"
      height="auto"
      elevation="5"
    >
      <div class="d-flex flex-row justify-space-between ml-15 mt-2 mb-5">
        <h3 class="d-flex flex-column mr-0">ชื่อ</h3>
        |
        <h3 class="d-flex flex-column">
          จำนวน
        </h3>
        |
        <h3 class="d-flex flex-column mr-15">ราคา</h3>
      </div>
      <!-- <v-divider></v-divider> -->
      <div v-for="(order, i) in orders" :key="i">
        <!-- <div class="d-flex flex-row  mt-1"> -->

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="d-flex flex-row ma-0 pa-0">
              <v-col cols="1" class="ma-0">
                <v-icon
                  color="red"
                  class="mr-4"
                  @click="deleteOrder(i)"
                  size="30px"
                  >mdi-trash-can-outline</v-icon
                >
              </v-col>
              <v-col cols="4">
                <h3>{{ order.name }}</h3>
              </v-col>
              <v-col cols="3">
                <div class="d-flex flex-row justify-space-around">
                  <v-icon class="cursor" size="30px" @click="deleteQty(i)"
                    >mdi-minus-circle-outline</v-icon
                  >
                  <h3 class="">{{ order.qty }}</h3>
                  <v-icon size="30px" class=" cursor" @click="addQty(i)"
                    >mdi-plus-circle-outline</v-icon
                  >
                </div>
              </v-col>
              <v-col cols="4" align="center"
                ><h3 class="d-flex flex-column">{{ order.price }}</h3></v-col
              >
            </v-list-item-title>
            <v-list-item-subtitle>
              <p class="text-truncate cursor" @click="editTopping(i)">
                {{ convertArrayToString(order.topping) }}
              </p>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex flex-row justify-space-between mb-0 mr-4 ml-4 mt-16">
        <h2 class="d-flex flex-column">ราคา</h2>
        <h2 class="d-flex flex-column info--text">
          {{ formatPrice(subTotal) }}
        </h2>
      </div>
      <div
        v-if="bill_name"
        class="d-flex flex-row justify-space-between  mx-4 mt-2 mb-2"
      >
        <h3>ชื่อบิล {{ bill_name }}</h3>
      </div>
    </v-card>
    <v-btn
      v-if="checkStaff"
      class="mt-5"
      rounded
      x-large
      block
      color="info"
      @click="openDialog"
      :disabled="orders.length === 0"
      >ชำระเงิน ({{ formatPrice(subTotal) }} ฿)</v-btn
    >
    <div class="d-flex flex-row">
      <v-col cols="6">
        <v-btn rounded large block outlined color="red" @click="clearOrder"
          >ยกเลิกออเดอร์</v-btn
        >
      </v-col>
      <v-col cols="6">
        <v-btn rounded large block outlined color="info" @click="confirmOrder"
          ><v-chip class="mr-4" color="info" text-color="white">
            {{ orderDatabase.length }}
          </v-chip>
          ออเดอร์</v-btn
        >
      </v-col>
    </div>
    <v-dialog v-model="dialogTopping" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          เลือก TOPPING {{ productTopping.name }}
        </v-card-title>

        <v-sheet class="pl-7">
          <p>{{ selected }}</p>
          <v-checkbox
            @click="thinkPriceTopping"
            v-model="selected"
            v-for="top in productTopping.topping"
            :key="top._id"
            :label="top.name"
            :value="top"
          ></v-checkbox>
        </v-sheet>

        <v-divider></v-divider>

        <v-card-actions>
          <h1>ราคา {{ priceMergeTopping }} บาท</h1>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="afterEditTopping">
            ตกลง
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>
<script>
export default {
  props: ["orderDatabase", "product2", "products"],

  data: () => ({
    orders: [],
    subTotal: 0,
    bill_name: null,
    checkStaff: false,
    type_order: 1,
    idForEditOrder: null,
    productTopping: {
      name: "",
      topping: [],
      price: 0,
      idInOrder: null
    },
    dialogTopping: false,
    selected: [],
    priceMergeTopping: 0
  }),
  methods: {
    editTopping(i) {
      const product = this.products.filter(
        pro => pro.product_name === this.orders[i].name
      );
      //console.log(product);
      this.selected = this.orders[i].topping;
      this.productTopping.name = product[0].product_name;
      this.productTopping.topping = product[0].topping;
      this.productTopping.price = product[0].price;
      this.productTopping.idInOrder = i;
      this.thinkPriceTopping();
      this.dialogTopping = true;
    },
    thinkPriceTopping() {
      this.priceMergeTopping = this.productTopping.price;
      let toppingPrice = 0;
      this.selected.map(s => {
        toppingPrice += s.price;
      });
      this.priceMergeTopping =
        parseInt(this.priceMergeTopping) + parseInt(toppingPrice);
    },
    afterEditTopping() {
      const k = this.productTopping.idInOrder;
      const newOrderTopping = this.selected;

      for (let i in this.orders) {
        let newTopping = newOrderTopping.map(t => t._id);
        console.log(newTopping + "1");
        let oldTopping = this.orders[i].topping.map(t => t._id);
        console.log(oldTopping + "2");
        const res = newTopping.map(t =>
          //console.log(t);
          oldTopping.includes(t)
        );
        console.log(res + "3");
        let check = value => value === true;

        if (this.orders[i].name === this.orders[k].name) {
          if (this.orders[i].topping.length === newOrderTopping.length) {
            if (res.every(check)) {
              this.orders[k].qty =
                parseInt(this.orders[k].qty) + parseInt(this.orders[i].qty);
              // this.orders[k].price =
              //   parseInt(this.orders[k].price) + parseInt(this.orders[i].price);
              this.orders[k].price =
                this.orders[k].qty * this.priceMergeTopping;
              this.orders[k].topping = this.selected;
              this.orders.splice(i, 1);
              setTimeout(this.totalPrice, 300);
              //this.dialogTopping = false;
              //console.log("same same");
              //return;
            }
          }
        }
      }
      // this.orders[k].topping = this.selected;
      // console.log(this.orders[k] + "4");
      // this.orders[k].price = this.orders[k].qty * this.priceMergeTopping;
      setTimeout(this.totalPrice, 300);
      this.dialogTopping = false;
    },
    convertArrayToString(topping) {
      let string = "";
      topping.map(t => {
        string = `${string === "" ? "" : string + ","}  ${t.name}`;
      });
      return string;
    },
    openDialog() {
      const confirmObj = {
        orders: this.orders,
        subTotal: this.subTotal,
        idOrder: this.idForEditOrder
      };
      this.$emit("openDialog", confirmObj);
    },
    totalPrice() {
      let subTotal = 0;
      for (let j in this.orders) {
        subTotal = subTotal + parseInt(this.orders[j].price);
      }
      //console.log(subTotal);
      this.subTotal = subTotal;
    },
    formatPrice(value2) {
      const value = parseInt(value2);
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    clearOrder() {
      if (this.idForEditOrder !== null) {
        this.$axios.$delete("/order/" + this.idForEditOrder).then(() => {
          this.orders = [];
          this.subTotal = 0;
          this.bill_name = null;
          this.idForEditOrder = null;
          this.$emit("refreshUser");
        });
      } else {
        this.orders = [];
        this.subTotal = 0;
        this.bill_name = null;
        this.idForEditOrder = null;
        this.$emit("refreshUser");
      }
    },
    async confirmOrder() {
      if (this.bill_name === null && this.orders.length >= 1) {
        //this.$refs.form.validate();
        //this.orderDl = true;
        this.$emit("openOrderDl");
      } else if (this.bill_name !== null || this.orders.length === 0) {
        if (this.idForEditOrder) {
          this.$axios
            .$put("/order/" + this.idForEditOrder, {
              list_product: this.orders,
              type_order: this.type_order,
              total_price: this.subTotal,
              bill_name: this.bill_name,
              status_cook: 0
            })
            .then(async () => {
              this.$emit("openHoldDl");
              this.bill_name = null;
              this.orders = [];
              this.subTotal = 0;
              this.idForEditOrder = null;
              this.$nuxt.refresh();
            });
        } else {
          //this.holdDl = true;
          this.$emit("openHoldDl");
        }
      }
    },
    addOrder(i, topping) {
      let toppingPrice = 0;
      topping.map(t => (toppingPrice += t.price));
      const orderObj = {
        ref_pro_id: this.product2[i]._id,
        name: this.product2[i].product_name,
        qty: 1,
        price: parseInt(this.product2[i].price) + parseInt(toppingPrice),
        topping: topping
      };

      for (let i in this.orders) {
        let newTopping = orderObj.topping.map(t => t._id);
        let oldTopping = this.orders[i].topping.map(t => t._id);
        const res = newTopping.map(t =>
          //console.log(t);
          oldTopping.includes(t)
        );
        let check = value => value === true;
        // console.log(oldTopping);
        // console.log(newTopping);
        // console.log(res);
        // console.log(res.every(check));
        if (this.orders[i].name === orderObj.name) {
          if (this.orders[i].topping.length === orderObj.topping.length) {
            if (res.every(check)) {
              this.orders[i].qty++;
              this.orders[i].price =
                parseInt(this.orders[i].price) + parseInt(orderObj.price);
              setTimeout(this.totalPrice, 300);
              return;
            }
          }
        }
      }
      this.orders.push(orderObj);
      setTimeout(this.totalPrice, 300);
    },
    deleteOrder(i) {
      this.orders.splice(i, 1);
      setTimeout(this.totalPrice, 300);
    },
    addQty(i) {
      const product = this.products.filter(
        pro => pro.product_name === this.orders[i].name
      );
      let toppingPrice = 0;
      this.orders[i].topping.map(t => (toppingPrice += t.price));
      this.orders[i].qty++;
      //this.orders[i].price =
      this.orders[i].price =
        parseInt(this.orders[i].price) +
        parseInt(product[0].price) +
        parseInt(toppingPrice);
      setTimeout(this.totalPrice, 300);
    },
    deleteQty(i) {
      const product = this.products.filter(
        pro => pro.product_name === this.orders[i].name
      );
      if (this.orders[i].qty !== 1) {
        let toppingPrice = 0;
        this.orders[i].topping.map(t => (toppingPrice += t.price));
        this.orders[i].qty--;
        this.orders[i].price =
          parseInt(this.orders[i].price) -
          parseInt(product[0].price) -
          parseInt(toppingPrice);
      }
      setTimeout(this.totalPrice, 300);
    },
    viewOrder(item) {
      // console.log(this.orderOnDatabase[i]);
      this.orders = item.list_product;
      this.bill_name = item.bill_name;
      this.type_order = item.type_order;
      this.idForEditOrder = item._id;
      setTimeout(this.totalPrice, 200);
      this.$emit("closeHoldDl");
      //console.log(this.orderOnDatabase[i]);
    },
    async addOrderToDatabase(bill_name) {
      const preOrder = {
        list_product: this.orders,
        type_order: this.type_order,
        total_price: this.subTotal,
        bill_name: bill_name
      };
      //console.log(preOrder);
      const res = await this.$axios.post("/order", preOrder);
      if (res.status === 200) {
        this.$nuxt.refresh();
        this.orders = [];
        this.subTotal = 0;
        this.bill_name = null;
        this.$emit("closeOrderDl");
      } else {
        this.$swal.fire(res.data.message);
      }
    }
  },
  created() {
    if (this.$store.getters["position"] === "staff") {
      this.checkStaff = false;
    } else {
      this.checkStaff = true;
    }
  }
};
</script>
