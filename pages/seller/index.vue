<template>
  <div class="ma-3">
    <v-row>
      <v-col cols="12" sm="12" md="8">
        <v-card class=" rounded-xl pb-1 " color="#ededed" elevation="5">
          <!-- <v-row> -->
          <v-app-bar width="100%" color="white" flat>
            <v-col cols="3" sm="6" md="3" class="hidden-sm-and-down"
              ><h2>{{ cateName }}</h2></v-col
            >
            <v-col cols="12" sm="12" md="9">
              <div class="d-flex flex-row">
                <v-text-field
                  class="mr-5"
                  outlined
                  hide-details
                  filled
                  full-width
                  rounded
                  height="20"
                  dense
                  elevation="0"
                  v-model="keyword"
                  @keydown="searchProduct"
                ></v-text-field>
                <!-- </v-col> -->
                <!-- <v-col cols="1" sm="1" md="1"> -->
                <v-btn fab dark small elevation="0" @click="searchProduct">
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </div>
            </v-col>

            <!-- </v-col> -->
          </v-app-bar>
          <!-- </v-row> -->
          <v-card
            width="99.0%"
            max-height="580px"
            color="#ededed"
            flat
            class="rounded-md d-flex flex-row flex-wrap overflow-y-auto mt-4 scroll"
          >
            <Product
              v-for="(product, i) in product2"
              :key="i"
              :product="product"
              @addOrder="addOrder(i)"
            />
          </v-card>
        </v-card>
        <div class="d-flex flex-row mt-4 flex-wrap justify-start">
          <v-col cols="12" sm="6" md="4" lg="3">
            <v-card
              class="rounded-xl d-flex flex-column align-center cursor ma-1"
              elevation="0"
              color="primary"
              width="100%"
              height="80px"
              @click="allProduct"
            >
              <v-img
                class="d-flex flex-row mt-1"
                contain
                max-height="40px"
                max-width="40px"
                src="/coffee.png"
              ></v-img>
              <h2 class="d-flex flex-row white--text text-md-body-1">
                ทั้งหมด
              </h2>
            </v-card>
          </v-col>
          <Category
            v-for="cate in categories"
            :key="cate.cate_name"
            :cate="cate"
            @changPic="changCate"
          />
        </div>

        <div class="d-flex flex-row mt-4"></div>
      </v-col>
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
          <div
            class="d-flex flex-row  mt-1"
            v-for="(order, i) in orders"
            :key="i"
          >
            <v-col cols="1">
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
          </div>
          <v-spacer></v-spacer>

          <div
            class="d-flex flex-row justify-space-between mb-0 mr-4 ml-4 mt-16"
          >
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
          @click="dialog = true"
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
            <v-btn
              rounded
              large
              block
              outlined
              color="info"
              @click="confirmOrder"
              ><v-chip class="mr-4" color="info" text-color="white">
                {{ orderOnDatabase.length }}
              </v-chip>
              ออเดอร์</v-btn
            >
          </v-col>
        </div>
      </v-col>
    </v-row>
    <!-- <v-row class="justify-center">
      <v-dialog v-model="orderDl" max-width="500px" persistent>
        <v-card>
          <v-form v-model="valid" ref="form">
            <v-card-title>
              โปรดกรอกชื่อลูกค้า
            </v-card-title>
            <v-card-text>
              <v-text-field
                :rules="rules"
                autofocus
                v-model="bill_name"
                @keypress.enter="addOrderToDatabase"
              ></v-text-field>
            </v-card-text>
          </v-form>
          <v-card-actions>
            <v-btn
              color="primary"
              @click="addOrderToDatabase"
              :disabled="!valid"
            >
              บันทึกคำสั่งซื้อ
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="closeOrderDl">ปิด</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row class="justify-center">
      <v-dialog
        transition="dialog-bottom-transition"
        v-model="holdDl"
        max-width="100%"
      >
        <v-card>
          <v-toolbar color="primary" dark
            ><h3>พักการขาย/ออเดอร์</h3>
            <v-spacer></v-spacer
            ><v-btn outlined @click="holdDl = false">ปิด</v-btn></v-toolbar
          >
          <div class="d-flex flex-row mb-3 ">
            <v-col cols="3" md="3"><h3>ชื่อบิล</h3></v-col>
            <v-col cols="4" md="3" class="hidden-sm-and-down"
              ><h3>เวลา</h3></v-col
            >
            <v-col cols="4" md="1" class="hidden-sm-and-down"
              ><h3>รายการ</h3></v-col
            >
            <v-col cols="3" md="1"><h3>รวมเงิน</h3></v-col>
            <v-col cols="3" md="2"><h3>สถานะ</h3></v-col>
            <v-col cols="3" md="2"><h3>จัดการ</h3></v-col>
          </div>
          <div
            class="d-flex flex-row m-2"
            v-for="(order2, i) in orderOnDatabase"
            :key="i"
          >
            <v-col cols="3" md="3">{{ order2.bill_name }}</v-col>
            <v-col cols="4" md="3" class="hidden-sm-and-down">{{
              formatDate(order2.datetime)
            }}</v-col>
            <v-col cols="4" md="1" class="hidden-sm-and-down">{{
              order2.list_product.length
            }}</v-col>
            <v-col cols="3" md="1">{{ order2.total_price }} ฿</v-col>
            <v-col cols="3" md="2"
              ><v-chip
                width="100%"
                outlined
                :color="orderOnDatabase[i].status_cook === 0 ? 'red' : 'green'"
                ><span class="text-truncate">
                  {{
                    orderOnDatabase[i].status_cook === 0
                      ? "ยังไม่ได้สั่งทำ"
                      : "สั่งทำแล้ว"
                  }}
                </span></v-chip
              ></v-col
            >
            <v-col cols="3" md="2" class="hidden-xs-only">
              <div class="d-flex flex-row  flex-wrap justify-center">
                <v-tooltip top>
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn
                      v-on="on"
                      v-bind="attrs"
                      small
                      fab
                      class="ma-1"
                      v-show="orderOnDatabase[i].status_cook === 0"
                      ><v-icon color="indigo accent-4" @click="checkCook(i)"
                        >mdi-format-list-checks</v-icon
                      ></v-btn
                    >
                  </template>
                  <span>ตรวจสอบการสั่งทำ</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn v-bind="attrs" v-on="on" small fab class="ma-1"
                      ><v-icon color="info" @click="viewOrder(i)"
                        >mdi-eye</v-icon
                      ></v-btn
                    >
                  </template>
                  <span>ดูรายการหรือแก้ไข</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn
                      v-on="on"
                      v-bind="attrs"
                      v-show="orderOnDatabase[i].status_cook !== 0"
                      small
                      fab
                      class="ma-1"
                      @click="printorder(i)"
                      ><v-icon color="teal">mdi-printer</v-icon></v-btn
                    >
                  </template>
                  <span>สำหรับเรียกเก็บเงินลูกค้า</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn
                      v-on="on"
                      v-bind="attrs"
                      small
                      fab
                      class="ma-1"
                      @click="deleteOrderOnDatabase(i)"
                      v-show="orderOnDatabase[i].status_cook === 0"
                      ><v-icon color="red">mdi-delete</v-icon></v-btn
                    >
                  </template>
                  <span>ลบรายการสั่งซื้อ</span>
                </v-tooltip>
              </div>
            </v-col>
            <v-col cols="3" md="2" class="hidden-sm-and-up">
              <v-expansion-panels focusable small>
                <v-expansion-panel>
                  <v-expansion-panel-header
                    ><v-icon class="hidden-xs-only"
                      >mdi-menu</v-icon
                    ></v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-row class="justify-center my-1">
                      <v-btn small fab
                        ><v-icon color="info" @click="viewOrder(i)"
                          >mdi-eye</v-icon
                        ></v-btn
                      >
                    </v-row>
                    <v-row class="justify-center my-2 ">
                      <v-btn small fab @click="printorder(i)"
                        ><v-icon color="teal">mdi-printer</v-icon></v-btn
                      >
                    </v-row>
                    <v-row class="justify-center mt-1">
                      <v-btn small fab @click="deleteOrderOnDatabase(i)"
                        ><v-icon color="red">mdi-delete</v-icon></v-btn
                      >
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </div>
        </v-card>
      </v-dialog>
    </v-row> -->

    <ConfirmOrder
      :dialog="dialog"
      :orders="orders"
      :subtotal="subTotal"
      @closeDialog="dialog = false"
      :customers="customers"
      @addCus="refreshUser"
      :idOrder="idForEditOrder"
      @clearOrder="clearOrder"
      :bank2="bank"
    />
    <Cook
      :holdDl="holdDl"
      :orderOnDatabase="orderOnDatabase"
      @closeHold="holdDl = false"
      @viewOrderparent="viewOrder"
    />

    <!-- <v-dialog v-model="cook" max-width="500px">
      <v-card>
        <v-form>
          <v-card-title>
            <span class="text-h"
              ><v-icon left> mdi-note-text-outline </v-icon> หมายเลขออเดอร์ :
              {{ itemBy ? itemBy.order_no : "" }}<br /><v-icon left>
                mdi-clipboard-account </v-icon
              >พนักงานที่รับออเดอร์ :
              {{ itemBy ? itemBy.ref_emp_id.fname : "" }}
              {{ itemBy ? itemBy.ref_emp_id.lname : "" }}
              <br /><v-icon left> mdi-card-account-details-outline </v-icon
              >ชื่อบิล : {{ itemBy ? itemBy.bill_name : "" }}
            </span>
          </v-card-title>
          <v-divider class="mb-3"></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="4" class="flex-grow-0 flex-shrink-0 text-center"
                ><h4>รายการ</h4></v-col
              >
              <v-col cols="4" class="flex-grow-0 flex-shrink-0 text-center"
                ><h4>จำนวน</h4></v-col
              >
              <v-col cols="4" class="flex-grow-0 flex-shrink-0 text-center"
                ><h4>ราคา</h4></v-col
              >
            </v-row>
            <v-row
              no-gutters
              style="flex-wrap: nowrap"
              v-for="item in itemBy ? itemBy.list_product : []"
              :key="item.name"
            >
              <v-col cols="4" class="flex-grow-0 flex-shrink-0 text-left">
                {{ item.name }}
              </v-col>
              <v-col cols="4" class="flex-grow-0 flex-shrink-0 text-center">
                {{ item.qty }}
              </v-col>
              <v-col cols="4" class="flex-grow-0 flex-shrink-0 text-right">
                {{ formatPrice(item.price) }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="flex-grow-0 flex-shrink-0 text-center"
                ><h3>
                  ยอดสุทธิ
                  {{ formatPrice(itemBy ? itemBy.total_price : 0) }} บาท
                </h3>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class="mt-n3"></v-divider>
          <v-card-actions>
            <v-btn color="green" @click="checkCook2(itemBy._id)" dark>
              <v-icon left> mdi-check-bold </v-icon>ตรวจสอบและทำใบสั่งทำ
            </v-btn>
            <v-spacer></v-spacer>

            <v-btn color="error" @click="cook = false">
              <v-icon left> mdi-close </v-icon>ปิด
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog> -->
  </div>
</template>

<script>
import Product from "@/components/seller/Product.vue";
import Category from "@/components/seller/Category.vue";
import ConfirmOrder from "@/components/seller/confirmOrder.vue";
import Cook from "@/components/seller/Cook.vue";
export default {
  middleware: ["auth", "checkAll", "refresh", "checkChecker"],
  layout: "layoutCashier",
  async asyncData(context) {
    const [
      products,
      categories,
      customers,
      orderOnDatabase,
      bank
    ] = await Promise.all([
      context.$axios.$get("/product"),
      context.$axios.$get("/category"),
      context.$axios.$get("/customer2"),
      context.$axios.$get("/order-hold"),
      context.$axios.$get("/bank")
    ]);

    return {
      products,
      categories,
      product2: products,
      customers,
      orderOnDatabase,
      bank
    };
  },
  components: {
    Product,
    Category,
    ConfirmOrder,
    Cook
  },
  data: () => ({
    cateName: "Food & Drink",
    products: [],
    orders: [],
    dialog: false,
    row: null,
    value: null,
    cateId: "",
    product2: null,
    subTotal: 0,
    keyword: "",
    customers: [],
    orderDl: false,
    bill_name: null,
    type_order: "1",
    holdDl: false,
    idForEditOrder: null,
    checkStaff: false
  }),
  head() {
    return {
      title: this.cateName
    };
  },

  methods: {
    allProduct() {
      this.product2 = this.products;
      this.cateName = "ทั้งหมดทั้งมวล";
    },
    formatDate(date) {
      this.$moment().format("LLLL");
      let strdate = this.$moment(date).add(543, "years");
      return this.$moment(strdate).format("D MMMM YYYY H:mm");
    },
    changCate(cate) {
      //console.log(cate);
      this.product2 = this.products;
      //console.log(this.product2[0]);
      this.cateId = cate._id;
      this.product2 = this.product2.filter(
        pro => pro.ref_cate_id._id === this.cateId
      );
      this.cateName = cate.cate_name;
    },
    closeOrderDl() {
      this.bill_name = null;
      this.orderDl = false;
    },
    addOrder(i) {
      const orderObj = {
        ref_pro_id: this.product2[i]._id,
        name: this.product2[i].product_name,
        qty: 1,
        price: this.product2[i].price
      };

      for (let i in this.orders) {
        if (this.orders[i].name === orderObj.name) {
          this.orders[i].qty++;
          this.orders[i].price =
            parseInt(this.orders[i].price) + parseInt(orderObj.price);
          setTimeout(this.totalPrice, 300);
          return;
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
      this.orders[i].qty++;
      this.orders[i].price =
        parseInt(this.orders[i].price) + parseInt(product[0].price);
      setTimeout(this.totalPrice, 300);
    },
    deleteQty(i) {
      const product = this.products.filter(
        pro => pro.product_name === this.orders[i].name
      );
      if (this.orders[i].qty !== 1) {
        this.orders[i].qty--;
        this.orders[i].price =
          parseInt(this.orders[i].price) - parseInt(product[0].price);
      }
      setTimeout(this.totalPrice, 300);
    },
    totalPrice() {
      let subTotal = 0;
      for (let j in this.orders) {
        subTotal = subTotal + parseInt(this.orders[j].price);
      }
      //console.log(subTotal);
      this.subTotal = subTotal;
    },
    clearOrder() {
      if (this.idForEditOrder !== null) {
        this.$axios.$delete("/order/" + this.idForEditOrder).then(() => {
          this.orders = [];
          this.subTotal = 0;
          this.bill_name = null;
          this.idForEditOrder = null;
          this.refreshUser();
        });
      } else {
        this.orders = [];
        this.subTotal = 0;
        this.bill_name = null;
        this.idForEditOrder = null;
        this.refreshUser();
      }
    },
    searchProduct() {
      this.product2 = [];
      for (let j in this.products) {
        if (this.products[j].product_name.includes(this.keyword)) {
          this.product2.push(this.products[j]);
        }
      }
    },
    formatPrice(value2) {
      const value = parseInt(value2);
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async refreshUser() {
      this.customers = await this.$axios.$get("/customer2");
      this.orderOnDatabase = await this.$axios.$get("/order-hold");
    },
    async addOrderToDatabase() {
      const preOrder = {
        list_product: this.orders,
        type_order: this.type_order,
        total_price: this.subTotal,
        bill_name: this.bill_name
      };
      //console.log(preOrder);
      const res = await this.$axios.post("/order", preOrder);
      if (res.status === 200) {
        //this.refreshUser();
        this.orderOnDatabase = await this.$axios.$get("/order-hold");
        this.orders = [];
        this.subTotal = 0;
        this.bill_name = null;
        this.orderDl = false;
      } else {
        alert(res.data.message);
      }
    },
    async confirmOrder() {
      if (this.bill_name === null && this.orders.length >= 1) {
        //this.$refs.form.validate();
        this.orderDl = true;
      } else if (this.bill_name !== null || this.orders.length === 0) {
        if (this.idForEditOrder) {
          this.$axios
            .$put("/order/" + this.idForEditOrder, {
              list_product: this.orders,
              type_order: this.type_order,
              total_price: this.subTotal,
              bill_name: this.bill_name
            })
            .then(() => {
              this.holdDl = true;
              this.bill_name = null;
              this.orders = [];
              this.subTotal = 0;
              this.idForEditOrder = null;
            });
        } else {
          this.holdDl = true;
        }
      }
    },
    viewOrder(item) {
      // console.log(this.orderOnDatabase[i]);
      this.orders = item.list_product;
      this.bill_name = item.bill_name;
      this.type_order = item.type_order;
      this.idForEditOrder = item._id;
      setTimeout(this.totalPrice, 200);
      this.holdDl = false;
      //console.log(this.orderOnDatabase[i]);
    },
    checkCook(i) {
      this.itemBy = this.orderOnDatabase[i];
      //console.log(this.itemBy);
      this.cook = true;
    },
    checkCook2(id) {
      const preOrder = {
        list_product: this.itemBy.list_product,
        type_order: this.itemBy.type_order,
        total_price: this.itemBy.total_price,
        bill_name: this.itemBy.bill_name,
        status_cook: 1
      };
      this.$axios.$put("/order/" + id, preOrder).then(() => {
        for (let i in this.orderOnDatabase) {
          if (id === this.orderOnDatabase[i]._id) {
            this.orderOnDatabase[i].status_cook = 1;
          }
        }
        this.cook = false;
        this.itemBy = null;
      });
    },
    deleteOrderOnDatabase(i) {
      this.$axios.$delete("/order/" + this.orderOnDatabase[i]._id).then(() => {
        this.orderOnDatabase.splice(i, 1);
        this.bill_name = null;
      });
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

<style>
.scroll::-webkit-scrollbar {
  width: 17px;
}
.scroll::-webkit-scrollbar-track {
  background: #ededed;
  border-left: 1px solid #ededed;
  border-radius: 10px;
}
.scroll::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}
.scroll::-webkit-scrollbar-thumb:hover {
  background: black;
}
.cursor {
  cursor: pointer;
}
</style>
