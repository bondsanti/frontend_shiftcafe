<template>
  <v-footer app dark color="#1d1d1d" fi>
    <span>{{ this.$store.getters["setting"][0].footer }}</span>
  </v-footer>
</template>
<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook'
       
      ],
    }),
  }
</script>