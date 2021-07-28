<template>
  <div class="" style="height: 100%">
    <v-card class="py-5 px-5" style="height: 100%;" color="secondary">
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="3">
          <MenuProfile :loadData="loadData" :storyBuy="storyBuy" />
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
                  {{ loadData.member_no }}
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
                  {{ loadData.password }}

                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="red"
                        fab
                        x-small
                        dark
                        class="mx-auto"
                        v-bind="attrs"
                        v-on="on"
                        @click="dialog = !dialog"
                      >
                        <v-icon> mdi-pencil </v-icon>
                      </v-btn>
                    </template>
                    <span>แก้ไขรหัสผ่าน</span>
                  </v-tooltip>
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
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-form>
            <v-card-title class="text-h5 red lighten-3"
              >แก้ไขรหัสผ่าน</v-card-title
            >
            <v-card-text>
              <v-col cols="12" md="12" class="mt-7 mb-n6">
                <v-text-field
                  outlined
                  label="รหัสผ่านเดิม"
                  required
                  v-model="loadData.password"
                  color="red"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12" class="">
                <v-text-field
                  outlined
                  label="รหัสผ่านใหม่"
                  required
                  v-model="formEdit.password"
                  color="red"
                ></v-text-field>
              </v-col>
            </v-card-text>
            <v-divider class="mt-n3"></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="close">
                <v-icon left> mdi-close </v-icon>ปิด
              </v-btn>
              <v-btn color="primary" @click="editData(loadData)">
                <v-icon left> mdi-content-save </v-icon>บันทึก
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
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
  data() {
    return {
      dialog: false,
      formEdit: {
        password: ""
      }
    };
  },
  initialize() {},

  async asyncData(context) {
    const loadData = await context.$axios.$get(
      "/customer/" + context.$auth.user._id
    );
    const storyBuy = await context.$axios.$get(
      "/payment/customer/" + context.$auth.user._id
    );
    //console.log(loadData);
    //console.log(context.$auth.user);
    return { loadData, storyBuy };
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
    },
    close() {
      this.dialog = false;
      this.formEdit.password = "";
    },
    async editData() {
      //console.log(this.formEdit);

      if (this.formEdit.password === "") {
        this.$swal({
          type: "error",
          title: "กรุณากรอกรหัสผ่านใหม่!"
        });
        this.formEdit.password = "";
        this.dialog = false;
      } else {
        this.$axios
          .$put("/customer/" + this.loadData._id, {
            ...this.loadData,
            password: this.formEdit.password
          })
          .then(res => {
            this.loadData.password = this.formEdit.password;
            this.formEdit.password = "";
            this.$swal({
              type: "success",
              title: "เปลี่ยนรหัสผ่านสำเร็จ!"
            });
            this.dialog = false;
          });
      }
    }
  },
  filters: {
    moment: function(date) {
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
