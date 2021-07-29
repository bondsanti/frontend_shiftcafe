<template>
  <Payment :historyOrder="orders" />
</template>

<script>
import Payment from "@/components/seller/Payment.vue";
export default {
  head: {
    title: "ใบสั่งซื้อ"
  },
  middleware: ["auth", "checkAll", "refresh", "checkChecker"],
  async asyncData(context) {
    const [orders] = await Promise.all([context.$axios.$get("/order")]);
    //const products = await context.$axios.$get("/product");
    //console.log(product);
    return { orders };
  },
  components: {
    Payment
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
