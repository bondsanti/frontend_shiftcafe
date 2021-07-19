<template>
  <div>
  
      <div class="text-center  py-6 pl-4 pr-4"><sell/>
      
        <v-row>
          <v-col cols="12" sm="12"><apexcharts/></v-col>
          <v-col cols="12" sm="6"><topsell /> </v-col>
          <v-col cols="12" sm="6"><datasell /></v-col>
        </v-row>
      </div>

      <div class="py-3"></div>
  
  </div>
</template>
<script>
import sell from "@/components/manage/dashboard/sell.vue";
import topsell from "@/components/manage/dashboard/topsell.vue";
import datasell from "@/components/manage/dashboard/datasell.vue";
import apexcharts from "@/components/manage/dashboard/apexcharts.vue";
export default {
  components: {
    sell,
    topsell,
    datasell,
    apexcharts,
    VueApexCharts: () => import("vue-apexcharts")
  },

  methods: {}
};
</script>
