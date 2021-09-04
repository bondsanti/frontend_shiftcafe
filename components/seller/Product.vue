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
    <v-dialog v-model="dialogTopping" width="470">
      <v-card
        class="rounded-xl"
        style=".v-dialog:not(.v-dialog--fullscreen) {
    max-height: 100%;
}"
      >
        <v-card-title>
          <v-row>
            <v-col cols="12" sm="4" md="4" lg="4">
              <v-sheet
                color="white"
                height="80"
                width="80"
                class="rounded-circle"
              >
                <v-avatar rounded tile size="72"
                  ><img rounded src="../../assets/icons/shopping.png"
                /></v-avatar> </v-sheet
            ></v-col>
            <v-col cols="12" sm="8" md="8" lg="8">
              <p class=" ma-2 mt-3">
                เลือกท็อปปิ้ง {{ product.product_name }}
              </p></v-col
            >
          </v-row>
        </v-card-title>

        <v-checkbox
          class="ml-7  "
          color="red"
          @click="thinkPriceTopping"
          v-model="selected"
          v-for="top in filterTopping"
          :key="top._id"
          :label="top.name"
          :value="top"
        >
          <template v-slot:label>
            <p class=" mt-1">{{ top.name }}</p>
            <p class=" ml-3  mt-1">ราคา {{ top.price }}</p>
            <p class="ml-2  mt-1">บาท</p>
          </template>
        </v-checkbox>

        <v-card-actions>
          <h3 class="subheading text-uppercase pl-2 mb-4">
            ราคา {{ priceMergeTopping }} บาท
          </h3>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-btn
            class="text-uppercase ma-0"
            color="info"
            label
            small
            @click="addOrder"
          >
            ตกลง
            <v-icon right>mdi-content-save</v-icon>
          </v-btn>

          <v-btn
            small
            color="red darken-3"
            class="white--text"
            @click="dialogTopping = false"
          >
            ปิด
            <v-icon right color="white">
              mdi-close-circle
            </v-icon>
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
      if (this.product.ref_cate_id.topping) {
        this.filterTopping = this.product.ref_cate_id.topping.filter(
          t => t.status === true
        );
      } else {
        this.filterTopping = [];
      }
      //console.log(this.filterTopping);
    }
  },
  created() {
    //console.log(this.product);
    this.filterToppingTrue();
  }
};
</script>
