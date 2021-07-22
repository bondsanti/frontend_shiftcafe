<template>
  <v-row class="md-4">
    <!-- --------------------ยอดขายวันนี้--------------------------- -->
    <v-col cols="12" xs="12" sm="12" md="4" class="py-6">
      <v-hover v-slot="{ hover }" open-delay="300">
        <v-card
          class="pa-1 rounded-lg"
          color="primary"
          :elevation="hover ? 16 : 2"
          dark
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h5">
                ยอดขายวันนี้
              </v-card-title>
              <v-card-subtitle> {{ formatDate(Date.now()) }}</v-card-subtitle>
              <v-card-actions>
                <v-list-item-title class="headline mb-1 white--text">
                  ฿ {{ formatPrice(todayPrice) }}
                </v-list-item-title>
              </v-card-actions>
            </div>
            <v-avatar class="mx-auto mt-7" size="105" max-width="90px" tile>
              <v-img src="/wallet.gif"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-hover>
    </v-col>
    <!-- --------------------ยอดขายวันนี้---------------------------  -->

    <!-- --------------------สัปดาห์นี้--------------------------- -->
    <v-col cols="12" xs="12" sm="12" md="4" class="py-6">
      <v-hover v-slot="{ hover }" open-delay="300">
        <v-card
          class="pa-1 rounded-lg"
          color="primary"
          :elevation="hover ? 16 : 2"
          dark
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h5">
                ยอดขายเดือนนี้
              </v-card-title>
              <v-card-subtitle> {{ rangeMonth() }}</v-card-subtitle>
              <v-card-actions>
                <v-list-item-title class="headline mb-1 white--text">
                  ฿ {{ formatPrice(monthPrice) }}
                </v-list-item-title>
              </v-card-actions>
            </div>
            <v-avatar class="mx-auto mt-7" size="105" max-width="90px" tile>
              <v-img src="/wallet.gif"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-hover>
    </v-col>
    <!-- --------------------สัปดาห์นี้---------------------------  -->
    <!-- --------------------เดือน--------------------------- -->
    <v-col cols="12" xs="12" sm="12" md="4" class="py-6">
      <v-hover v-slot="{ hover }" open-delay="300">
        <v-card
          class="pa-1 rounded-lg"
          color="primary"
          :elevation="hover ? 16 : 2"
          dark
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h5">
                ยอดขายรวมปีนี้
              </v-card-title>
              <v-card-subtitle> {{ formatDate2(Date.now()) }}</v-card-subtitle>
              <v-card-actions>
                <v-list-item-title class="headline mb-1 white--text">
                  ฿ {{ formatPrice(yearPrice) }}
                </v-list-item-title>
              </v-card-actions>
            </div>
            <v-avatar class="mx-auto mt-7" size="105" max-width="90px" tile>
              <v-img src="/wallet.gif"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-hover>
    </v-col>
    <!-- --------------------เดือน---------------------------  -->
  </v-row>
  <!-- จบ row1 -->
</template>

<script>
import moment from "moment";
export default {
  props: ["today", "month", "year"],
  data: () => ({
    todayPrice: 0,
    monthPrice: 0,
    yearPrice: 0
  }),
  methods: {
    thinkToday() {
      let todayTotal = 0;
      for (let i in this.today) {
        todayTotal += this.today[i].net_price;
      }

      this.todayPrice = todayTotal;
    },
    thinkMonth() {
      let monthTotal = 0;
      for (let i in this.month) {
        monthTotal += this.month[i].net_price;
      }

      this.monthPrice = monthTotal;
    },
    thinkYear() {
      let yearTotal = 0;
      for (let i in this.year) {
        yearTotal += this.year[i].net_price;
      }

      this.yearPrice = yearTotal;
    },
    rangeMonth() {
      const today = new Date();
      let month2 = today.getMonth();
      let endDay = new Date(today.getFullYear(), month2 + 1, 0);
      let startDay = new Date(today.getFullYear(), today.getMonth(), 1);

      return this.formatDate(startDay) + " - " + this.formatDate(endDay);
    },
    formatDate(date) {
      var strdate = moment(date).add(543, "years");
      return moment(strdate).format("D/MM/YY ");
    },
    formatDate2(date) {
      var strdate = moment(date).add(543, "years");
      return moment(strdate).format("MM / YYYY ");
    },
    formatPrice(value2) {
      const value = parseInt(value2);
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  created() {
    this.thinkToday();
    this.thinkMonth();
    this.thinkYear();
  }
};
</script>

<style></style>
