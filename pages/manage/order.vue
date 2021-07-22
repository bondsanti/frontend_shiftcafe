<template>
  <Order :historyOrder="historyOrder" />
</template>

<script>
import Order from "@/components/manage/order.vue";

export default {
  head: {
    title: "ประวัติสั่งชื่อ"
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
    console.log(historyOrder);
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
