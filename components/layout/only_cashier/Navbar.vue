<template>
  <div>
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
    </v-navigation-drawer>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <v-app-bar app color="#1d1d1d" dark>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: null,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "สั่งสินค้า",
          to: "/seller"
        },
        {
          icon: "mdi-cash-register",
          title: "เงินทอน",
          to: "/seller/cashdraw"
        },
        {
          icon: "mdi-account",
          title: "ลงทะเบียนสมาชิก",
          to: "/seller/register"
        },
        {
          icon: "mdi-gift",
          title: "แลก Point",
          to: "/seller/point"
        },

        {
          icon: "mdi-clipboard-list",
          title: "จัดการออเดอร์",
          to: "/seller/order"
        },
        {
          icon: "mdi-receipt",
          title: "จัดการใบสั่งซื้อ",
          to: "/seller/invoice"
        }
      ],
      miniVariant: false,
      below: [],
      timer: null
    };
  },
  methods: {
    // ออกจากระบบ
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
    // 
    checkStaff() {
      if (this.$store.getters["position"] === "staff") {
        this.items = [
          {
            icon: "mdi-apps",
            title: "สั่งสินค้า",
            to: "/seller"
          },
          {
            icon: "mdi-clipboard-list",
            title: "จัดการออเดอร์",
            to: "/seller/order"
          }
        ];
      } else if (
        this.$store.getters["position"] === "manager" ||
        this.$store.getters["position"] === "admin"
      ) {
        this.below = [
          {
            icon: "mdi-monitor-dashboard",
            title: "จัดการหลังบ้าน",
            to: "/manage"
          }
        ];
      }
    },
    getTime() {
      let now = new Date();
      return `${
        now.getHours() < 10 ? "0" + now.getHours() : now.getHours()
      } : ${
        now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()
      } : ${now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds()}`;
      //let now = new Date();
    }
  },
  created() {
    this.checkStaff();

    setInterval(() => {
      this.timer = this.getTime();
    }, 1000);
  }
};
</script>
<style scoped>
.mytitle {
  font-size: 0.5rem !important;
}
v-list-item__title {
  -webkit-line-clamp: unset !important;
  padding: 0;
}
</style>
