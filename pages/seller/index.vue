<template>
  <v-row class="ma-3">
    <v-col cols="8" sm="12" md="8">
      <v-row>
        <v-card class="rounded-xl" width="100%">
          <v-text-field
            filled
            dense
            rounded
            label="Search"
            prepend-inner-icon="mdi-home"
            class="mt-6 mr-2"
            sm="2"
          ></v-text-field>
        </v-card>
      </v-row>
      <v-row>
        <v-col
          cols="6"
          sm="6"
          md="4"
          lg="3"
          v-for="n in 8"
          :key="n"
          class="d-flex child-flex"
        >
          <v-hover v-slot="{ hover }">
            <v-card class="mx-auto" color="grey lighten-4" max-width="600">
              <v-img
                :aspect-ratio="16 / 9"
                src="https://images.unsplash.com/photo-1587080413959-06b859fb107d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y29mZmVlJTIwY3VwfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              >
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out black v-card--reveal text-h2 white--text"
                    style="height: 100%;"
                  >
                    $14.99
                  </div>
                </v-expand-transition>
              </v-img>
              <v-card-text class="pt-6" style="position: relative;">
                <v-btn
                  absolute
                  color="black"
                  class="white--text"
                  fab
                  large
                  right
                  top
                >
                  <v-icon>mdi-cart</v-icon>
                </v-btn>
                <div class="font-weight-light grey--text text-h6 mb-2">
                  For the perfect meal
                </div>
                <h3 class="text-h4 font-weight-light black--text mb-2">
                  Coffee
                </h3>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="4">
      <v-row>
        <v-card height="85%" width="100%" class="rounded-xl">
          <v-col>
            <v-row class="ma-2">
              <v-col align="center" cols="6">name</v-col>
              <v-col align="center" cols="3">QTY</v-col>
              <v-col align="center" cols="3">Price</v-col>
            </v-row>
            <v-row>
              <v-col align="center" cols="6"
                ><v-icon left>mdi-trash-can-outline</v-icon> Cappucino</v-col
              >
              <v-col align="center" cols="3"
                ><v-icon left>mdi-plus-circle-outline</v-icon>3<v-icon right
                  >mdi-plus-circle-outline</v-icon
                ></v-col
              >
              <v-col align="center" cols="3">1230 บาท</v-col>
            </v-row>
            <v-row>
              <v-col align="center" cols="6"
                ><v-icon left>mdi-trash-can-outline</v-icon> Cappucino</v-col
              >
              <v-col align="center" cols="3"
                ><v-icon left>mdi-plus-circle-outline</v-icon>3<v-icon right
                  >mdi-plus-circle-outline</v-icon
                ></v-col
              >
              <v-col align="center" cols="3">1230 บาท</v-col>
            </v-row>
            <v-row>
              <v-col align="center" cols="6"
                ><v-icon left>mdi-trash-can-outline</v-icon> Cappucino</v-col
              >
              <v-col align="center" cols="3"
                ><v-icon left>mdi-plus-circle-outline</v-icon>3<v-icon right
                  >mdi-plus-circle-outline</v-icon
                ></v-col
              >
              <v-col align="center" cols="3">1230 บาท</v-col>
            </v-row>
            <v-row class="ma-2 mt-16" align="end">
              <v-col align="start" cols="6"> Discount (%)</v-col>
              <v-col align="end" cols="6">200</v-col>
            </v-row>
          </v-col>
        </v-card>
      </v-row>
      <v-row class="mt-5">
        <v-btn block color="black" class="rounded-xl" dark height="60px"
          >PAY</v-btn
        >
      </v-row>
    </v-col>
  </v-row>
</template>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 1;
  position: absolute;
  width: 100%;
}
</style>
