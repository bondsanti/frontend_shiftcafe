<template>
  <Order :historyOrder="orders" />
</template>

<script>
import Order from "@/components/seller/Order.vue";
export default {
  layout: "layoutCashier",
  head() {
    return {
      titleTemplate: `${this.$store.getters["setting"][0].head_title}  | %s`,
      title: "จัดการใบสั่งซื้อ",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$store.getters["setting"][0].sub_title
        }
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: `${this.$nuxt.context.env.config.IMG_URL}${this.$store.getters["setting"][0].logo}`
        }
      ]
    };
  },
  middleware: ["auth", "checkAll", "refresh", "checkChecker"],
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
