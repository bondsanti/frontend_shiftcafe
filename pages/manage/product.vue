<template>
  <product
    :product="product"
    :unit="unit"
    :category="category"
    @addProduct="addProduct"
    @refresh="refresh"
  />
</template>

<script>
import product from "@/components/manage/product.vue";
export default {
  middleware: ["auth", "check", "refresh"],
  async asyncData(context) {
    const [product, unit, category] = await Promise.all([
      context.$axios.$get("/product"),
      context.$axios.$get("/unit"),
      context.$axios.$get("/category")
    ]);
    //const products = await context.$axios.$get("/product");
    // console.log(category);
    return { product, unit, category };
  },
  components: {
    product
  },
  methods: {
    async addProduct(dataProduct) {
      await this.$axios.$post("/product", dataProduct);

      this.product = await this.$axios.$get("/product");
    },
    async refresh() {
      this.product = await this.$axios.$get("/product");
    }
  },
  data: () => ({
    product: []
  })
};
</script>

<style></style>
