<template>
  <v-app light>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer app dark color="primary">
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
