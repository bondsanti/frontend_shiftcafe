<template>
  <customer
    :customer="customer"
    :levelmember="levelmember"
    @addCustomer="addCustomer"
    @refresh="refresh"
  />
</template>

<script>
import customer from "@/components/manage/customer.vue";
export default {
  middleware: ["auth", "check", "refresh", "checkChecker"],
  head() {
    return {
      titleTemplate: `${this.$store.getters["setting"][0].head_title}  | %s`,
      title: "จัดการลูกค้า",
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
    },
    async refresh() {
      this.customer = await this.$axios.$get("/customer");
    }
  },
  data: () => ({
    customer: []
  })
};
</script>

<style></style>
