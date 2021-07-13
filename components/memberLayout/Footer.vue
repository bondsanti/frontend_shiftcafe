<template>
  <div> 
    <v-bottom-navigation
      :value="value"
      color="error"
      fixed
      class="hidden-lg-and-up"
      height="80px"
      style="z-index: 1000"
    >
      <v-btn to="/members/history_buy">
        <span>ประวัติ</span>

        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn to="/dealer">
        <span>ซื้อล็อตเตอรี่</span>

        <v-icon>mdi-search</v-icon>
      </v-btn>

      <v-btn to="/complain">
        <span>ร้องเรียน</span>

        <v-icon>mdi-chat</v-icon>
      </v-btn>
    </v-bottom-navigation>
      <v-footer absolute app dark color="#1d1d1d" fi>
    <span>&copy; {{ new Date().getFullYear() }}</span>
  </v-footer>

  </div>
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {
      value: 2,
      show_cart: false,
      date_cart_exp: null,
    }
  },
  created() {
    this.$nuxt.$on('Action_Cart_Show', (value) => {
      this.show_cart = value
    })
  },
  mounted(){
    this.exp_cart()
  },
  methods: {
    exp_cart(){
      const duration = moment.duration(900, 's');
      const intervalId = setInterval(() => {
      duration.subtract(1, "s");
      this.date_cart_exp = `${duration.minutes()}:${duration.seconds()}`;
      //console.log(`${duration.hours()}h:${duration.minutes()}m:${duration.seconds()}s`);
      // `:${duration.milliseconds()}` to add milliseconds

      if (duration.asMilliseconds() !== 0) return;
       clearInterval(intervalId);
       this.date_cart_exp = "หมดอายุ"
       //console.warn("Times up!");
    }, 1000);
    }
  }
}
</script>
<style scoped></style>
