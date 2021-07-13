<template>
  <div class="">
    <div class="text-center mb-5">
      <v-img height="100%" src="classic.png">
        <v-row align="end">
          <v-col align-self="start" class="pa-6" cols="4">
            <v-avatar class="profile" size="100">
              <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
            </v-avatar>
          </v-col>
          <v-col align-self="start" class="pa-5 mt-10 " cols="8">
            <v-list-item-subtitle class="white--text text-uppercase">
              Mr. Santi Chooprayoon</v-list-item-subtitle
            >
          </v-col>
        </v-row>
      </v-img>

      <!--<v-avatar size="180" style="border: 4px solid #ffffff">
        <img :src="account.avatar_img" />
      </v-avatar>-->
      <v-progress-linear
        v-model="knowledge"
        height="15"
        color="amber"
        class="mt-5 rounded-xl"
      >
        <strong>{{ Math.ceil(knowledge) }}%</strong>
      </v-progress-linear>
    </div>

    <v-card class="mx-auto hidden-xs-and-up">
      <v-list flat>
        <h4 class="text-center pa-2">
          สวัสดี คุณ : <span class="red_fix--text"> Santi</span>
        </h4>
        <v-divider></v-divider>
        <v-list-item-group v-model="selectedItem">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>

    <v-bottom-navigation
      color="error"
      fixed
      class="hidden-lg-and-up"
      shift
      small
    >
      <v-btn to="/point">
        <span>พอยท์</span>
        <v-icon>mdi-gift</v-icon>
      </v-btn>
      <v-btn to="/coupon">
        <span>คูปอง</span>
        <v-icon>mdi-ticket-percent</v-icon>
      </v-btn>
      <v-btn to="/member" x-small>
        <span>ข้อมูล</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn to="/history_buy">
        <span>ประวัติ</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>
<script>
import Footer from "../layout/Footer.vue";
export default {
  components: { Footer },
  layout: "layoutMember",
  data() {
    return {
      selectedItem: 0,
      knowledge: 33,
      items: [
        { text: "ข้อมูลส่วนตัว", icon: "mdi-account", to: "/member" },
        {
          text: "พอยท์",
          icon: "mdi-gift",
          to: "/point"
        },
        {
          text: "คูปอง",
          icon: "mdi-ticket-percent",
          to: "/coupon"
        },
        {
          text: "ประวัติการสั่งซื้อ",
          icon: "mdi-history",
          to: "/history_buy"
        },
        {
          text: "ออกระบบ",
          icon: "mdi-logout",
          to: "/logout"
        }
      ],
      account: {
        avatar_img: "https://cdn.vuetifyjs.com/images/john.jpg"
      }
    };
  }
};
</script>
