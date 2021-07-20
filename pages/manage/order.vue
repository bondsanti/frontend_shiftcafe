<template>
  <Order :historyOrder="historyOrder" />
</template>

<script>
import Order from "@/components/manage/order.vue";

export default {
  layout: "default",
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
