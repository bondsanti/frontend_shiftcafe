<template>
  <v-app>
    <v-app-bar fixed app color="primary" dark>
      <v-toolbar-title>บริษัท เดฟ ฟอง จำกัด</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-title class="hidden-xs-only">
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
          <v-row class="justify-center">
            <v-col cols="12" sm="4">
              <v-icon size="24px">
                mdi-phone
              </v-icon>
              <span>054-010-691</span>
            </v-col>
            <v-col cols="12" sm="4">
              <v-icon size="24px">
                mdi-cellphone
              </v-icon>
              <span>080-245-0120</span>
            </v-col>
            <v-col cols="12" sm="4">
              <v-icon size="24px">
                mdi-email-variant
              </v-icon>
              <span>info@devfong.co.th</span>
            </v-col>
          </v-row>
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
