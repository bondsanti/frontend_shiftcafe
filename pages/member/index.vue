<template>
  <div class="" style="height: 100%">
    <v-card class="py-5 px-5" style="height: 100%;" color="secondary">
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="3">
          <MenuProfile :loadData="loadData" />
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
                  {{ loadData._id }}
                </h4>
              </v-col>
            </v-row>
            <v-row no-gutters style="flex-wrap: nowrap">
              <v-col
                cols="6"
                class="flex-grow-0 flex-shrink-0 text-right text-red"
              >
                <h4 class="pa-2 " outlined tile>
                  <v-icon color="red darken-3" dense>mdi-lock </v-icon>
                  username
                </h4>
              </v-col>
              <v-col
                cols="6"
                style="min-width: 100px; max-width: 100%"
                class="flex-grow-1 flex-shrink-0"
              >
                <h4 class="pa-2 text-truncate text-red" outlined tile>
                  {{ loadData.tel }}
                </h4>
              </v-col>
            </v-row>
            <v-row no-gutters style="flex-wrap: nowrap">
              <v-col
                cols="6"
                class="flex-grow-0 flex-shrink-0 text-right text-red"
              >
                <h4 class="pa-2 " outlined tile>
                  <v-icon color="red darken-3" dense>mdi-eye-off </v-icon>
                  password
                </h4>
              </v-col>
              <v-col
                cols="6"
                style="min-width: 100px; max-width: 100%"
                class="flex-grow-1 flex-shrink-0"
              >
                <h4 class="pa-2 text-truncate text-red" color="" outlined tile>
                  {{ loadData.tel }}
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
                  {{ loadData.pname }} {{ loadData.fname }} {{ loadData.lname }}
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
                  {{ loadData.birthday | moment }}
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
                  {{ loadData.tel }}
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
                  {{ loadData.email }}
                </h4>
              </v-col>
            </v-row>

            <v-divider class="mt-3"></v-divider>
            <v-card-text>
              <div class="text-center grey lighten-5 mb-n5">
                คุณเป็นสมาชิกมาแล้ว
                <font color="#1976D2">
                  {{ getAgeDate(loadData.datetime) }}</font
                >
                วัน
                <br />
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
import MenuProfile from "~/components/memberLayout/MenuProfile";
export default {
  layout: "layoutMember",
  middleware: ["auth"],
  components: {
    MenuProfile
  },
  async asyncData(context) {
    const loadData = await context.$axios.$get(
      "/customer/" + context.$auth.user._id
    );
    console.log(loadData);
    //console.log(context.$auth.user);
    return { loadData };
  },

  methods: {
    getAgeDate(date) {
      const futureDate = moment()
        .date(Number)
        .format("YYYY/MM/D");
      //console.log(startDate);
      const endDate = moment(date).format("YYYY/MM/D");
      const diffInDays = moment(futureDate).diff(moment(endDate), "days");

      return diffInDays;
    }
  },
  filters: {
    moment: function(date) {
      // return moment(date).format('Do MMMM YYYY').add(543, 'years')
      var strdate = moment(date).add(543, "years");
      return moment(strdate).format("D/MM/YY");
    }
  }
};
</script>

<style>
.modal {
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.4);
}
.text-red {
  color: #c62828;
}
</style>
