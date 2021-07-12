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
            <v-col cols="6" sm="6" md="4" lg="3" v-for="n in 12" :key="n">
              <v-card
                class=" rounded-xl cursor"
                color="grey lighten-4"
                max-width="600"
                @click="addOrder"
              >
                <v-img height="150px" :aspect-ratio="16 / 9" :src="pic">
                </v-img>
                <v-card-text class="pt-6 pa-0" style="position: relative;">
                  <div class="font-weight primary--text text-h6  text-center">
                    coffee
                  </div>
                  <h3 class="text-h5 font-weight-bold info--text  text-center">
                    10.00
                  </h3>
                </v-card-text>
              </v-card>
            </v-col>
          </v-card>
        </v-card>
        <div class="d-flex flex-row mt-4 flex-wrap justify-space-between">
          <v-card
            class="rounded-xl d-flex flex-column align-center   cursor ma-1"
            elevation="0"
            color="primary"
            width="200px"
            height="80px"
            v-for="cate in category"
            :key="cate.name"
            @click="changPic(cate)"
          >
            <v-img
              class="d-flex flex-row mt-1"
              contain
              max-height="40px"
              max-width="40px"
              src="/coffee.png"
            ></v-img>
            <h2 class="d-flex flex-row white--text">{{ cate.name }}</h2>
          </v-card>
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
          <div class="d-flex flex-row justify-space-between ml-15 mt-2">
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
            class="d-flex flex-row justify-space-around mt-5"
            v-for="i in orders"
            :key="i"
          >
            <div class="d-flex flex-row ">
              <v-btn fab class="mr-4" small @click="deleteOrder">
                <v-icon color="red" size="25px">mdi-trash-can-outline</v-icon>
              </v-btn>
              <h3>{{ cateName }}</h3>
            </div>
            <div class="d-flex flex-row ">
              <v-icon class="cursor" size="30px"
                >mdi-minus-circle-outline</v-icon
              >
              <h3 class="mr-6 ml-6">4</h3>
              <v-icon size="30px" class="mr-4 cursor"
                >mdi-plus-circle-outline</v-icon
              >
            </div>
            <h3 class="d-flex flex-column">2,300.00</h3>
          </div>
          <v-spacer></v-spacer>
          <div
            class="d-flex flex-row justify-space-between mr-4 ml-4 mb-1 mt-10"
          >
            <h3 class="d-flex flex-column">Discount (%)</h3>
            <h3 class="d-flex flex-column">200000</h3>
          </div>
          <div
            class="d-flex flex-row justify-space-between mr-4 ml-4 mb-1 mt-0"
          >
            <h3 class="d-flex flex-column">Sub Total</h3>
            <h3 class="d-flex flex-column">200000</h3>
          </div>
          <div
            class="d-flex flex-row justify-space-between mr-4 ml-4 mb-6 mt-0"
          >
            <h3 class="d-flex flex-column">Tax (%)</h3>
            <h3 class="d-flex flex-column">200000</h3>
          </div>
          <div
            class="d-flex flex-row justify-space-between mb-4 mr-4 ml-4 mt-0"
          >
            <h2 class="d-flex flex-column">Total</h2>
            <h2 class="d-flex flex-column info--text">200000</h2>
          </div>
        </v-card>
        <v-btn class="mt-5" rounded x-large block color="info"
          >Pay (2,000)</v-btn
        >
        <v-row class="mt-2">
          <v-col cols="6">
            <v-btn rounded large block outlined color="red">Cancel Order</v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn rounded large block outlined color="info">Hold Order</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import milkShake from "@/assets/milkshake.svg";
export default {
  components: {
    milkShake
  },
  data: () => ({
    category: [
      {
        name: "Coffee",
        img:
          "https://images.unsplash.com/photo-1593829111182-8a237d2bb024?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTh8fGNvZmZlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        name: "Drink",
        img:
          "https://images.unsplash.com/photo-1527661591475-527312dd65f5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZHJpbmt8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        name: "Dessert",
        img:
          "https://images.unsplash.com/photo-1587314168485-3236d6710814?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZGVzc2VydHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        name: "Bakery",
        img:
          "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YmFrZXJ5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        name: "Alcohol",
        img:
          "https://images.unsplash.com/photo-1566666152520-27af5f022a0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YWxjb2hvbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      }
    ],
    pic:
      "https://images.unsplash.com/photo-1593829111182-8a237d2bb024?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTh8fGNvZmZlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cateName: "Coffee",
    orders: []
  }),
  head() {
    return {
      title: this.cateName
    };
  },
  methods: {
    changPic(cate) {
      this.pic = cate.img;
      this.cateName = cate.name;
    },
    addOrder() {
      this.orders.push(this.orders.length + 1);
    },
    deleteOrder() {
      this.orders.pop();
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
