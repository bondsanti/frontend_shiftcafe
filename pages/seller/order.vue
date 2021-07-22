<template>
  <Order :historyOrder="orders" />
</template>

<script>
import Order from "@/components/seller/Order.vue";
export default {
  layout: "layoutCashier",
  middleware: ["auth", "checkAll", "refresh"],
  async asyncData(context) {
    const [orders] = await Promise.all([context.$axios.$get("/order")]);
    //const products = await context.$axios.$get("/product");
    //console.log(product);
    return { orders };
  },
  components: {
    Order
  },
  methods: {
    // async addStock(stock) {
    //   await this.$axios.$post("/stock", stock);
    //   this.stock = await this.$axios.$get("/stock");
    // }
  },
  data: () => ({
    //stock: []
  })
};
</script>

<style></style>
