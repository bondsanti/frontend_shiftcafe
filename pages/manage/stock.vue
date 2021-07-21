
<template>
  <stock :stock="stock"  :product="product"  @addStock="addStock" />
</template>

<script>
import stock from "@/components/manage/stock.vue";
export default {
  middleware: ["auth", "check"],
    head: {
        title: 'สต๊อก'
    },
  async asyncData(context) {
    const [stock, product] = await Promise.all([
      context.$axios.$get("/stock"),
      context.$axios.$get("/product"),
    ]);
    //const products = await context.$axios.$get("/product");
    //console.log(product);
    return { stock, product,};
  },
  components: {
    stock
  },
  methods: {
    async addStock(stock) {
      await this.$axios.$post("/stock", stock);
      this.stock = await this.$axios.$get("/stock");
    }
  },
  data: () => ({
    stock: []
  })
};
</script>

<style></style>
