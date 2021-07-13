<template>
  <coupon :coupon="coupon" @addCoupon="addCoupon" />
</template>

<script>
import coupon from "@/components/manage/coupon.vue";
export default {
  async asyncData(context) {
    const coupon = await context.$axios.$get("/coupon");
    //console.log(unit);
    return { coupon };
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
