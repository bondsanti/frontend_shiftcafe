<template>
  <v-footer app dark color="#1d1d1d" fi>
    
    <span>&copy; DEV FONG Co., Ltd.</span> <span> {{ new Date().getFullYear() }}</span>
      <v-spacer></v-spacer>
       <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          dark
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
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