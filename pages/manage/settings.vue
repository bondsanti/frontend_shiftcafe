<template>
  <div class="my-6 ma-6">
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="mx-auto rounded-xl" max-width="500" color="primary">
          <v-card-title>
            <h5 class="text-h5 white--text">
              ตั้งค่าการชำระเงิน
              <v-avatar class="mx-auto" size="60" max-width="90px" tile>
                <v-img src="/credit-card.png"></v-img>
              </v-avatar>
            </h5>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text class="white--text text-center">
            เพิ่มวิธีการชำระเงิน
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
                <v-img src="/settings.png"></v-img>
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
              รายงานขายสินค้า
              <v-avatar class="mx-auto" size="60" max-width="90px" tile>
                <v-img src="/ds.png"></v-img>
              </v-avatar>
            </h5>
            <v-spacer></v-spacer>
          </v-card-title>

          <v-card-text class="white--text text-center">
            {{ item.map(i => i) }}
          </v-card-text>
          <v-divider color="white" class="mx-auto"></v-divider>
          <v-card-actions>
            <v-btn
              block
              class="primary--text rounded-xl"
              color="white"
              @click="dialogPhylum = true"
            >
              เลือกประเภทรายงาน
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-dialog v-model="dialogPre" max-width="500px" persistent>
        <v-stepper v-model="e1" class=" rounded-xl">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">
              เลือกประเภทรายงาน
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">
              แยกตาม
            </v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 3" step="3">
              เลือกวันที่
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-autocomplete
                :items="item"
                v-model="reportType"
                outlined
                dense
                chips
                small-chips
                label="โปรดเลือกประเภทรายงาน"
                class="ma-2"
              ></v-autocomplete>

              <v-btn color="primary" class="ma-2 rounded-xl" @click="e1 = 2">
                ถัดไป
              </v-btn>

              <v-btn
                text
                @click="
                  dialogPre = false;
                  e1 = 1;
                "
              >
                ยกเลิก
              </v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-autocomplete
                :items="item2"
                v-model="reportType"
                outlined
                dense
                chips
                small-chips
                label="โปรดเลือกประเภทรายงาน"
                class="ma-2"
              ></v-autocomplete>

              <v-btn color="primary" class="ma-2 rounded-xl" @click="e1 = 3">
                ถัดไป
              </v-btn>

              <v-btn
                text
                @click="
                  dialogPre = false;
                  e1 = 1;
                "
              >
                ยกเลิก
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="โปรดเลือกวันที่"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    ยกเลิก
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">
                    ตกลง
                  </v-btn>
                </v-date-picker>
              </v-menu>

              <v-btn color="primary" @click="confirmReport">
                ยืนยัน
              </v-btn>

              <v-btn
                text
                @click="
                  dialogPre = false;
                  e1 = 1;
                "
              >
                ยกเลิก
              </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-dialog>
    </v-row>
    <Report
      ref="report"
      :dialogDay="dialogDay"
      @closeRe="dialogDay = false"
      :daytime="date"
    />
    <report-month
      ref="reportMonth"
      :dialogMonth="dialogMonth"
      @closeRe="dialogMonth = false"
      :daytime="date"
    />
    <report-by-phylum
      :dialogPhylum="dialogPhylum"
      @closeRe="dialogPhylum = false"
    />
  </div>
</template>

<script>
import setpayoutspoints from "@/components/manage/settings/setpayoutspoints.vue";
import Customizer from "@/components/manage/settings/Customizer.vue";
import Report from "@/components/manage/settings/Report.vue";
import ReportMonth from "@/components/manage/settings/ReportMonth.vue";
import ReportByPhylum from "@/components/manage/settings/ReportByPhylum.vue";

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
    Report,
    ReportMonth,
    ReportByPhylum
  },
  async asyncData(context) {
    const [settings, payments] = await Promise.all([
      context.$axios.$get("/setting"),
      context.$axios.$get("/payment-year")
    ]);
    //console.log(settings);
    return { settings, payments };
  },
  methods: {
    confirmReport() {
      if (this.reportType === "ประจำวัน") {
        this.filterPayment();
        this.$refs.report.makeReport(this.paymentToday);
        this.dialogDay = true;
        this.dialogPre = false;
        this.e1 = 1;
        this.reportType = "ประจำวัน";
      } else {
        this.filterPaymentMonth();
        this.$refs.reportMonth.makeReport(this.paymentMonth);
        this.dialogMonth = true;
        this.dialogPre = false;
        this.e1 = 1;
        this.reportType = "ประจำวัน";
      }
    },
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
    },
    filterPayment() {
      let date = new Date(this.date);
      const day = this.payments.filter(d => {
        return (
          new Date(d.datetime).getDate() === date.getDate() &&
          new Date(d.datetime).getMonth() === date.getMonth() &&
          new Date(d.datetime).getFullYear() === date.getFullYear()
        );
      });
      this.paymentToday = day;
      //console.log(this.paymentToday);
    },
    filterPaymentMonth() {
      let date = new Date(this.date);
      let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const month = this.payments.filter(y => {
        return (
          new Date(y.datetime).getTime() >= firstDay.getTime() &&
          new Date(y.datetime).getTime() <= lastDay.getTime()
        );
      });
      this.paymentMonth = month;
    }
  },
  data() {
    return {
      reportType: "ประจำวัน",
      dialogDay: false,
      dialogMonth: false,
      dialogPhylum: false,
      paymentToday: [],
      paymentMonth: [],
      dialogPre: false,
      e1: 1,
      item: ["ประจำวัน", "ประจำเดือน"],
      item2: ["ชนิดสินค้า", "หมวดหมู่สินค้า"],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false
    };
  },
  created() {
    //this.filterPayment();
    //console.log(this.payments);
  }
};
</script>

<style></style>
