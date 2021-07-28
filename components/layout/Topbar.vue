<template>
  <v-app-bar :clipped-left="clipped" fixed app color="#1d1d1d" dark>
    <v-app-bar-nav-icon @click.stop="toggleDrawer"/>
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
</template>

<script>
export default {
  data() {
    return {
      clipped: false
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/login");
    },
       toggleDrawer() {
      this.$store.commit('set_drawer', !this.$store.state.drawer)
    }
  }
};
</script>

<style></style>
