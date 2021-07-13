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

