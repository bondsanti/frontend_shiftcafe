<template>
  <register
    :customer="customer"
    :levelmember="levelmember"
    @addCustomer="addCustomer"
  />
</template>

<script>
import register from "@/components/seller/register.vue";
export default {
  layout: "layoutCashier",
  middleware: ["auth", "check"],
  async asyncData(context) {
    const [customer, levelmember] = await Promise.all([
      context.$axios.$get("/customer"),
      context.$axios.$get("/level-member")
    ]);
    //const products = await context.$axios.$get("/product");
    //console.log(products);
    //console.log(levelmember);
    return { customer, levelmember };
  },
  components: {
    register
  },
  methods: {
    async addCustomer(dataCustomer) {
      await this.$axios.$post("/customer", dataCustomer);
      this.customer = await this.$axios.$get("/customer");
    }
  },
  data: () => ({
    register: []
  })
};
</script>

<style></style>
