<template>
  <div class="my-5">
    <v-card class="py-5 px-5" color="#ededed">
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="3">
          <MenuProfile />
        </v-col>
        <v-col xs="12" sm="12" md="9">
          <h2 class="text-left mb-2">ข้อมูลส่วนตัว</h2>
          <v-card class="px-6 py-8">
            <div class="d-flex my-2">
              <span class="text-left red_fix--text my-auto">ชื่อ</span>
              <v-chip class="mx-2 background_content" label> สันติ </v-chip>
            </div>
            <div class="d-flex my-2">
              <span class="text-left red_fix--text my-auto">นามสกุล</span>
              <v-chip class="mx-2 background_content" label> ชูประยูร </v-chip>
            </div>
            <div class="d-flex my-2">
              <span class="text-left red_fix--text my-auto">เบอร์มือถือ</span>
              <v-chip class="mx-2 background_content" label>
                0882728823
              </v-chip>
            </div>
            <div class="d-flex my-2">
              <span class="text-left red_fix--text my-auto">เฟซบุ๊ก</span>
              <v-chip class="mx-2 background_content" label>
                https://www.facebook.com/thairath/
              </v-chip>
            </div>
            <div class="d-flex my-2">
              <span class="text-left red_fix--text my-auto">ไลน์</span>
              <v-chip class="mx-2 background_content" label> - </v-chip>
            </div>
            <v-divider class="mt-3 mb-5"></v-divider>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import MenuProfile from "~/components/memberLayout/MenuProfile";
export default {
  layout: "login",
  components: {
    MenuProfile
  }
};
</script>

<style></style>
