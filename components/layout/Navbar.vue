<template>
  <div>
    <v-navigation-drawer v-model="drawer" fixed app color="#1d1d1d" dark>
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
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="#1d1d1d" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>SHIFT CAFE</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-circle-box</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-store-minus</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-clipboard-list</v-icon>
      </v-btn>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-avatar size="36px" class="ml-2">
        <img
          alt="Avatar"
          src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
        />
      </v-avatar>
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
          title: "ขาย",
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
          icon: "mdi-fridge-industrial-outline",
          title: "จัดการstock",
          to: "/manage/stock"
        },
        {
          icon: "mdi-clipboard account outline",
          title: "จัดข้อมูลสมาชิก",
          to: "/manage/customers"
        },
        {
          icon:"mdi-barley ",
          title:"จัดการหน่วยนับ",
          to:"/manage/manageunitsmenu"
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
  }
};
</script>
