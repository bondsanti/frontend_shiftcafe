<template>
  <v-footer app dark color="#1d1d1d" fi>
    <span>{{ this.$store.getters["setting"][0].footer }}</span>
    <!-- <div>
      Icons made by
      <a href="https://www.freepik.com" title="Freepik">Freepik</a> from
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </div> -->
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    icons: ["mdi-facebook"]
  })
};
</script>
