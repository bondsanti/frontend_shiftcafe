<template>
  <Bank :bank="bank" @refresh="refresh"/>
</template>

<script>
import Bank from "@/components/manage/settings/Bank.vue";
export default {
  head: {
    title: "ใบสั่งซื้อ"
  },
  middleware: ["auth", "checkAll", "refresh", "checkChecker"],
  async asyncData(context) {
    const [bank] = await Promise.all([context.$axios.$get("/bank")]);
    return { bank };
  },
  components: {
    Bank
  },

  methods: {
      async refresh() {
      this.bank = await this.$axios.$get("/bank");
    },
   
    
  },
  data: () => ({
    //stock: []
  })
};
</script>

<style></style>
