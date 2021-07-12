<template>
  <div class="ma-3">
    <v-row>
      <v-col cols="12" sm="12" md="8">
        <v-card class=" rounded-xl pb-1 " color="#ededed" elevation="5">
          <!-- <v-row> -->
          <v-app-bar width="100%" color="white" flat>
            <v-col cols="6" sm="6" md="3"
              ><h2>{{ cateName }}</h2></v-col
            >
            <v-col cols="6" sm="6" md="9">
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
                ></v-text-field>
                <!-- </v-col> -->
                <!-- <v-col cols="1" sm="1" md="1"> -->
                <v-btn fab dark small elevation="0">
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
              v-for="product in product2"
              :key="product._id"
              :product="product"
              @addOrder="addOrder"
            />
          </v-card>
        </v-card>
        <div class="d-flex flex-row mt-4 flex-wrap justify-start">
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
          <h1>ORDER</h1>
        </v-card>
        <v-card
          class="rounded-xl d-flex flex-column mt-3"
          height="auto"
          elevation="5"
        >
          <div class="d-flex flex-row justify-space-between ml-15 mt-2 mb-5">
            <h3 class="d-flex flex-column mr-0">NAME</h3>
            |
            <h3 class="d-flex flex-column">
              QUANTITY
            </h3>
            |
            <h3 class="d-flex flex-column mr-15">PRICE</h3>
          </div>
          <!-- <v-divider></v-divider> -->
          <div
            class="d-flex flex-row  mt-1"
            v-for="(order, i) in orders"
            :key="i"
          >
            <v-col cols="1">
              <v-icon class="mr-4" @click="deleteOrder(i)" size="30px"
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
            class="d-flex flex-row justify-space-between mr-4 ml-4 mb-1 mt-10"
          >
            <h3 class="d-flex flex-column">Discount (%)</h3>
            <h3 class="d-flex flex-column">0</h3>
          </div>
          <div
            class="d-flex flex-row justify-space-between mr-4 ml-4 mb-1 mt-0"
          >
            <h3 class="d-flex flex-column">Sub Total</h3>
            <h3 class="d-flex flex-column">{{ subTotal }}</h3>
          </div>
          <div
            class="d-flex flex-row justify-space-between mr-4 ml-4 mb-6 mt-0"
          >
            <h3 class="d-flex flex-column">Tax (%)</h3>
            <h3 class="d-flex flex-column">7</h3>
          </div>
          <div
            class="d-flex flex-row justify-space-between mb-4 mr-4 ml-4 mt-0"
          >
            <h2 class="d-flex flex-column">Total</h2>
            <h2 class="d-flex flex-column info--text">{{ subTotal }}</h2>
          </div>
        </v-card>
        <v-btn
          class="mt-5"
          rounded
          x-large
          block
          color="info"
          @click="dialog = true"
          >Pay ({{ subTotal }})</v-btn
        >
        <v-row class="mt-2">
          <v-col cols="6">
            <v-btn rounded large block outlined color="red" @click="clearOrder"
              >Cancel Order</v-btn
            >
          </v-col>
          <v-col cols="6">
            <v-btn rounded large block outlined color="info">Hold Order</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>ยืนยันการชำระเงิน</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="dialog = false">
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
                    <v-radio-group v-model="row" row>
                      <v-radio label="ทั่วไป" value="guest"></v-radio>
                      <v-radio label="สมาชิก" value="member"></v-radio>
                    </v-radio-group>
                  </v-row>
                  <v-autocomplete
                    v-model="value"
                    chips
                    clearable
                    label="ค้นหาข้อมูลลูกค้า"
                    :items="items"
                    v-if="row === 'member'"
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row class="ma-3" align="center">
                <h2 class="d-flex mr-5">ประเภทการสั่งอาหาร</h2>
                <v-radio-group v-model="row" row class="d-flex">
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
                    <v-radio-group v-model="row" row>
                      <v-radio label="เงินสด" value="guest"></v-radio>
                      <v-radio label="โอนผ่านธนาคาร" value="member"></v-radio>
                    </v-radio-group>
                  </v-row>
                  <v-autocomplete
                    v-model="value"
                    chips
                    clearable
                    label="เลือกธนาคาร"
                    :items="items"
                    v-if="row === 'member'"
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <v-row class="ma-3" align="center">
                <h2 class="d-flex mr-5">การชำระเงิน</h2>
                <v-radio-group v-model="row" row class="d-flex">
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
                  <v-btn rounded large block color="info"
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
                <h2>{{ subTotal }}</h2>
              </v-row>
              <v-row class="justify-space-between ma-1 mx-16 ">
                <h2>ภาษี</h2>
                <h2>5</h2>
              </v-row>
              <v-row class="justify-space-between ma-1 mx-16 ">
                <h2>ราคาสุทธิ</h2>
                <h2>{{ subTotal }}</h2>
              </v-row>
            </v-col>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import Product from "@/components/seller/Product.vue";
import Category from "@/components/seller/Category.vue";

export default {
  async asyncData(context) {
    const [products, categories] = await Promise.all([
      context.$axios.$get("/product"),
      context.$axios.$get("/category")
    ]);
    //const products = await context.$axios.$get("/product");
    //console.log(products);
    //console.log(categories);
    return { products, categories, product2: products };
  },
  components: {
    Product,
    Category
  },
  data: () => ({
    cateName: "Coffee",
    orders: [],
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    items: ["foo", "bar", "fizz", "buzz"],
    row: null,
    value: null,
    cateId: "",
    product2: null,
    subTotal: 0
  }),
  head() {
    return {
      title: this.cateName
    };
  },
  methods: {
    changCate(cate) {
      this.product2 = this.products;
      this.cateId = cate._id;
      this.product2 = this.product2.filter(
        pro => pro.ref_cate_id._id == this.cateId
      );
      this.cateName = cate.cate_name;
    },
    addOrder(product) {
      const orderObj = {
        name: product.product_name,
        qty: 1,
        price: product.price
      };

      for (let i in this.orders) {
        if (this.orders[i].name === orderObj.name) {
          this.orders[i].qty++;
          this.orders[i].price =
            parseInt(this.orders[i].price) + parseInt(orderObj.price);
          setTimeout(this.totalPrice, 500);
          return;
        }
      }
      this.orders.push(orderObj);
      setTimeout(this.totalPrice, 500);
    },
    deleteOrder(i) {
      this.orders.splice(i, 1);
      setTimeout(this.totalPrice, 500);
    },
    addQty(i) {
      const product = this.products.filter(
        pro => pro.product_name === this.orders[i].name
      );
      this.orders[i].qty++;
      this.orders[i].price =
        parseInt(this.orders[i].price) + parseInt(product[0].price);
      setTimeout(this.totalPrice, 500);
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
      setTimeout(this.totalPrice, 500);
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
      this.orders = [];
      this.subTotal = 0;
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
