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
  layout: "layoutCashier",
  head: {
    title: "Point"
  },
  middleware: ["auth", "checkAll", "refresh", "checkChecker", "checkStaff"],
  async asyncData(context) {
    const pointmanage = await context.$axios.$get("/point-manage");
    const customers = await context.$axios.$get("/customer2");
    //console.log(pointmanage);
    return { pointmanage, customers };
  },

  components: {
    pointmanage
  },
  // methods: {
  //   async addlevelmember(datalevelmember) {
  //     await this.$axios.$post("/point-manage", datalevelmember);
  //     this.pointmanage = await this.$axios.$get("/point-manage");
  //   }
  // },
  data: () => ({
    pointmanage: []
  }),
  methods: {
    async refreshPoint() {
      this.pointmanage = await this.$axios.$get("/point-manage");
    }
  }
};
</script>

<style></style>
