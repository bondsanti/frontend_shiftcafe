<template>
  <v-app light>

    <v-main>

        <nuxt />

    </v-main>
    <Footer />
  </v-app>
</template>
<script>

import Footer from '~/components/MemberLayout/Footer'
export default {
  components: {

    Footer
  },
  
}
</script>