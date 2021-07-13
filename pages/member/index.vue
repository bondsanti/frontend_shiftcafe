<template>
  <div class="">
        <v-card class="py-5 px-5" color="grey darken-3
">
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="3">
          <MenuProfile />
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="9">
           <h2 class="text-left white--text mb-2">ข้อมูลส่วนตัว</h2>
            
            <v-card class="px-6 py-8">
         
            <div class="d-flex my-2">
              <span class="text-left my-auto">ชื่อ</span>
              <v-chip class="mx-2 background_content" label> Santi </v-chip>
            </div>
            <div class="d-flex my-2">
              <span class="text-left red_fix--text my-auto">นามสกุล</span>
              <v-chip class="mx-2 background_content" label> Chooprayoon </v-chip>
            </div>
            <div class="d-flex my-2">
              <span class="text-left red_fix--text my-auto">เบอร์มือถือ</span>
              <v-chip class="mx-2 background_content" label>
                0882312547
              </v-chip>
            </div>
            <div class="d-flex my-2">
              <span class="text-left red_fix--text my-auto">วันเกิด</span>
              <v-chip class="mx-2 background_content" label>
                21/12/2536
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
import MenuProfile from '~/components/memberLayout/MenuProfile'
export default {
 layout:"layoutMember",
  components: {
    MenuProfile,
  },
}
</script>

<style></style>
