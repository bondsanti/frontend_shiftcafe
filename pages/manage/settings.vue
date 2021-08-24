<template>
  <div class="my-6 ma-6">
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="mx-auto rounded-xl" max-width="500" color="primary">
          <v-card-title>
            <h5 class="text-h5 white--text">
              ตั้งค่าการชำระเงิน
              <v-avatar class="mx-auto" size="60" max-width="90px" tile>
                <v-img src="/wallet.gif"></v-img>
              </v-avatar>
            </h5>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text class="white--text text-center">
            พิ่มวิธีการชำระเงิน
          </v-card-text>
          <v-divider color="white" class="mx-auto"></v-divider>
          <v-card-actions>
            <v-btn
              block
              class="primary--text rounded-xl"
              color="white"
              @click="goTopayment()"
            >
              ไปหน้าตั้งค่า
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!--  -->
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="mx-auto rounded-xl" max-width="500" color="primary">
          <v-card-title>
            <h5 class="text-h5 white--text ">
              ตั้งค่าและปรับแต่งเว็บ
              <v-avatar class="mx-auto" size="60" max-width="90px" tile>
                <v-img src="/wallet.gif"></v-img>
              </v-avatar>
            </h5>
            <v-spacer></v-spacer>
          </v-card-title>

          <v-card-text class="white--text text-center">
            ตั้งค่าและปรับแต่งเว็บ
          </v-card-text>
          <v-divider color="white" class="mx-auto"></v-divider>
          <v-card-actions>
            <v-btn
              block
              class="primary--text rounded-xl"
              color="white"
              @click="Customizer()"
            >
              ไปหน้าตั้งค่า
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <!--  -->
      <!--  -->
      <v-col cols="12" sm="6" md="4" lg="3">
        <setpayoutspoints :settings="settings" @refresh="refresh" />
      </v-col>
      <!--  -->
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="mx-auto rounded-xl" max-width="500" color="primary">
          <v-card-title>
            <h5 class="text-h5 white--text ">
              รายงานประจำวันที่
              <v-avatar class="mx-auto" size="60" max-width="90px" tile>
                <v-img src="/wallet.gif"></v-img>
              </v-avatar>
            </h5>
            <v-spacer></v-spacer>
          </v-card-title>

          <v-card-text class="white--text text-center">
            08:00 {{ formatDate(Date.now()) }} - 20:00
            {{ formatDate(Date.now()) }}
          </v-card-text>
          <v-divider color="white" class="mx-auto"></v-divider>
          <v-card-actions>
            <v-btn
              block
              class="primary--text rounded-xl"
              color="white"
              @click="dialogRe = true"
            >
              ตรวจสอบ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <Report :dialogRe="dialogRe" @closeRe="dialogRe = false" />
  </div>
</template>

<script>
import setpayoutspoints from "@/components/manage/settings/setpayoutspoints.vue";
import Customizer from "@/components/manage/settings/Customizer.vue";
import Report from "@/components/manage/settings/Report.vue";

export default {
  layout: "layoutManage",
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
    setpayoutspoints,
    Customizer,
    Report
  },
  async asyncData(context) {
    const [settings] = await Promise.all([context.$axios.$get("/setting")]);
    //console.log(settings);
    return { settings };
  },
  methods: {
    async refresh() {
      this.settings = await this.$axios.$get("/setting");
    },
    goTopayment() {
      this.$router.push("/manage/Bank");
    },
    Customizer() {
      this.$router.push("customizer");
    },
    formatDate(date) {
      this.$moment().format("LLLL");
      let strdate = this.$moment(date).add(543, "years");
      return this.$moment(strdate).format("DD MMMM YYYY ");
    }
  },
  data() {
    return {
      dialogRe: false
    };
  }
};
</script>

<style></style>
