<template>
  <Order :historyOrder="historyOrder" />
</template>

<script>
import Order from "@/components/seller/Order.vue";

export default {
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
  layout: "default",
  middleware: ["auth", "check", "refresh"],
  data() {
    return {
      historyOrder: []
    };
  },
  components: {
    Order
  },

  async asyncData(context) {
    const historyOrder = await context.$axios.$get("/order");
    //console.log(historyOrder);
    return { historyOrder };
  },
  methods: {
    // async getAll(context) {
    //   const cashdrawData = await context.$axios.$get("/withdraw");
    //   console.log(cashdrawData);
    //   return { cashdrawData: cashdrawData };
    //   // console.log("cashdrawData");
    // }
  }
};
</script>
