<template>
  <pointmanage
    :pointmanage="pointmanage"
    :customers="customers"
    @refreshPoint="refreshPoint"
  />
</template>

<script>
import pointmanage from "@/components/manage/pointmanage.vue";
export default {
  middleware: ["auth", "check", "refresh", "checkChecker"],
  head: {
    title: "แต้ม"
  },

  async asyncData(context) {
    const pointmanage = await context.$axios.$get("/point-manage");
    const customers = await context.$axios.$get("/customer2");
    //console.log(pointmanage);
    return { pointmanage, customers };
  },
  components: {
    pointmanage
  },
  methods: {
    async refreshPoint() {
      this.pointmanage = await this.$axios.$get("/point-manage");
    }
  },
  data: () => ({
    pointmanage: []
  })
};
</script>

<style></style>
