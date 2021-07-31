<template>
  <div class="ma-3">
    <!-- view -->
    <v-dialog v-model="dialogView" max-width="400px">
      <v-card>
        <v-form>
          <v-card-title>
            <span class="text-h">
              <v-icon left> mdi-account-search</v-icon> ข้อมูลพนักงาน
            </span>
          </v-card-title>
          <v-divider class="mb-3"></v-divider>
          <v-card-text>
            <v-row v-for="(de, i) in detailArr" :key="i">
              <v-col cols="6" class="flex-grow-0 flex-shrink-0 text-center">
                <h4 class="text-left text-none">{{ de.name }}</h4>
              </v-col>
              <v-col cols="6" class="flex-grow-0 flex-shrink-0 text-center">
                <h4 class="text-center text-none">{{ de.value }}</h4>
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- view -->

    <v-card class="mx-auto mt-6  py-3" elevaation="5" justify-centaer>
      <v-card-title>
        <!-- ********************************************************************************************************************************************************************** -->
        <v-dialog v-model="dialogadd" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mr-5"
              v-bind="attrs"
              v-on="on"
              @click="addItem"
            >
              <v-icon left> mdi-card-account-details-outline </v-icon>
              จัดการพนักงาน
            </v-btn>
          </template>
        </v-dialog>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหา"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="employee"
        :search="search"
        :items-per-page="15"
        :footer-props="{
          'items-per-page-options': [15, 20, 30, 40, 50, -1],
           prevIcon: 'mdi-chevron-left',
          nextIcon: 'mdi-chevron-right',
          'items-per-page-text': 'ข้อมูลหน้าต่อไป'
        }"
      >
        <template v-slot:[`item.img`]="{}">
          <img
            src="@/assets/img/photo-5.jpg"
            class="mt-2 mb-2 rounded-circle"
            aspect-ratio="1"
            style="width: 40px; height: 40px"
          />
        </template>
        <template v-slot:top>
          <!-- ********************************************************************************************************************************************************************** -->
          <!-- add------------------dialogadd--------------------------------- -->
          <v-dialog v-model="dialogadd" max-width="650px">
            <v-card>
              <v-card-title>
                <span class="text-h5"
                  ><v-icon left>mdi-card-account-details-outline </v-icon>
                  เพิ่มข้อมูลพนักงาน</span
                >
              </v-card-title>

              <v-card-text>
                <v-form v-model="valid" ref="form">
                  <div>
                    <v-row>
                      <v-col cols="12">
                        <v-select
                          label="คำนำหน้า"
                          append-icon="mdi-account"
                          outlined
                          color="#1D1D1D"
                          :items="pnamesec"
                          v-model="employeeitmeadd.pname"
                          :rules="requiredRules"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-text-field
                          v-model="employeeitmeadd.username"
                          :rules="requiredRules"
                          label="username"
                          type="username"
                          append-icon="mdi-account"
                          outlined
                          required
                          color="#1D1D1D"
                          @keypress.enter="check"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="2"
                        class="justify-center align-center"
                      >
                        <v-btn color="warning" @click="check">ตรวจสอบ</v-btn>
                        <div class="mt-2 ml-4" v-if="usernametrue">
                          <span class="green--text ">ใช้ได้</span>
                        </div>
                        <div class="mt-2 ml-4" v-if="usernameErr">
                          <span class="red--text ">ซ้ำ</span>
                        </div>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="employeeitmeadd.password"
                          :rules="requiredRules"
                          label="password"
                          type="password"
                          outlined
                          required
                          color="#1D1D1D"
                          append-icon="mdi-lock"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="employeeitmeadd.fname"
                          :rules="requiredRules"
                          append-icon="mdi-rename-box"
                          label="ชื่อ"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="employeeitmeadd.lname"
                          :rules="requiredRules"
                          label="นามสกุล"
                          append-icon="mdi-rename-box"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <date-picker
                          class="my-datepicker"
                          placeholder="วันเกิด"
                          :rules="requiredRules"
                          :max="
                            new Date(
                              Date.now() -
                                new Date().getTimezoneOffset() * 60000
                            )
                              .toISOString()
                              .substr(0, 10)
                          "
                          min="1950-01-01"
                          v-model="employeeitmeadd.birthday"
                          valueType="format"
                        ></date-picker>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="employeeitmeadd.idcard"
                          :rules="numberRulesidcard"
                          append-icon="mdi-card-account-details-outline "
                          maxlength="13"
                          minlength="13"
                          type="number"
                          label="เลขบัตรประจำตัวประชาชน"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="employeeitmeadd.tel"
                          maxlength="10"
                          minlength="10"
                          :rules="numberRules"
                          append-icon="mdi-phone"
                          label="เบอร์โทรติดต่อ"
                          outlined
                          type="number"
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="employeeitmeadd.email"
                          label="อีเมล"
                          append-icon="mdi-email"
                          :rules="emailRules"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-textarea
                          rows="1"
                          v-model="employeeitmeadd.address"
                          :rules="requiredRules"
                          append-icon="mdi-map-marker"
                          label="ที่อยู่"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          label="ตำแหน่งงาน"
                          append-icon="mdi-briefcase"
                          outlined
                          color="#1D1D1D"
                          item-text="name"
                          item-value="_id"
                          :items="roleitme.flat()"
                          v-model="employeeitmeadd.ref_id_role"
                          :rules="requiredRules"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </div>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-btn class="ma-1" color="primary" dark @click="closeadd">
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-close-box
                  </v-icon>
                  ยกเลิก
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  class="ma-1"
                  color="info"
                  :disabled="!valid"
                  @click="
                    save();
                    showAlert();
                  "
                >
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-content-save
                  </v-icon>
                  บันทึกข้อมูลพนักงาน
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- --------------------------------------------------add -->
          <!-- ********************************************************************************************************************************************************************** -->

          <!-- edi------------------------------------------------------------------ -->
          <v-dialog v-model="dialog" max-width="600px">
            <v-card>
              <v-card-title>
                <span class="text-h5"
                  ><v-icon left>mdi-card-account-details-outline </v-icon>
                  แก้ไขข้อมูลพนักงาน</span
                >
              </v-card-title>

              <v-card-text>
                <v-form v-model="valid" ref="form">
                  <div>
                    <v-row>
                      <v-col cols="12">
                        <v-select
                          label="คำนำหน้า"
                         append-icon="mdi-account"
                          outlined
                          color="#1D1D1D"
                          :items="pnamesec"
                          v-model="employeeitme.pname"
                          :rules="rules"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-text-field
                          v-model="employeeitme.username"
                          :rules="rules"
                          disabled
                          label="username"
                          type="username"
                          append-icon="mdi-account"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="employeeitme.fname"
                          :rules="rules"
                          append-icon="mdi-rename-box"
                          label="ชื่อ"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="employeeitme.lname"
                          :rules="rules"
                          label="นามสกุล"
                          append-icon="mdi-rename-box"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6">
                     <date-picker
                         
                          placeholder="วันเกิด"
                          :rules="requiredRules"
                          :max="
                            new Date(
                              Date.now() -
                                new Date().getTimezoneOffset() * 60000
                            )
                              .toISOString()
                              .substr(0, 10)
                          "
                          min="1950-01-01"
                          v-model="employeeitme.birthday"
                          valueType="format"
                        ></date-picker>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="employeeitme.idcard"
                          :rules="numberRulesidcard"
                          append-icon="mdi-card-account-details-outline "
                          maxlength="13"
                          minlength="13"
                          type="number"
                          label="เลขบัตรประจำตัวประชาชน"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="employeeitme.tel"
                          maxlength="10"
                          minlength="10"
                          :rules="numberRules"
                          append-icon="mdi-phone"
                          label="เบอร์โทรติดต่อ"
                          outlined
                          type="number"
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="employeeitme.email"
                          label="อีเมล"
                          append-icon="mdi-email"
                          :rules="emailRules"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-textarea
                          v-model="employeeitme.address"
                          :rules="rules"
                          append-icon="mdi-map-marker"
                          label="ที่อยู่"
                          outlined
                          required
                          rows="1"
                          color="#1D1D1D"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          label="ตำแหน่งงาน"
                          append-icon="mdi-briefcase"
                          outlined
                          color="#1D1D1D"
                          item-text="name"
                          item-value="_id"
                          :items="roleitme.flat()"
                          v-model="employeeitme.ref_id_role"
                          :rules="rules"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </div>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-btn class="ma-1" color="primary" dark @click="close">
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-close-box
                  </v-icon>
                  ยกเลิก
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  class="ma-1"
                  color="info"
                  :disabled="!valid"
                  @click="
                    save();
                    showAlert();
                  "
                >
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-content-save
                  </v-icon>
                  บันทึกข้อมูลพนักงาน
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- -----------------------------------------edi-->

          <!-- password--------------------------------------------- -->
          <v-dialog v-model="dialogpass" max-width="400px">
            <v-card>
              <v-card-title>
                <span class="text-h5"
                  ><v-icon left> mdi-card-account-details-outline </v-icon>
                  เปลียนรหัสผ่าน</span
                >
              </v-card-title>

              <v-card-text>
                <v-form v-model="valid" ref="form">
                  <div>
                    <v-row>
                      <v-col cols="12"> </v-col>

                      <v-col cols="12" sm="12">
                        <v-text-field
                          v-model="employeeitmeadd.password"
                          :rules="requiredRules"
                          label="PASSWORD"
                          type="password"
                          outlined
                          required
                          color="#1D1D1D"
                           append-icon="mdi-lock"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                </v-form>
              </v-card-text>
              <v-card-text>
                <v-alert outlined prominent border="left" type="warning">
                  โปรดตวรจสอบให้ดีก่อนบันทึกข้อมูล
                </v-alert>
              </v-card-text>
              <v-card-actions>
                <v-btn class="ma-1" color="primary" dark @click="closePass">
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-close-box
                  </v-icon>
                  ยกเลิก
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  class="ma-1"
                  color="info"
                  :disabled="!valid"
                  @click="
                    save();
                    showAlert();
                  "
                >
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-content-save
                  </v-icon>
                  บันทึก
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- ---------------------------------------------------password -->

          <!-- ********************************************************************************************************************************************************************** -->

          <!-- delete------------------------------------------------ -->
          <v-dialog v-model="dialogDelete" max-width="270px">
            <v-card>
              <v-card-title class="text-h5 white--text  primary">
                แน่ใจแล้วใช่มั้ยที่จะลบ
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="info" class="ma-2" @click="closeDelete">
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-close-box f </v-icon
                  >ยกเลิก</v-btn
                >
                <v-btn
                  color="primary"
                  class="ma-2"
                  @click="
                    deleteItemConfirm();
                    showAlert();
                  "
                >
                  <v-icon aria-hidden="false" class="mx-4">
                    mdi-delete-forever</v-icon
                  >ยืนยัน</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- ----------------------------------------------------------delete -->
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn class="mr1" small color="warning" @click="editItem(item)">
            <v-icon aria-hidden="false" class="mx-1">
              mdi-pencil
            </v-icon>
            แก้ไข
          </v-btn>
          <v-btn
            rounded-pill
            class="mr-1"
            color="error"
            small
            @click="deleteItem(item)"
          >
            <v-icon dark class="mx-2">
              mdi-delete-forever
            </v-icon>
            ลบ
          </v-btn>
        </template>
        <!-- btn-edi-pass--------------------------------------------------- -->
        <template v-slot:[`item.pasword`]="{ item }">
          <v-btn small color="#03A9F4" @click="editItemPass(item)">
            <div class="d-block  white--text">
              <v-icon aria-hidden="false">
                mdi-lock
              </v-icon>
              เปลียนรหัสผ่าน
            </div>
          </v-btn>
        </template>
        <!-- --------------------------------------------------btn edi pass -->
        <!-- btn-view--------------------------------------------------- -->
        <template v-slot:[`item.view`]="{ item }">
          <v-btn class="mr1" small color="teal" @click="Detail(item)">
            <div class="d-block  white--text">
              <v-icon aria-hidden="false">
                mdi-eye
              </v-icon>
              ดูข้อมูล
            </div>
          </v-btn>
        </template>
        <!-- ----------------- ---------------------------------btn view -->
        <template v-slot:[`item.No`]="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:[`item.pname`]="{ item }">
          <v-chip :color="getPnameColor(item.pname)" dark small>
            {{ item.pname }}
          </v-chip>
        </template>
        <template v-slot:[`item.fname`]="{ item }">
          {{ item.fname }}
        </template>
        <template v-slot:[`item.lname`]="{ item }">
          {{ item.lname }}
        </template>
        <template v-slot:[`item.username`]="{ item }">
          <v-icon class="ma-2 ml-2" color="primary">
           mdi-identifier
          </v-icon>
          {{ item.username }}
        </template>
        <template v-slot:[`item.birthday`]="{ item }">
          <span>{{ item.birthday | moment }}</span>
        </template>
        <template v-slot:[`item.ref_id_role.position`]="{ item }">
          <v-chip :color="getColor(item.ref_id_role.position)" dark small>
            {{ getTxt(item.ref_id_role.position) }}
          </v-chip>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="employee">
            Reset(ข้อมูลไม่โหลด)
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/th";

import DatePicker from "vue2-datepicker";
import "@/assets/css/datepicker.css";
import 'vue2-datepicker/locale/th'

export default {
  data: () => ({
    //
    dialog: false,
    dialogpass: false,
    dialogDelete: false,
    dialogadd: false,
    dialogView: false,
    detailArr: [],
    //
    rules: [value => !!value || "โปรดกรอกข้อมูลให้ครบถ้วน"],
    valid: true,
    search: "",
    roleitme: [],
    pnamesec: ["นาย", "นาง", "นางสาว", "Guest"],
    headers: [
      { text: "ลำดับ", sortable: false, value: "No" },
      { text: "คำนำหน้า", align: "start", value: "pname" },
      { text: "ชื่อ", align: "start", value: "fname" },
      { text: "นามสกุล", align: "start", value: "fname" },
      // { text: "ภาพ", sortable: false, value: "img" },
      { text: "ไอดีใช้เข้าระบบ", align: "start", value: "username" },
      { text: "ตำแหน่ง", align: "start", value: "ref_id_role.position" },
      //{ text: "เลขบัตรประชาชน", align: "start", value: "idcard" },
      // { text: "นามสกุล", align: "start", value: "lname"},
      // { text: "วันเกิด", align: "start", value: "birthday" },
      // { text: "เบอร์โทร", align: "start", value: "tel" },
      // { text: "อีเมล์", align: "start", value: "email" },
      //  { text: "ที่อยู่", align: "start", value: "address" },
      { text: "ข้อมูลส่วนตัว", value: "view", sortable: false },
      { text: "เปลียนรหัสผ่าน", value: "pasword", sortable: false },
      { text: "หมายเหตุ", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    employeeitme: {
      _id: "",
      username: "null",
      pname: "",
      ref_id_role: "",
      idcard: " ",
      fname: "",
      lname: "",
      birthday: "",
      tel: " ",
      email: "",
      address: ""
    },
    employeeitmeadd: {
      _id: "",
      username: "null",
      pname: "",
      ref_id_role: "",
      idcard: " ",
      fname: "",
      lname: "",
      birthday: "",
      tel: " ",
      email: "",
      address: ""
    },
    type: null,
    deleteId: null,
    requiredRules: [
      v => !!v || "โปรดกรอกข้อความให้ครบในช่อง!",
      v => (v && v.length <= 280) || "ชื่อไม่ควรเกิน 280 ตัวอักษร"
    ],
    emailRules: [
      v => !!v || "โปรดกรอกข้อความให้ครบในช่อง!",
      v =>
        !v ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "โปรใส่อีเมลให้ถูกต้อง"
    ],
    numberRules: [
      v => !!v || "โปรดกรอกข้อความให้ครบในช่อง!",
      v => (/\d{9,10}/.test(v) && v.length <= 10) || "เบอร์โทรศัพท์ไม่ถูกต้อง",
      v => Number.isInteger(Number(v)) || "ใส่ตัวเลขเท่านั้น!"
    ],
    numberRulesidcard: [
      v => !!v || "โปรดกรอกข้อความให้ครบในช่อง!",
      v => v.length <= 13 || "ใส่ตัวเลขเกิน13ตัว",
      v => v.length >= 13 || "ใส่ตัวเลขไม่ถึง13ตัว",
      v => Number.isInteger(Number(v)) || "ใส่ตัวเลขเท่านั้น!"
    ],
    usernametrue: false,
    usernameErr: false
  }),
  components: { DatePicker },
  computed: {},
  filters: {
    moment: function(date) {
      var strdate = moment(date).add(543, "years");
      return moment(strdate).format("D/MM/YY");
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogpass(val) {
      val || this.closePass();
    },
    dialogadd(val) {
      val || this.closeadd();
    }
  },
  created() {
    this.improverole();
  },

  mounted() {
    this.toast = this.$swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000
    });
  },
  methods: {
    moment2(date) {
      // moment.locale('th');
      var strdate = moment("th").format("LLLL");
      var strdate = moment(date).add(543, "years");
      return moment(strdate).format("DD MMMM YYYY ");
    },
    async check() {
      const cus = await this.$axios.$get(
        "/employee/" + this.employeeitmeadd.username
      );
      if (cus.length > 0) {
        this.usernameErr = true;
        this.usernametrue = false;
      } else {
        this.usernameErr = false;
        this.usernametrue = true;
      }
      //return { category };
    },
    showAlert() {
      this.toast({
        type: "success",
        title: "ดำเนิการสำเร็จ"
      });
      this.text_val_for_test = Date.now();
    },
    someFn(ev) {
      console.log(ev);
    },
    editItemPass(item) {
      this.type = "edit";
      this.employeeitme = item;
      this.dialogpass = true;
      this.improverole;
    },
    editItem(item) {
      this.type = "edit";
      this.employeeitme = item;
      this.dialog = true;
      this.improverole;
    },
    addItem() {
      this.type = "add";
      this.employeeitmeadd = {
        _id: "",
        username: "",
        password: "",
        pname: "",
        ref_id_role: "",
        idcard: " ",
        fname: "",
        lname: "",
        birthday: "",
        tel: " ",
        email: "",
        address: ""
      };
      this.dialogadd = true;
    },
    deleteItem(item) {
      this.deleteId = item._id;
      this.editedIndex = this.employee.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.employee.splice(this.editedIndex, 1);
      this.$axios.$delete("/employee/" + this.deleteId).then(() => {});
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },
    closePass() {
      this.dialogpass = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },
    closeadd() {
      this.dialogadd = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },
    improverole() {
      for (let i in this.role) {
        let roles = {
          _id: this.role[i]._id,
          name: this.role[i].position
        };
        this.roleitme.push(roles);
      }
    },

    getColor(status) {
      if (status === "cashier") return "green";
      else if (status === "manager") return "#F44336";
      else if (status === "checker") return "orange";
      else if (status === "admin") return "#673AB7";
      else if (status === "staff") return "#03A9F4";
      return "primary";
    },
    getPnameColor(status) {
      if (status === "นาย") return "#03A9F4";
      else if (status === "นางสาว") return "#F06292";
      else if (status === "นาง") return "#F06292";
      return "#FFCC80";
    },
    getTxt(status) {
      if (status === "cashier") return "แคชเชียร์";
      else if (status === "manager") return "ผู้จัดการ";
      else if (status === "checker") return "ผู้ตรวจสอบ";
      else if (status === "admin") return "แอดมิน";
      else if (status === "staff") return "พนักงาน";
      else return "ผู้เยียมชม";
    },
    Detail(item) {
      this.itemBy = item;
      this.detailArr = [
        {
          name: "Username",
          value: item.username
        },
        {
          name: "ชื่อ-นามสกุล",
          value: item.pname + "  " + item.fname + " " + item.lname
        },
        {
          name: "ตำแหน่ง",
          value: this.getTxt(item.ref_id_role.position)
        },
        {
          name: "รหัสบัตรประชาชน",
          value: item.idcard
        },
        {
          name: "วันเกิด",
          value: this.moment2(item.birthday)
        },
        {
          name: "เบอร์มือถือ",
          value: item.tel
        },

        {
          name: "อีเมล์",
          value: item.email
        },
        {
          name: "ที่อยู่",
          value: item.address
        }
      ];

      this.dialogView = true;
    },

    save() {
      this.$refs.form.validate();
      if (this.type === "add") {
        this.loading = true;

        this.$emit("addEmployee", { ...this.employeeitmeadd });
        this.closeadd();
      } else {
        this.loading = true;
        this.$axios
          .$put(
            "/employee/" + this.employeeitme._id,
            this.employeeitme,
            this.improverole
          )
          .then(() => {
            this.$emit("refresh");
            this.closePass();
            this.close();
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  },
  props: ["employee", "role"]
};
</script>
