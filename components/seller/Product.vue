<template>
  <v-col cols="6" sm="6" md="4" lg="3">
    <v-card
      class=" rounded-xl cursor"
      color="grey lighten-4"
      max-width="600"
      @click="addOrder"
    >
      <v-img
        height="150px"
        contain
        :aspect-ratio="16 / 9"
        :src="'http://localhost:5555/' + product.img"
      >
      </v-img>
      <v-card-text class="pt-6 pa-0" style="position: relative;">
        <div class="font-weight primary--text text-h6  text-center">
          {{ product.product_name }}
        </div>
        <h3 class="text-h5 font-weight-bold info--text  text-center">
          {{ product.price }}
        </h3>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: ["product"],
  methods: {
    addOrder() {
      this.$emit("addOrder", this.product);
    }
  }
};
</script>

<style></style>