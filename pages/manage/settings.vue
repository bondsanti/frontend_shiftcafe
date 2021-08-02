<template>
  <div class="my-6 ma-6">
    <v-row no-gutters>
      <v-col cols="12" sm="4" md="4" class="pa-2">
        <v-hover v-slot="{ hover }" open-delay="300">
          <v-card
          
            class="pa-1 rounded-lg"
            color="primary"
            :elevation="hover ? 16 : 15"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h5">
                  ตั้งค่าการชำระเงิน
                </v-card-title>
                <v-card-subtitle>
                  
                   เพิ่มวิธีการชำระเงินสำรองสำหรับการใช้บริการ</v-card-subtitle>
                <v-card-actions>
                  <v-btn class="ml-2 mt-8" outlined roundedtext @click="goTopayment()">
                    ไปหน้าตั้งค่า
                  </v-btn>
                </v-card-actions>
              </div>
              <v-avatar class="mx-auto mt-7" size="95" max-width="90px" tile>
                <v-img src="/wallet.gif"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-hover>
      </v-col>

      <!--  -->
       <v-col cols="12" sm="4" md="4" class="pa-2">
        <setpayoutspoints />
      </v-col>

    </v-row>
  </div>
</template>

<script>
import setpayoutspoints from "@/components/manage/settings/setpayoutspoints.vue";

export default {
  head() {
    return {
      titleTemplate: `${this.$store.getters["setting"][0].head_title}  | %s`,
      title: "ตั้งค่า",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$store.getters["setting"][0].sub_title
        }
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: `${this.$nuxt.context.env.config.IMG_URL}${this.$store.getters["setting"][0].logo}`
        }
      ]
    };
  },
  middleware: ["auth", "check", "refresh", "checkChecker"],
  components: {
    setpayoutspoints
  },
  methods: {
    goTopayment() {
      this.$router.push("/manage/Bank");
    }
  }
};

</script>

<style>

</style>
