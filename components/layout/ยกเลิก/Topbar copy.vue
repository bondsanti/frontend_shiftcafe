<template>
  <div>
    <v-navigation-drawer v-model="navDrawer" fixed app color="primary" dark>
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
    navDrawer: {
      get() {
        return this.$store.state.navDrawer;
      },
      set(val) {
        this.$store.commit("SET_NAV_DRAWER", val);
      }
    },

    routesMain() {
      return this.$router.options.routes.filter(route => route.meta.main);
    }
  },

  created() {
    this.checkManager();
  }
};
</script>
