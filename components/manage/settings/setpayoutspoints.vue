<template>
  <div>
    <v-hover v-slot="{ hover }" open-delay="300">
      <v-card
        class="pa-1 rounded-lg"
        color="primary"
        :elevation="hover ? 16 : 2"
        dark
      >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="text-h5">
              ตั้งค่าอัตราการจ่ายแต้ม
            </v-card-title>

            <v-card-subtitle class="mt-2 ml-12">
              <v-alert dense text color="success" >
                100(฿) - ได้  - 1(P)
              </v-alert>
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                class="ml-12"
                outlined
                roundedtext
                @click.stop="dialog = true"
              >
                ไปหน้าตั้งค่า
              </v-btn>
            </v-card-actions>
          </div>
          <v-avatar class="mx-auto mt-7" size="90" max-width="90px" tile>
            <v-img src="/wallet.gif"></v-img>
          </v-avatar>
        </div>
      </v-card>
    </v-hover>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5">
          ตั้งค่าอัตราการจ่ายแต้ม
        </v-card-title>

        <div fluid>
          <v-row>
            <v-col cols="4">
              <v-subheader>จำนวลเงิน</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field label="บาท" value="100.00" prefix="฿"  type ="number"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <v-subheader>จำนวลแต้ม</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field
                label="แต้ม"
                value="5.00"
                prefix="P"
                type ="number"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
        <v-card-actions>
        

          <v-btn color="green darken-1" text @click="dialog = false">
            ยกเลิก
          </v-btn>
  <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
           บันทึก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  }
};
</script>

<style></style>
