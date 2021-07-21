<template>
  <pointmanage :pointmanage="pointmanage" />
</template>

<script>
import pointmanage from "@/components/manage/pointmanage.vue";
export default {
 middleware: ["auth", "check"],
   head: {
        title: 'แต้ม'
    },
  async asyncData(context) {
    const pointmanage = await context.$axios.$get("/point-manage");
    //console.log(pointmanage);
    return { pointmanage };
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
  })
};
</script>

<style></style>
