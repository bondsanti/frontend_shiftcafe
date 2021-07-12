<template>
  <v-app>
    <Navbar />
    <v-main class="secondary">
      <nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>
<script>
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";
export default {
  components: {
    Navbar,
    Footer
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
