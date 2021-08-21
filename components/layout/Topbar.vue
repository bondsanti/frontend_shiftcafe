<template>
  <v-app-bar :clipped-left="clipped" fixed app color="#1d1d1d" dark>
    <v-app-bar-nav-icon @click.stop="ToggleNavDrawer()" />
    <v-toolbar-title v-if="!navDrawer" class="hidden-xs-only">{{
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
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      timer: null
    };
  },
  computed: {
    navDrawer() {
      return this.$store.state.navDrawer;
    }
  },
  methods: {
    ToggleNavDrawer() {
      this.$store.commit("TOGGLE_NAV_DRAWER");
    },
    async logout() {
      await this.$auth.logout();
      this.$router.push("/login");
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
    setInterval(() => {
      this.timer = this.getTime();
    }, 1000);
  }
};
</script>

<style></style>