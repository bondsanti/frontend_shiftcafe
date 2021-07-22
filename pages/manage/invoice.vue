<template>
  <Invoice :historyInvoice="invoices" />
</template>

<script>
import Invoice from "@/components/seller/Invoice.vue";
export default {
  head: {
    title: "Invoice"
  },
  middleware: ["auth", "checkAll", "refresh"],
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
