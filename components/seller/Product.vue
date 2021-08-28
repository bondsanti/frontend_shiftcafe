<template>
  <v-col cols="6" sm="6" md="4" lg="3" style="padding: 6px;">
    <v-card
      class=" rounded-xl cursor"
      color="grey lighten-4"
      max-width="600"
      @click="addTopping"
    >
      <v-img
        height="100%"
        contain
        :aspect-ratio="16 / 9"
        :src="$nuxt.context.env.config.IMG_URL + product.img"
      >
      </v-img>
      <v-card-text class="pt-6 pa-0" style="position: relative;">
        <div
          :class="[$vuetify.breakpoint.smAndDown ? 'text-h6' : 'text-h5']"
          class="font-weight-Dark primary--text  text-center"
        >
          {{ product.product_name }}
        </div>

        <h3 class="text-h5 font-weight-bold info--text  text-center">
          {{ product.price }} ฿
        </h3>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialogTopping" width="450">
      <v-card class="rounded-xl">
        <v-card-title>
          <v-row>
            <v-col cols="12" sm="4" md="4" lg="4">
              <v-sheet
                color="white"
                height="80"
                width="80"
                class="rounded-circle"
              >
                <v-img :src="$nuxt.context.env.config.IMG_URL + product.img">
                </v-img> </v-sheet
            ></v-col>
            <v-col cols="12" sm="8" md="8" lg="8">
              <p class=" ma-2 mt-6">
                เลือกท็อปปิ้ง {{ product.product_name }}
              </p></v-col
            >
          </v-row>
        </v-card-title>
        <!-- <v-divider></v-divider> -->
        <!-- <v-sheet class="pl-7 ">
          <v-checkbox
            class="caption"
            color="red"
            @click="thinkPriceTopping"
            v-model="selected"
            v-for="top in filterTopping"
            :key="top._id"
            :label="top.name"
            :value="top"
          ></v-checkbox>
        </v-sheet> -->
        <!--  -->

        <v-list>
          <v-list-item-group v-model="selected" multiple>
            <template v-for="top in filterTopping">
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

        <!--  -->
        <!-- <v-divider></v-divider> -->

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
            @click="addOrder"
          >
            ตกลง
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
export default {
  props: ["product"],
  data: () => ({
    dialogTopping: false,
    selected: [],
    priceMergeTopping: 0,
    filterTopping: []
  }),
  methods: {
    addTopping() {
      this.filterToppingTrue();
      if (this.product.ref_cate_id.topping.length !== 0) {
        this.priceMergeTopping = this.product.price;
        this.dialogTopping = true;
      } else {
        this.addOrder();
      }
    },
    addOrder() {
      this.$emit("addTopping", this.selected);
      this.$emit("addOrder");
      this.dialogTopping = false;
      this.selected = [];
    },
    thinkPriceTopping() {
      this.priceMergeTopping = this.product.price;
      let toppingPrice = 0;
      this.selected.map(s => {
        toppingPrice += s.price;
      });
      this.priceMergeTopping =
        parseInt(this.priceMergeTopping) + parseInt(toppingPrice);
    },
    filterToppingTrue() {
      this.filterTopping = this.product.ref_cate_id.topping.filter(
        t => t.status === true
      );
      //console.log(this.filterTopping);
    }
  },
  created() {
    //console.log(this.product);
    this.filterToppingTrue();
  }
};
</script>

<style></style>
