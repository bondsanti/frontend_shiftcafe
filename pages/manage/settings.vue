<template>
  <div class="my-6 ma-6">
    <v-row no-gutters>
      <v-col cols="12" sm="4" md="4" class="pa-4">
        <setpayoutspoints />
      </v-col>
      <!-- <v-col cols="12" sm="4" md="4" class="pa-4">
         <setpayoutspoints />
      </v-col> -->


      <v-col cols="12" sm="4" md="4" class="pa-4">
        <v-hover v-slot="{ hover }" open-delay="300">
          <v-card
            class="pa-1 rounded-lg"
            color="primary"
            :elevation="hover ? 16 : 2"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h4">
                  ตั้งค่าการชำระเงิน
                </v-card-title>
                <v-card-subtitle> จะมาในอีกอนาคต.</v-card-subtitle>
                <v-card-actions>
                  <v-btn class="ml-2 mt-2" outlined roundedtext @click="goTopayment()">
                    ไปหน้าตั้งค่า
                  </v-btn>
                </v-card-actions>
              </div>
              <v-avatar class="mx-auto mt-7" size="105" max-width="90px" tile>
                <v-img src="/wallet.gif"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import setpayoutspoints from "@/components/manage/settings/setpayoutspoints.vue";

export default {
  head: {
    title: "ตั้งค่า"
  },
  middleware: ["auth", "check", "refresh", "checkChecker"],
  components: {
    setpayoutspoints
  },
  methods:{
   goTopayment(){
   this.$router.push('/manage/payment'); 
      }
  }
};
</script>

<style></style>
