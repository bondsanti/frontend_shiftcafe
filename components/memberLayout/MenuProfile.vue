<template>
  <div class="">
    <div class="text-center mb-5">
      <v-img height="100%" src="platinum.png">
        <v-row align="end">
          <v-col align-self="start" class="pa-6" cols="3">
            <v-avatar class="profile" size="100">
              <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
            </v-avatar>
          </v-col>
          <v-col align-self="start" class="pa-5 mt-10 " cols="9">
            <h4 class="award1 pa-2 text-truncate text-uppercase" outlined tile>
              {{ loadData.fname }} {{ loadData.lname }}
            </h4>
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
        <strong class="text-right">{{ Math.ceil(knowledge) }}%</strong>
      </v-progress-linear>
    </div>
    <!--d-none d-sm-flex d-md-flex d-lg-flex-->
    <v-card class="mx-auto hidden-xs-and-down hidden-sm-and-down">
      <v-list mandatory nav>
        <h4 class="text-center pa-2">
          สวัสดี คุณ : <span class="red_fix--text"> Santi</span>
        </h4>
        <v-divider></v-divider>
        <v-list-item-group v-model="selectedItem" color="error">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-list-item-group @click.native="logout">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>ออกจากระบบ</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-bottom-navigation
      color="error"
      fixed
      class="hidden-lg-and-up hidden-md-and-up"
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
      <v-btn @click.native="logout">
        <span>ออก</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>
<script>
//import Footer from "../layout/Footer.vue";
export default {
  //components: { Footer },
  layout: "layoutMember",
  props: ["loadData"],
  data() {
    return {
      //loadData: [],
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
        }
      ],
      account: {
        avatar_img: "https://cdn.vuetifyjs.com/images/john.jpg"
      }
    };
  },

  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/login");
    }
  }
};
</script>
<style scoped>
.award1 {
  font-size: 25px;
  letter-spacing: 0.15em;
  line-height: 1.3;
  color: #d4af37;
  font-weight: 700;
  background: -webkit-linear-gradient(
    -90deg,
    #d5ab61 10%,
    #f8f4e5 52%,
    #faf9f8 52%,
    #d5ab61 80%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.border-gradient {
  border: 10px solid;
  border-image-slice: 1;
  border-width: 5px;
}
.border-gradient-purple {
  border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
}
.border-gradient-green {
  border-image-source: linear-gradient(to left, #00c853, #b2ff59);
}
</style>
