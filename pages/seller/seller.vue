<template>
  <v-container style="background-color:#ededed;height:100%" fluid>
    <v-col cols="8">
      <v-card class=" rounded-xl pb-1 " color="#ededed" elevation="5">
        <v-app-bar class="rounded-xl" width="100%" color="white" flat>
          <v-row>
            <v-col cols="0" sm="0" md="6"> </v-col>
            <v-col cols="11" sm="11" md="5">
              <v-text-field
                outlined
                hide-details
                filled
                rounded
                height="20"
                dense
                elevation="0"
              ></v-text-field>
            </v-col>
            <v-col cols="1" sm="1" md="1">
              <v-btn fab dark small flat elevation="0">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-app-bar>

        <v-card
          width="99.0%"
          max-height="580px"
          color="#ededed"
          flat
          class="rounded-md d-flex flex-row flex-wrap overflow-y-auto mt-4 scroll"
        >
          <v-col cols="6" sm="6" md="4" lg="3" v-for="n in 12" :key="n">
            <v-card
              class="mx-auto rounded-xl"
              color="grey lighten-4"
              max-width="600"
            >
              <v-img
                :aspect-ratio="16 / 9"
                src="https://images.unsplash.com/photo-1587080413959-06b859fb107d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y29mZmVlJTIwY3VwfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              >
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
          </v-col>
        </v-card>
      </v-card>
      <div class="d-flex flex-row mt-4">
        <v-btn color="black" large>
          <v-img height="30px" width="10px" src="/coffee.png"></v-img>
        </v-btn>
      </div>
    </v-col>
    <v-col cols="4"></v-col>
  </v-container>
</template>

<script>
import milkShake from "@/assets/milkshake.svg";
export default {
  components: {
    milkShake
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
</style>
