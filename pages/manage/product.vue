<template>
  <product :products="products" />
</template>

<script>
import product from "@/components/manage/product.vue";
export default {
  async asyncData(context) {
    const products = await context.$axios.$get("/product");

    console.log(products);
    return { products };
  },
  components: {
    product
  }
};
</script>

<style></style>
