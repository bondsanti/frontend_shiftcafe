<template>
  <div>
    <v-navigation-drawer v-model="drawer" fixed app color="#1d1d1d" dark>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            SHIFT CAFÉ
          </v-list-item-title>
          <v-list-item-subtitle>
            คาเฟ่ no.1 ของเอเชียตะวันออกเฉียงใต้
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
      <!-- 2 -->
      <!-- <template v-slot:append>
        <div class="pa-2">
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
                <v-list-item-title class="pa-3" v-text="item.title" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
      </template> -->
      <!-- 2 -->
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="#1d1d1d" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="hidden-xs-only">SHIFT CAFÉ</v-toolbar-title>
      <v-spacer></v-spacer>

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
      drawer: false,
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
      below: []
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/login");
    },
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
    }
  },
  created() {
    this.checkStaff();
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
