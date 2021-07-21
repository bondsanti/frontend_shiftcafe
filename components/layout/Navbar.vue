<template>
  <div>
    <v-navigation-drawer v-model="drawer" fixed app color="#1d1d1d" dark>
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
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- 1 -->
      <template> </template>

      <!-- 2 -->
      <template v-slot:append>
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
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
      </template>
      <!-- 2 -->
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="#1d1d1d" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>SHIFT CAFE</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn icon>
        <v-icon>mdi-circle-box</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-store-minus</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-clipboard-list</v-icon>
      </v-btn> -->
      <v-avatar size="36px" class="mr-2">
        <img alt="Avatar" src="/profile-user.png" />
      </v-avatar>
      <v-toolbar-title>{{ $store.getters["displayName"] }}</v-toolbar-title>
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
      items2: [
        {
          action: "mdi-ticket",
          items3: [{ title: "List Item" }],
          title: "Attractions"
        },
        {
          action: "mdi-silverware-fork-knife",
          active: true,
          items: [
            { title: "Breakfast & brunch" },
            { title: "New American" },
            { title: "Sushi" }
          ],
          title: "Dining"
        },
        {
          action: "mdi-school",
          items: [{ title: "List Item" }],
          title: "Education"
        },
        {
          action: "mdi-run",
          items: [{ title: "List Item" }],
          title: "Family"
        },
        {
          action: "mdi-bottle-tonic-plus",
          items: [{ title: "List Item" }],
          title: "Health"
        },
        {
          action: "mdi-content-cut",
          items: [{ title: "List Item" }],
          title: "Office"
        },
        {
          action: "mdi-tag",
          items: [{ title: "List Item" }],
          title: "Promotions"
        }
      ],
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
        // {
        //   icon: "mdi-account-plus ",
        //   title: "ลงทะเบียนสมาชิก",
        //   to: "/manage/register"
        // },
        // {
        //   icon: "mdi-fridge-industrial-outline",
        //   title: "จัดการstock",
        //   to: "/manage/stock"
        // },
        {
          icon: "mdi-clipboard account outline",
          title: "จัดข้อมูลสมาชิก",
          to: "/manage/customer"
        },
        {
          icon: "mdi-barley ",
          title: "จัดการหน่วยนับ",
          to: "/manage/unit"
        },
        {
          icon: "mdi-food-fork-drink  ",
          title: "จัดหมวดหมู่",
          to: "/manage/category"
        },
        {
          icon: "mdi-notebook-edit-outline",
          title: "จัดการสินค้า",
          to: "/manage/product"
        },
        {
          icon: "mdi-ticket-account",
          title: "จัดระดับสมาขิก",
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
    }
  },
  created() {}
};
</script>
