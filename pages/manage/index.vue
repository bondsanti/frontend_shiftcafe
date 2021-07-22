<template>
  <div>
    <div class="text-center  py-6 pl-4 pr-4">
      <sell :today="today" :month="month" :year="year" />

      <v-row>
        <v-col cols="12" sm="12"><apexcharts /></v-col>
        <!-- <v-col cols="12" sm="6"><topsell /> </v-col>
          <v-col cols="12" sm="6"><datasell /></v-col> -->
      </v-row>
    </div>

    <div class="py-3"></div>
  </div>
</template>
<script>
import sell from "@/components/manage/dashboard/sell.vue";
// import topsell from "@/components/manage/dashboard/topsell.vue";
// import datasell from "@/components/manage/dashboard/datasell.vue";
import apexcharts from "@/components/manage/dashboard/apexcharts.vue";
export default {
  head: {
    title: "หน้าผู้จัดการ"
  },
  middleware: ["auth", "check", "refresh"],
  components: {
    sell,
    // topsell,
    //  datasell,
    apexcharts
  },
  async asyncData(context) {
    const [today, month, year] = await Promise.all([
      context.$axios.$get("/payment-today"),
      context.$axios.$get("/payment-month"),
      context.$axios.$get("/payment-year")
    ]);
    return { today, month, year };
  },

  methods: {}
};
</script>
