<template>
  <v-col cols="6" sm="6" md="4" lg="3">
    <v-card
      class=" rounded-xl cursor"
      color="grey lighten-4"
      max-width="600"
      @click="addTopping"
    >
      <v-img
        height="150px"
        contain
        :aspect-ratio="16 / 9"
        :src="$nuxt.context.env.config.IMG_URL + product.img"
      >
      </v-img>
      <v-card-text class="pt-6 pa-0" style="position: relative;">
        <div class="font-weight primary--text text-h6  text-center">
          {{ product.product_name }}
        </div>

        <h3 class="text-h5 font-weight-bold info--text  text-center">
          {{ product.price }} ฿
        </h3>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialogTopping" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          เลือก TOPPING {{ product.product_name }}
        </v-card-title>

        <v-sheet class="pl-7">
          <p>{{ selected }}</p>
          <v-checkbox
            @click="thinkPriceTopping"
            v-model="selected"
            v-for="top in product.topping"
            :key="top._id"
            :label="top.name"
            :value="top"
          ></v-checkbox>
        </v-sheet>

        <v-divider></v-divider>

        <v-card-actions>
          <h1>ราคา {{ priceMergeTopping }} บาท</h1>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="addOrder">
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
    priceMergeTopping: 0
  }),
  methods: {
    addTopping() {
      this.priceMergeTopping = this.product.price;
      this.dialogTopping = true;
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
    }
  },
  created() {}
};
</script>

<style></style>
