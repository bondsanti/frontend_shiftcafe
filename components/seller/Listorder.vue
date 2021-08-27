<template>
  <!-- <v-col cols="12" sm="12" md="4" class="hidden-sm-and-down"> -->
  <div>
    <v-card
      class="rounded-lg d-flex flex-row justify-center align-center"
      elevation="2"
      height="65px"
    >
      <span :class="[$vuetify.breakpoint.smAndDown ? 'text-h5' : 'text-h4']">
        รายการสั่งซื้อ
      </span>
    </v-card>
    <v-card
      class="rounded-lg d-flex flex-column mt-3"
      height="auto"
      elevation="5"
    >
      <div class="d-flex flex-row justify-space-between ml-10 mt-2 mb-5">
        <h4 class="d-flex flex-column mt-1 ">
          หมายเหตุ
        </h4>
        |
        <h4 class="d-flex flex-column mr-0 mt-1">ชื่อ</h4>
        |
        <h4 class="d-flex flex-column mt-1">
          จำนวน
        </h4>
        |
        <h4 class="d-flex flex-column mr-13 mt-1 ">ราคา</h4>
      </div>
      <v-list-item-group
        v-model="selectedItem"
        active-class="red--text text--accent-4"
        color="primary"
      >
        <div v-for="(order, i) in orders" :key="i">
          <v-divider></v-divider>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="d-flex flex-row ma-0 pa-0">
                <v-row align="center" justify="center">
                  <v-btn-toggle>
                    <v-btn
                      small
                      style="background-color: #ff0000;"
                      @click="deleteOrder(i)"
                    >
                      <v-icon color="#FFFFFF">mdi-delete-variant</v-icon>
                    </v-btn>
                    <v-btn
                      small
                      style="background-color: #0080ff;"
                      class="white--text"
                      @click="editTopping(i)"
                      ><h4>ปรับ</h4></v-btn
                    >
                  </v-btn-toggle>
                </v-row>

                <v-col cols="3" class="mx-2 ml-2">
                  <h4 v-text="order.name" class="text-wrap"></h4>
                </v-col>
                <!-- + - -->
                <v-col cols="2">
                  <div class="d-flex flex-row justify-space-around" >
                    <v-icon class="cursor" size="25px" @click="deleteQty(i)"
                      >mdi-minus-circle-outline</v-icon
                    >
                    <h4 class="">{{ order.qty }}</h4>
                    <v-icon size="25px" class=" cursor" @click="addQty(i)"
                      >mdi-plus-circle-outline</v-icon
                    >
                  </div>
                </v-col>
                <!-- + - -->
                <v-col cols="3" align="center">
                  <h4 class="d-flex flex-column mx-2 ml-5">
                    {{ order.price }}
                  </h4>
                </v-col>
              </v-list-item-title>
              <v-list-item-subtitle>
                <p class="text-truncate cursor pb-2 mb-0">
                  {{ convertArrayToString(order.topping) }}
                </p>
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <p class="text-truncate cursor pb-2 mb-0">
                  {{ order.detail }}
                </p>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list-item-group>

      <v-spacer></v-spacer>
      <div
        class="d-flex flex-row justify-space-between mb-0 mr-4 ml-4 mt-6 ma-6"
      >
        <h2 class="d-flex flex-column ma-2">ราคา</h2>
        <h2 class="d-flex flex-column info--text ma-2">
          {{ formatPrice(subTotal) }}
        </h2>
      </div>
      <div
        v-if="bill_name"
        class="d-flex flex-row justify-space-between  mx-4 mt-2 mb-2 "
      >
        <h3 class="text-center">ชื่อบิล {{ bill_name }}</h3>
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
    <div class="mb-2 d-flex flex-row">
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
    <v-dialog v-model="dialogTopping" width="450">
      <v-card class="rounded-xl">
        <v-card-title class="text-h5  lighten-2">
          <v-row>
            <v-col cols="12" sm="4" md="4" lg="4">
              <v-sheet
                color="white"
                height="80"
                width="80"
                class="rounded-circle  "
              >
                <v-img src="/clipboard.png"></v-img>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="8" md="8" lg="8">
              <p class=" ma-2 mt-6">เลือกท็อปปิ้ง{{ productTopping.name }}</p>
            </v-col>
          </v-row>
        </v-card-title>
        <!-- <v-sheet class="pl-7 pr-7 pt-7">
          <v-checkbox
            @click="thinkPriceTopping"
            v-model="selected"
            v-for="top in productTopping.topping"
            :key="top._id"
            :label="top.name"
            :value="top"
          ></v-checkbox>
          <v-text-field
            solo
            label="รายละเอียดเพิ่มเติม"
            v-model="detailTopping"
          ></v-text-field>
        </v-sheet> -->
        <v-list>
          <v-list-item-group v-model="selected" multiple>
            <template v-for="top in productTopping.topping">
              <v-divider v-if="!top" :key="top._id"></v-divider>

              <v-list-item
                v-else
                :key="top._id"
                :value="top"
                active-class="red--text text--accent-4"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-content>
                    <v-list-item-avatar>
                      <v-avatar
                        ><img src="../../assets/icons/shopping.png"
                      /></v-avatar>
                    </v-list-item-avatar>
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-title v-text="top.name"> </v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-checkbox
                      @click="thinkPriceTopping"
                      :input-value="active"
                      color="red accent-4"
                    ></v-checkbox>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
        <v-text-field
          class="mx-2 mt-2"
          prepend-inner-icon="mdi-tooltip-text-outline"
          label="รายละเอียดเพิ่มเติม"
          v-model="detailTopping"
          rounded
        ></v-text-field>

        <v-card-actions>
          <h3 class="subheading text-uppercase pl-2 mb-4">
            ราคา {{ priceMergeTopping }} บาท
          </h3>
          <v-spacer></v-spacer>
          <v-btn
            class="text-uppercase ma-0"
            color="primary"
            label
            small
            @click="afterEditTopping"
          >
            ตกลง
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ["orderDatabase", "product2", "products"],

  data: () => ({
    // can be lowered with dense property.
    selectedItem: 1,
    //

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
    priceMergeTopping: 0,
    detailTopping: null
  }),
  methods: {
    editTopping(i) {
      const product = this.products.filter(
        pro => pro.product_name === this.orders[i].name
      );
      //console.log(product);
      const filterTopping = product[0].ref_cate_id.topping.filter(
        t => t.status === true
      );

      this.selected = this.orders[i].topping;
      this.detailTopping = this.orders[i].detail;
      this.productTopping.name = product[0].product_name;
      this.productTopping.topping = filterTopping;
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
      let count = 0;
      let position = [];
      this.orders[k].topping = this.selected;
      this.orders[k].detail = this.detailTopping;
      this.orders[k].price = this.orders[k].qty * this.priceMergeTopping;

      let newTopping = newOrderTopping.map(t => t.name);
      //ตรวจสอบว่าในออเดอร์มีรายการไหนตรงกับที่เราแก้ไขอยู่ไหม
      for (let i in this.orders) {
        let oldTopping = this.orders[i].topping.map(t => t.name);
        const res = newTopping.map(t => oldTopping.includes(t));
        let check = value => value === true;

        if (this.orders[i].name === this.orders[k].name) {
          if (this.orders[i].topping.length === newOrderTopping.length) {
            if (res.every(check)) {
              count++;
              //เก็บตำแหน่งรายการที่ซ้ำในออเดอร์
              position.push(i);

              //count มากกว่า 1 แสดงว่าในออเดอร์มีรายการเดียวกับที่เราแก้ไขอยู่
              if (count > 1) {
                // console.log(position);
                if (k == i) {
                  this.orders[position[1]].qty =
                    parseInt(this.orders[position[1]].qty) +
                    parseInt(this.orders[position[0]].qty);

                  this.orders[position[1]].price =
                    this.orders[position[1]].qty * this.priceMergeTopping;
                  this.orders[position[1]].topping = this.selected;
                  //console.log(count + "k>i");
                  this.orders.splice(position[0], 1);
                  setTimeout(this.totalPrice, 300);
                } else {
                  this.orders[position[0]].qty =
                    parseInt(this.orders[position[1]].qty) +
                    parseInt(this.orders[position[0]].qty);

                  this.orders[position[0]].price =
                    this.orders[position[0]].qty * this.priceMergeTopping;
                  this.orders[position[0]].topping = this.selected;
                  // console.log(count + "k<i");
                  // console.log("i :" + i + " k :" + k);
                  this.orders.splice(position[1], 1);
                  setTimeout(this.totalPrice, 300);
                }
              }
            }
          }
        }
      }

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
      this.idForEditOrder = null;
    },
    totalPrice() {
      let subTotal = 0;
      for (let j in this.orders) {
        subTotal = subTotal + parseInt(this.orders[j].price);
      }

      this.subTotal = subTotal;
    },
    formatPrice(value2) {
      const value = parseInt(value2);
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    clearOrder() {
      if (this.idForEditOrder !== null) {
        //console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee2");
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
    clearOrder2() {
      this.orders = [];
      this.subTotal = 0;
      this.bill_name = null;
      this.idForEditOrder = null;
      this.$emit("refreshUser");
    },
    async confirmOrder() {
      if (this.bill_name === null && this.orders.length >= 1) {
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
        topping: topping,
        normal_price: this.product2[i].price,
        detail: ""
      };

      for (let i in this.orders) {
        let newTopping = orderObj.topping.map(t => t._id);
        let oldTopping = this.orders[i].topping.map(t => t._id);
        const res = newTopping.map(t => oldTopping.includes(t));
        let check = value => value === true;

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
      this.orders = item.list_product;
      this.bill_name = item.bill_name;
      this.type_order = item.type_order;
      this.idForEditOrder = item._id;
      setTimeout(this.totalPrice, 200);
      this.$emit("closeHoldDl");
    },
    async addOrderToDatabase(bill_name) {
      const preOrder = {
        list_product: this.orders,
        type_order: this.type_order,
        total_price: this.subTotal,
        bill_name: bill_name
      };

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
