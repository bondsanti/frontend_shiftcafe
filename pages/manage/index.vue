<template>
  <div>
    <div class="text-center  py-6 pl-4 pr-4">
      <sell :year="year" :dateNow="dateNow" ref="sellChild" />

      <v-row>
        <v-col cols="12" sm="12">
          <p class="mb-4">ยอดขายประจำวันที่ {{ formatDate(dateNow) }}</p>
          <apexcharts
            :animations="animations"
            @sendDateIndex="sendDateIndex"
            :year="year"
          />
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <pieCharts
            :year="year"
            :category="category"
            title="จำนวนออเดอร์แยกตามหมวดหมู่ย่อย"
            phylum="category"
          />
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <pieCharts
            :year="year"
            :category="unit"
            title="จำนวนออเดอร์แยกตามหมวดหมู่ใหญ่"
            phylum="unit"
          />
        </v-col>
        <!-- <v-col cols="12" sm="6"><datasell /></v-col> -->
      </v-row>
    </div>

    <div class="py-3"></div>
  </div>
</template>
<script>
import sell from "@/components/manage/dashboard/sell.vue";
import apexcharts from "@/components/manage/dashboard/apexcharts.vue";
import pieCharts from "@/components/manage/dashboard/pieCharts.vue";
export default {
  head() {
    return {
      titleTemplate: `${this.$store.getters["setting"][0].head_title}  | %s`,
      title: "ผู้จัดการร้าน",
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
  layout: "layoutManage",
  middleware: ["auth", "check", "refresh"],
  components: {
    sell,
    apexcharts,
    pieCharts
  },
  data() {
    return {
      loading: true,
      errored: false,
      animations: true,
      now: new Date().toJSON().slice(0, 10),
      dateNow: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    };
  },
  async asyncData(context) {
    const [year, category, unit] = await Promise.all([
      // context.$axios.$get("/payment-today"),
      context.$axios.$get("/payment-year"),
      context.$axios.$get("/category"),
      context.$axios.$get("/unit")
    ]);
    return { year, category, unit };
  },

  methods: {
    sendDateIndex(date) {
      this.dateNow = date;
      this.$refs.sellChild.thinkMonth(date);

      //this.$refs.sellChild.thinkYear();
    },
    formatDate(date) {
      this.$moment().format("LLLL");
      let strdate = this.$moment(date).add(543, "years");
      return this.$moment(strdate).format("DD MMMM YYYY ");
    }
  },

  mounted() {
    // this.$axios
    //   .get(
    //     "https://campaign-admin.gewista.at/chart/12/2021-07-01T10:03:23/2021-07-10T10:03:2"
    //   )
    //   .then(response => {
    //     this.chartData = response.data;
    //     //  console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.errored = true;
    //   })
    //   .finally(() => (this.loading = false));
  }
};
</script>
