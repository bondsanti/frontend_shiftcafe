<template>
  <customer :customer="customer" @addCustomer="addCustomer" />
</template>

<script>
import customer from "@/components/manage/customer.vue";
export default {
  async asyncData(context) {
    const customer = await context.$axios.$get("/customer");
    console.log(customer);
    return { customer };
  },
  components: {
    customer
  },
  methods: {
    async addCoupon(dataCustomer) {
      await this.$axios.$post("/customer", dataCustomer);
      this.customer = await this.$axios.$get("/customer");
    }
  },
  data: () => ({
    customer: []
  })
};
</script>

<style></style>
