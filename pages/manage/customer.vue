<template>
  <customer
    :customer="customer"
    :levelmember="levelmember"
    @addCustomer="addCustomer"
  />
</template>

<script>
import customer from "@/components/manage/customer.vue";
export default {
  middleware: ["auth", "check"],
    head: {
        title: 'จัดการสมาชิก'
    },
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
    customer
  },
  methods: {
    async addCustomer(dataCustomer) {
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
