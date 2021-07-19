<template>
  <cash @addCashdraw="onSubmitted" :loadData="loadData" />
</template>

<script>
import cash from "@/components/seller/cashdraw.vue";

export default {
  layout: "default",
  data() {
    return {
      loadData: []
    };
  },
  components: {
    cash
  },

  async asyncData(context) {
    const loadData = await context.$axios.$get("/withdraw");
    //console.log(cashdrawData);
    return { loadData };
  },
  methods: {
    async onSubmitted(cashdrawData) {
      // console.log("Result : ", cashdrawData);
      this.$axios
        .$post("/withdraw", cashdrawData)
        .then(res => {
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
      //this.loadData = context.$axios.$get("/withdraw");
      //
    }

    // async getAll(context) {
    //   const cashdrawData = await context.$axios.$get("/withdraw");
    //   console.log(cashdrawData);
    //   return { cashdrawData: cashdrawData };
    //   // console.log("cashdrawData");
    // }
  }
};
</script>
