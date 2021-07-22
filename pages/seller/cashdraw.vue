<template>
  <Cashdraw @addCashdraw="onSubmitted" :loadData="loadData"   @refresh="refresh" />
</template>

<script>
import Cashdraw from "@/components/seller/cashdraw.vue";

export default {
  middleware: ["auth", "checkAll", "refresh"],
  head: {
    title: "Withdraw"
  },
  layout: "layoutCashier",
  data() {
    return {
      loadData: []
    };
  },
  components: {
    Cashdraw
  },

  async asyncData(context) {
    const loadData = await context.$axios.$get("/withdraw");
    //console.log(cashdrawData);
    return { loadData };
  },
  methods: {
    async onSubmitted(cashdrawData) {
      // console.log("Result : ", cashdrawData);
      await this.$axios
        .$post("/withdraw", cashdrawData)
        .then(res => {
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
      //this.loadData = context.$axios.$get("/withdraw");
      //
      this.loadData = await this.$axios.$get("/withdraw");
    },
     async refresh() {
      this.loadData = await this.$axios.$get("/withdraw");
    }

    // async getAll(context) {
    //   const cashdrawData = await context.$axios.$get("/withdraw");
    //   console.log(cashdrawData);
    //   return { cashdrawData: cashdrawData };
    //   // console.log("cashdrawData");
    // }
  },
  data: () => ({
    Cashdraw: []
  })
};
</script>
