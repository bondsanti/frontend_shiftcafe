<template>
  <div class="">
    <div class="text-center mb-5">
      <v-img
        height="100%"
        :src="
          `${
            loadData.ref_level_id
              ? $nuxt.context.env.config.IMG_URL + loadData.ref_level_id.img
              : 'no-level.png'
          }`
        "
      >
        <v-row align="end">
          <v-col align-self="start" class="pa-6" cols="3">
            <v-avatar
              class="profile ma-2"
              :size="
                $vuetify.breakpoint.xs || $vuetify.breakpoint.md ? 50 : 100
              "
            >
              <v-img
                src="profile-member.png"
                style="border: 2px solid #ffffff"
              ></v-img>
            </v-avatar>
          </v-col>
          <v-col align-self="start" class="  mt-5 " cols="9">
            <p
              :class="
                $vuetify.breakpoint.xs || $vuetify.breakpoint.md
                  ? 'award1 pa-2 pl-5 text-truncate text-uppercas caption'
                  : 'award1 pa-2 pl-10 text-truncate text-uppercas text-lg-body-1'
              "
            >
              {{ loadData.fname }} {{ loadData.lname }}
            </p>
          </v-col>
        </v-row>
      </v-img>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-progress-linear
            v-bind="attrs"
            v-on="on"
            :value="Sumtotal"
            height="17"
            striped
            color="amber"
            class="mt-5 rounded-xl"
          >
            <!-- <strong>{{ formatPrice(Sumtotal) }}%</strong> -->
            <strong
              >{{ formatPrice(totalprice) }}/{{
                formatPrice(
                  loadData.ref_level_id ? loadData.ref_level_id.target_price : 0
                )
              }}</strong
            >
          </v-progress-linear>
        </template>
        <span>ยอดซื้อสะสม/เป้าหมายยอดเปลี่ยนระดับสมาชิก</span>
      </v-tooltip>
    </div>
    <!--d-none d-sm-flex d-md-flex d-lg-flex-->
    <v-card class="mx-auto hidden-xs-and-down hidden-sm-and-down">
      <v-list mandatory nav>
        <h4 class="text-center pa-2">
          สวัสดี คุณ :
          <span class="red_fix--text">
            {{ loadData.fname }} {{ loadData.lname }}</span
          >
        </h4>
        <v-divider></v-divider>
        <v-list-item-group v-model="selectedItem" color="error">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                v-text="item.text"
                class="pa-2"
              ></v-list-item-title>
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
  props: ["loadData", "totalprice", "Sumtotal"],

  data() {
    return {
      selectedItem: 0,
      total_price: [],
      knowledge: 1000,
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
        avatar_img: "logo2.png"
      }
    };
  },

  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/login");
      this.$swal.fire({
        type: "info",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: "ออกจากระบบเรียบร้อยแล้ว",
        didOpen: toast => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        }
      });
    },
    formatPrice(Sumtotal) {
      const value = parseInt(Sumtotal);
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    classForText() {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.md) {
        return "award1 pa-2 text-truncate text-uppercas caption";
      } else {
        return "award1 pa-2 text-truncate text-uppercas";
      }
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
