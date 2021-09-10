<template>
  <v-row class="md-4">
    <!-- --------------------ยอดขายวันนี้--------------------------- -->
    <v-col cols="12" xs="12" sm="12" md="4" class="py-6">
      <v-hover v-slot="{ hover }" open-delay="300">
        <v-card
          class="pa-1 rounded-lg"
          color="primary"
          :elevation="hover ? 10 : 6"
          dark
        >
          <div
            class="d-flex flex-no-wrap justify-space-between"
            v-ripple="{ center: true }"
          >
            <div>
              <v-card-title class="text-h5">
                ยอดขายวันนี้
              </v-card-title>
              <!-- <v-card-subtitle> {{ formatDate(Date.now()) }}</v-card-subtitle> -->
              <v-card-subtitle> {{ formatDate3() }}</v-card-subtitle>
              <v-card-actions>
                <v-list-item-title class="headline mb-1 white--text">
                  ฿ {{ formatPrice(todayPrice) }}
                </v-list-item-title>
              </v-card-actions>
            </div>
            <v-avatar class="mx-auto mt-7" size="105" max-width="90px" tile>
              <v-img src="/money.png"></v-img>
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
          :elevation="hover ? 10 : 6"
          dark
        >
          <div
            class="d-flex flex-no-wrap justify-space-between"
            v-ripple="{ center: true }"
          >
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
              <v-img src="/wallet_1.png"></v-img>
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
          :elevation="hover ? 10 : 6"
          dark
        >
          <div
            class="d-flex flex-no-wrap justify-space-between"
            v-ripple="{ center: true }"
          >
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
              <v-img src="/trophy.png"></v-img>
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
  props: ["year", "dateNow"],
  data: () => ({
    todayPrice: 0,
    monthPrice: 0,
    yearPrice: 0,
    monthNamesThai: [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤษจิกายน",
      "ธันวาคม"
    ]
  }),
  methods: {
    thinkMonth(datePara) {
      //let date = new Date();
      let date = new Date(datePara);
      let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const month = this.year.filter(y => {
        return (
          new Date(y.datetime).getTime() >= firstDay.getTime() &&
          new Date(y.datetime).getTime() <= lastDay.getTime()
        );
      });

      const day = this.year.filter(d => {
        return (
          new Date(d.datetime).getDate() === date.getDate() &&
          new Date(d.datetime).getMonth() === date.getMonth() &&
          new Date(d.datetime).getFullYear() === date.getFullYear()
        );
      });
      //console.log(day);

      let todayTotal = 0;
      for (let i in day) {
        todayTotal += day[i].net_price;
      }

      this.todayPrice = todayTotal;

      let monthTotal = 0;
      for (let i in month) {
        monthTotal += month[i].net_price;
      }

      this.monthPrice = monthTotal;
    },
    thinkYear(datePara) {
      let yearTotal = 0;
      let date = new Date(datePara);

      const year2 = this.year.filter(y => {
        return new Date(y.datetime).getFullYear() === date.getFullYear();
      });
      year2.map(y => {
        yearTotal += y.net_price;
      });

      this.yearPrice = yearTotal;
      //console.log(yearTotal);
    },
    rangeMonth() {
      const today = new Date(this.dateNow);
      let month2 = today.getMonth();
      let endDay = new Date(today.getFullYear(), month2 + 1, 0);

      //return this.formatDate(startDay) + " - " + this.formatDate(endDay);
      return `1  ${this.monthNamesThai[today.getMonth()]} ${today.getFullYear() +
        543} - ${endDay.getDate()} ${
        this.monthNamesThai[today.getMonth()]
      } ${today.getFullYear() + 543} `;
    },

    formatDate2() {
      const today = new Date(this.dateNow);

      return `${this.monthNamesThai[today.getMonth()]}  ${today.getFullYear() +
        543}`;
    },
    formatDate3() {
      const today = new Date(this.dateNow);

      return ` ${today.getDate()}  ${
        this.monthNamesThai[today.getMonth()]
      }  ${today.getFullYear() + 543}`;
    },
    formatPrice(value2) {
      const value = parseInt(value2);
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  created() {
    this.thinkMonth(new Date());
    this.thinkYear(new Date());
  }
};
</script>

<style></style>
