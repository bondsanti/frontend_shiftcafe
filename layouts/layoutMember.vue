<template>
  <v-app light>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer app dark color="#1d1d1d">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
<style>
html {
  font-family: "Sarabun", sans-serif;
}
#app {
  font-family: "Sarabun", sans-serif;
}
</style>
