<template>
  <coupon
    :coupon="coupon"
    :employee="employee"
    :user="user"
    @addCoupon="addCoupon"
  />
</template>

<script>
import coupon from "@/components/manage/coupon.vue";
export default {
  middleware: ["auth", "check", "refresh", "checkChecker"],
  layout: "layoutManage",
  head() {
    return {
      titleTemplate: `${this.$store.getters["setting"][0].head_title}  | %s`,
      title: "จัดการคูปอง",
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
    const [coupon, employee, user] = await Promise.all([
      context.$axios.$get("/coupon"),
      context.$axios.$get("/employee"),
      context.$axios.$get("/authen/user")
    ]);
    //const products = await context.$axios.$get("/product");
    //console.log(products);
    // console.log(user);
    return { coupon, employee, user };
  },
  components: {
    coupon
  },
  methods: {
    async addCoupon(dataCoupon) {
      await this.$axios.$post("/coupon", dataCoupon);
      this.coupon = await this.$axios.$get("/coupon");
    }
  },
  data: () => ({
    coupon: []
  })
};
</script>

<style></style>
