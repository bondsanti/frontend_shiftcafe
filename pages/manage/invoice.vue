<template>
  <Invoice :historyInvoice="invoices" />
</template>

<script>
import Invoice from "@/components/seller/Invoice.vue";
export default {
  head() {
    return {
      titleTemplate: `${this.$store.getters["setting"][0].head_title}  | %s`,
      title: "จัดการใบเสร็จรับเงิน",
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
