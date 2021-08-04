<template>
  <v-app>
    <v-app-bar fixed app color="#1d1d1d" dark>
      <v-toolbar-title class="hidden-xs-only"
        >บริษัท เดฟ ฟอง จำกัด</v-toolbar-title
      >

      <v-spacer></v-spacer>
      <span class="mr-4  hidden-xs-only font-weight-bold"></span>

      <v-toolbar-title>
        <strong>{{ timer }}</strong></v-toolbar-title
      >
    </v-app-bar>
    <v-main class="secondary">
      <nuxt />
    </v-main>
    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="red">
          <strong class="subheading"
            >ที่อยู่ 399/17 หมู่ที่ 6 ตำบลพระบาท อำเภอเมือง จังหวัดลำปาง
            52000</strong
          >

          <v-spacer></v-spacer>

          <v-icon size="24px">
            mdi-phone
          </v-icon>
          <span class="ml-1">054-010-691</span>
          <v-icon size="24px" class="ml-3">
            mdi-cellphone
          </v-icon>
          <span class="mr-3 ทส-1">080-245-0120</span>
          <v-icon size="24px">
            mdi-email-variant
          </v-icon>
          <span class="ml-1">info@devfong.co.th</span>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
          <strong
            >Copyright © 2021 Dev Fong Co., Ltd. All Rights Reserved.</strong
          >
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      timer: null
    };
  },
  methods: {
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

<style>
html {
  font-family: "Sarabun", sans-serif;
}

#app {
  font-family: "Sarabun", sans-serif;
}
</style>
