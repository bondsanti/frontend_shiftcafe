<template>
  <div>
    <div class="text-center  py-6 pl-4 pr-4">
      <sell :today="today" :month="month" :year="year" />

      <v-row>
        <v-col cols="12" sm="12">
           <p class="mb-4">วันที่ {{ now }}</p>
          <apexcharts  :chart-data="chartData" :animations="animations"  />
          </v-col>
        <!-- <v-col cols="12" sm="6"><topsell /> </v-col>
          <v-col cols="12" sm="6"><datasell /></v-col> -->
      </v-row>
    </div>

    <div class="py-3"></div>
  </div>
</template>
<script>
import sell from "@/components/manage/dashboard/sell.vue";
import apexcharts from "@/components/manage/dashboard/apexcharts.vue";
export default {
  head: {
    title: "หน้าผู้จัดการ"
  },
  middleware: ["auth", "check", "refresh"],
  components: {
    sell,
    apexcharts
  },
data() {
    return {
      chartData: this.chartData,
      loading: true,
      errored: false,
      animations: true,
      now: new Date().toJSON().slice(0, 10), //.replace(/-/g,'/')
    };
  },
  async asyncData(context) {
    const [today, month, year] = await Promise.all([
      context.$axios.$get("/payment-today"),
      context.$axios.$get("/payment-month"),
      context.$axios.$get("/payment-year")
    ]);
    return { today, month, year };
  },
  

  methods: {},

  mounted() {
   this.$axios.get(
        "https://campaign-admin.gewista.at/chart/12/2021-07-01T10:03:23/2021-07-10T10:03:2"
      )
      .then(response => {
        this.chartData = response.data;
      //  console.log(response.data);
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>
