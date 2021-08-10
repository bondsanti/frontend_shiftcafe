<template>
  <v-row justify="center" align="center" style="height: 100%">
    <v-card
      class="mx-auto rounded-xl"
      color="primary"
      dark
      width="500"
      elevation="24"
    >
      <v-card-title>
        <v-icon large left>
          mdi-exclamation-thick
        </v-icon>
        <span class="text-h6 font-weight-light"
          >แจ้งเตือน {{ error.code }}</span
        >
      </v-card-title>

      <v-card-text class="text-h5 font-weight-bold">
        <h5 v-if="error.statusCode === 500">
          ไม่สามรถติดต่อกับเซิร์ฟเวอร์ได้ในขณะนี้
        </h5>
        <h5 v-else-if="error.statusCode === 404">ไม่พบหน้าดังกล่าว</h5>
        <h5 v-else>An error occurred</h5>
        <h6>{{ error.message }}</h6>
      </v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar size="40">
            <v-img class="elevation-6 " alt="" src="/logoDevfong.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title
              >รหัสข้อผิดพลาด
              <strong>{{ error.statusCode }}</strong></v-list-item-title
            >
          </v-list-item-content>
          <v-row align="center" justify="end">
            <v-btn class="subheading mr-2" to="/" fab small>
              <v-icon>
                mdi-home
              </v-icon>
            </v-btn>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
export default {
  props: ["error"],
  created() {
    //console.log(this.error);
  }
};
</script>
