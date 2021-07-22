<template>
  <Invoice :historyInvoice="invoices" />
</template>

<script>
import Invoice from "@/components/manage/Invoice.vue";
export default {
  middleware: ["auth", "checkAll", "refresh"],
    head: {
    title: "ใบสั่งชื้อ"
  },
  async asyncData(context) {
    const [invoices] = await Promise.all([context.$axios.$get("/payment")]);
    //const products = await context.$axios.$get("/product");
    //console.log(product);
    return { invoices };
  },
  components: {
    Invoice
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
