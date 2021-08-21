<template>
  <v-app>
    <!-- <Topbar /> -->
    <Sidebar />
    <v-main class="secondary">
      <nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
// import Topbar from "@/components/layout/Topbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";

export default {
  components: {
    // Topbar,
    Sidebar,
    Footer,
  
  }
};
</script>

<style>
html {
  font-family: "Sarabun", sans-serif;
}

#app {
  font-family: "Sarabun", sans-serif;
}
</style>
