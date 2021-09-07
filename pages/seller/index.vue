<template>
  <div class="ma-3">
    <v-row>
      <!-- <v-col cols="12" sm="12" md="4">
        <Listorder
          :orderDatabase="orderOnDatabase"
          :product2="product2"
          :products="products"
          ref="listChild"
          @openHoldDl="holdDl = true"
          @closeHoldDl="holdDl = false"
          @openOrderDl="orderDl = true"
          @closeOrderDl="orderDl = false"
          @refreshUser="refreshUser"
          @openDialog="openDialog"
        />
      </v-col> -->
      <v-col cols="12" sm="12" md="8">
        <v-card class=" rounded-xl pb-1 " color="#ededed" elevation="2">
          <!-- <v-row> -->
          <v-app-bar width="100%" color="white" flat>
            <v-col cols="3" sm="6" md="3" class="hidden-sm-and-down "
              ><h2 class="font-weight-black">{{ cateName }}</h2></v-col
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
            width="100.0%"
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
              @addTopping="addTopping"
            />
          </v-card>
        </v-card>
        <div class="d-flex flex-row mt-4 flex-wrap justify-start">
          <v-col cols="12" class="hidden-md-and-up">
            <v-app-bar color="primary" dense dark class="rounded-xl">
              <v-spacer></v-spacer>
              <v-menu center bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-menu</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item @click="allProduct">
                    <v-list-item-title class="pa-1"> ทั้งหมด</v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    v-for="(cate, i) in categories"
                    :key="i"
                    @click="changCate(cate)"
                  >
                    <v-list-item-title class="pa-1">
                      {{ cate.cate_name }}</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-toolbar-title>หมวดหมู่</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-app-bar>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3" class="hidden-sm-and-down">
            <v-card
              class="rounded-xl d-flex flex-column align-center cursor ma-1"
              elevation="24"
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
        <Listorder
          :orderDatabase="orderOnDatabase"
          :product2="product2"
          :products="products"
          ref="listChild"
          @openHoldDl="holdDl = true"
          @closeHoldDl="holdDl = false"
          @openOrderDl="orderDl = true"
          @closeOrderDl="orderDl = false"
          @refreshUser="refreshUser"
          @openDialog="openDialog"
        />
      </v-col>
    </v-row>

    <ConfirmOrder
      :dialog="dialog"
      :orders="dataFromList.orders"
      :subtotal="dataFromList.subTotal"
      :lodDai="dataFromList.lodDai"
      :lodBorDai="dataFromList.lodBorDai"
      @closeDialog="dialog = false"
      @addCus="refreshUser"
      :idOrder="dataFromList.idOrder"
      @clearOrder="clearOrder"
      @clearOrder2="clearOrder2"
      :bank2="bank"
      :couponParent="coupon"
      :printOrder="true"
      :unit="unit"
      :products="products"
    />
    <Cook
      :products="products"
      :unit="unit"
      :holdDl="holdDl"
      :orderDl="orderDl"
      :orderOnDatabase="orderOnDatabase"
      @closeHold="holdDl = false"
      @closeOrderDl="orderDl = false"
      @viewOrderparent="viewOrder"
      @addOrderToDatabase="addOrderToDatabase"
      @deleteOrderOnDatabase="deleteOrderOnDatabase"
      @refreshUser="refreshUser"
    />
  </div>
</template>

<script>
import Product from "@/components/seller/Product.vue";
import Category from "@/components/seller/Category.vue";
import ConfirmOrder from "@/components/seller/confirmOrder.vue";
import Cook from "@/components/seller/Cook.vue";
import Listorder from "@/components/seller/Listorder.vue";
export default {
  middleware: ["auth", "checkAll", "refresh", "checkChecker"],
  layout: "layoutCashier",
  async asyncData(context) {
    const [
      products,
      categories,
      customers,
      orderOnDatabase,
      bank,
      coupon,
      unit
    ] = await Promise.all([
      context.$axios.$get("/product"),
      context.$axios.$get("/category"),
      context.$axios.$get("/customer2"),
      context.$axios.$get("/order-hold"),
      context.$axios.$get("/bank"),
      context.$axios.$get("/coupon"),
      context.$axios.$get("/unit")
    ]);

    return {
      products,
      categories,
      product2: products,
      customers,
      orderOnDatabase,
      bank,
      coupon,
      unit
    };
  },
  components: {
    Product,
    Category,
    ConfirmOrder,
    Cook,
    Listorder
  },
  data: () => ({
    cateName: "Food & Drink",
    products: [],
    dialog: false,
    row: null,
    value: null,
    cateId: "",
    product2: null,
    keyword: "",
    customers: [],
    orderDl: false,
    holdDl: false,
    checkStaff: false,
    dataFromList: {
      orders: [],
      idOrder: null,
      subTotal: 0,
      lodDai: 0,
      lodBorDai: 0
    },
    topping: []
  }),
  head() {
    return {
      titleTemplate: `${this.$store.getters["setting"][0].head_title}  | %s`,
      title: this.cateName,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$store.getters["setting"][0].sub_title
        }
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: `${this.$nuxt.context.env.config.IMG_URL}${this.$store.getters["setting"][0].logo}`
        }
      ]
    };
  },

  methods: {
    openDialog(confirmObj) {
      this.dataFromList = confirmObj;
      this.dialog = true;
      //console.log(confirmObj);
    },
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
      this.product2 = this.products;
      //console.log(this.product2[0]);
      this.cateId = cate._id;

      this.product2 = this.product2.filter(pro => {
        if (pro.ref_cate_id) return pro.ref_cate_id._id === this.cateId;
      });

      //console.log(this.product2);

      this.cateName = cate.cate_name;
    },
    // closeOrderDl() {
    //   this.bill_name = null;
    //   this.orderDl = false;
    // },
    addOrder(i) {
      this.$refs.listChild.addOrder(i, this.topping);
      //console.log(`index : ${i} `);
    },
    addTopping(topping) {
      this.topping = topping;
      //console.log(` topping : ${topping}`);
    },
    searchProduct() {
      this.product2 = [];
      for (let j in this.products) {
        if (this.products[j].product_name.includes(this.keyword)) {
          this.product2.push(this.products[j]);
        }
      }
    },

    async refreshUser() {
      this.customers = await this.$axios.$get("/customer2");
      this.orderOnDatabase = await this.$axios.$get("/order-hold");
    },
    addOrderToDatabase(bill_name) {
      this.$refs.listChild.addOrderToDatabase(bill_name);
    },

    viewOrder(item) {
      this.$refs.listChild.viewOrder(item);
    },

    deleteOrderOnDatabase(i) {
      //console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee3");
      this.$axios.$delete("/order/" + this.orderOnDatabase[i]._id).then(() => {
        this.orderOnDatabase.splice(i, 1);
        // this.bill_name = null;
      });
    },
    clearOrder() {
      this.$refs.listChild.clearOrder();
    },
    clearOrder2() {
      this.$refs.listChild.clearOrder2();
    }
  },

  created() {}
};
</script>

<style scoped>
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
