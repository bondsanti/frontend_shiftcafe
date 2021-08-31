<template>
  <div>
    <v-app-bar fixed app color="#1d1d1d" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title class="hidden-xs-only">{{
        this.$store.getters["setting"][0].head_title
      }}</v-toolbar-title>
      <v-btn icon @click="$nuxt.refresh()">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <span class="mr-4  hidden-xs-only font-weight-bold">{{ timer }}</span>

      <v-avatar size="36px" class="mr-2 hidden-xs-only">
        <v-icon x-large>mdi-account-circle</v-icon>
      </v-avatar>
      <v-toolbar-title
        >{{ $store.getters["displayName"] }} |
        <strong>{{ $store.getters["position"] }}</strong></v-toolbar-title
      >
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      app
      color="#1d1d1d"
      dark
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ this.$store.getters["setting"][0].head_title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ this.$store.getters["setting"][0].sub_title }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <!-- 1 -->
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <h3>{{ item.title }}</h3>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="(item, i) in below"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <h3>{{ item.title }}</h3>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      drawer: null,
      fixed: false,
      below: [
        {
          icon: "mdi-apps",
          title: "ขาย",
          to: "/seller"
        },
        {
          icon: "mdi-cog ",
          title: "ตั้งค่า",
          to: "/manage/settings"
        },
         {
          icon: "mdi-folder-clock-outline",
          title: "บันทึกกิจกรรม",
          to: "/manage/log"
        }
      ],

      items: [
        {
          icon: "mdi-home",
          title: "หน้าหลัก",
          to: "/manage/"
        },
        {
          icon: "mdi mdi-cash-register ",
          title: "ข้อมูลเงินทอน",
          to: "/manage/cash"
        },

        {
          icon: "mdi-account",
          title: "จัดข้อมูลลูกค้า",
          to: "/manage/customer"
        },
        {
          icon: "mdi-barley ",
          title: "ประเภทอาหาร",
          to: "/manage/unit"
        },
        {
          icon: "mdi-food-fork-drink  ",
          title: "หมวดหมู่สินค้า",
          to: "/manage/category"
        },
        {
          icon: "mdi-notebook-edit-outline",
          title: "จัดการสินค้า",
          to: "/manage/product"
        },
        {
          icon: "mdi-ticket-account",
          title: "จัดการระดับสมาขิก",
          to: "/manage/levelmember"
        },
        {
          icon: "mdi-card-account-details-outline ",
          title: "จัดการพนักงาน",
          to: "/manage/employee"
        },
        {
          icon: "mdi-file-powerpoint-box",
          title: "จัดการแต้ม",
          to: "/manage/pointmanage"
        },
        {
          icon: "mdi-ticket-percent-outline ",
          title: "จัดการคูปอง",
          to: "/manage/coupon"
        },
        {
          icon: "mdi-note-text-outline",
          title: "ข้อมูลการสั่งซื้อ",
          to: "/manage/order"
        },
        {
          icon: "mdi-cash-multiple",
          title: "ข้อมูลการชำระเงิน",

          to: "/manage/invoice"
        }

      ],
      miniVariant: false,
      title: "admin"
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
    getTime() {
      let now = new Date();
      return `${
        now.getHours() < 10 ? "0" + now.getHours() : now.getHours()
      } : ${
        now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()
      } : ${now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds()}`;
      //let now = new Date();
    },

    checkManager() {
      if (this.$store.getters["position"] === "manager") {
        this.items = [
          {
            icon: "mdi-home",
            title: "หน้าหลัก",
            to: "/manage/"
          },
          {
            icon: "mdi mdi-cash-register ",
            title: "ข้อมูลเงินทอน",
            to: "/manage/cash"
          },

          {
            icon: "mdi-account ",
            title: "จัดข้อมูลลูกค้า",
            to: "/manage/customer"
          },

          {
            icon: "mdi-notebook-edit-outline",
            title: "จัดการสินค้า",
            to: "/manage/product"
          },
          {
            icon: "mdi-ticket-account",
            title: "จัดการระดับสมาขิก",
            to: "/manage/levelmember"
          },
          {
            icon: "mdi-card-account-details-outline ",
            title: "จัดการพนักงาน",
            to: "/manage/employee"
          },
          {
            icon: "mdi-file-powerpoint-box",
            title: "จัดการแต้ม",
            to: "/manage/pointmanage"
          },
          {
            icon: "mdi-ticket-percent-outline ",
            title: "จัดการคูปอง",
            to: "/manage/coupon"
          },
          {
            icon: "mdi-note-text-outline",
            title: "ข้อมูลการสั่งซื้อ",
            to: "/manage/order"
          },
          {
            icon: "mdi-cash-multiple",
            title: "ข้อมูลการชำระเงิน",
            to: "/manage/invoice"
          }
        ];
      } else if (this.$store.getters["position"] === "checker") {
        this.items = [
          {
            icon: "mdi-home",
            title: "หน้าหลัก",
            to: "/manage/"
          },
          {
            icon: "mdi mdi-cash-register ",
            title: "ข้อมูลเงินทอน",
            to: "/manage/cash"
          },

          {
            icon: "mdi-note-text-outline",
            title: "ข้อมูลการสั่งซื้อ",
            to: "/manage/order"
          },
          {
            icon: "mdi-cash-multiple",
            title: "ข้อมูลการชำระเงิน",
            to: "/manage/invoice"
          }
        ];
        this.below = [];
      }
    }
  },
  computed: {
    routesMain() {
      return this.$router.options.routes.filter(route => route.meta.main);
    }
  },

  created() {
    setInterval(() => {
      this.timer = this.getTime();
    }, 1000);

    this.checkManager();
  }
};
</script>
