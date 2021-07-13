<template>
  <div class="" style="height: 100%">
    <v-card class="py-5 px-5" style="height: 100%;" color="secondary">
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="3">
          <MenuProfile />
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="9">
          <v-card class="px-6 py-5">
            <div class="text-center">
              <h2 class="">ข้อมูลส่วนตัว</h2>
              <v-divider class="mt-3 mb-2"></v-divider>
            </div>
            <v-row no-gutters style="flex-wrap: nowrap">
              <v-col cols="6" class="flex-grow-0 flex-shrink-0 text-right">
                <h4 class="pa-2 " outlined tile>
                  <v-icon color="red_fix" dense>mdi-barcode </v-icon>
                  รหัสลูกค้า
                </h4>
              </v-col>
              <v-col
                cols="6"
                style="min-width: 100px; max-width: 100%"
                class="flex-grow-1 flex-shrink-0"
              >
                <h4 class="pa-2 text-truncate" outlined tile>
                  60e55165fc99f20f4c3a7810
                </h4>
              </v-col>
            </v-row>
            <v-row no-gutters style="flex-wrap: nowrap">
              <v-col cols="6" class="flex-grow-0 flex-shrink-0 text-right">
                <h4 class="pa-2 " outlined tile>
                  <v-icon color="red_fix" dense>mdi-account </v-icon>
                  ชื่อ - นามสกุล
                </h4>
              </v-col>
              <v-col
                cols="6"
                style="min-width: 100px; max-width: 100%"
                class="flex-grow-1 flex-shrink-0"
              >
                <h4 class="pa-2 text-truncate" outlined tile>
                  Santi Chooprayoon
                </h4>
              </v-col>
            </v-row>
            <v-row no-gutters style="flex-wrap: nowrap">
              <v-col cols="6" class="flex-grow-0 flex-shrink-0 text-right">
                <h4 class="pa-2 " outlined tile>
                  <v-icon color="red_fix" dense>mdi-gift </v-icon>
                  วันเกิด
                </h4>
              </v-col>
              <v-col
                cols="6"
                style="min-width: 100px; max-width: 100%"
                class="flex-grow-1 flex-shrink-0"
              >
                <h4 class="pa-2 text-truncate" outlined tile>
                  21/12/2536
                </h4>
              </v-col>
            </v-row>
            <v-row no-gutters style="flex-wrap: nowrap">
              <v-col cols="6" class="flex-grow-0 flex-shrink-0 text-right">
                <h4 class="pa-2 " outlined tile>
                  <v-icon color="red_fix" dense>mdi-phone-outline </v-icon>
                  เบอร์โทร
                </h4>
              </v-col>
              <v-col
                cols="6"
                style="min-width: 100px; max-width: 100%"
                class="flex-grow-1 flex-shrink-0"
              >
                <h4 class="pa-2 text-truncate" outlined tile>
                  0613299642
                </h4>
              </v-col>
            </v-row>
            <v-row no-gutters style="flex-wrap: nowrap">
              <v-col cols="6" class="flex-grow-0 flex-shrink-0 text-right">
                <h4 class="pa-2 " outlined tile>
                  <v-icon color="red_fix" dense>mdi-email </v-icon>
                  อีเมล์
                </h4>
              </v-col>
              <v-col
                cols="6"
                style="min-width: 100px; max-width: 100%"
                class="flex-grow-1 flex-shrink-0"
              >
                <h4 class="pa-2 text-truncate" outlined tile>
                  Santi.chpy@gmail.com
                </h4>
              </v-col>
            </v-row>

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
  layout: "layoutMember",
  components: {
    MenuProfile
  }
};
</script>

<style>
.modal {
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.4);
}
</style>
