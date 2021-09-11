<template>
  <div class="ma-3">
    <!-- 1 -->
    <v-dialog v-model="dialogView" max-width="500px">
      <v-card>
        <v-form>
          <v-card-title>
            <span class="text-h">
              <v-icon left> mdi-ticket-percent-outline</v-icon>ชื่อคูปอง
              {{ itemBy.codename }}
            </span>
          </v-card-title>
          <v-divider class="mb-3"></v-divider>
          <v-card-text>
            <v-row v-for="(de, i) in detailArr" :key="i">
              <v-col cols="6" class="flex-grow-0 flex-shrink-0 text-center">
                <h4 class="text-left">{{ de.name }}</h4>
              </v-col>
              <v-col cols="6" class="flex-grow-0 flex-shrink-0 text-center">
                <h4 class="text-center">{{ de.value }}</h4>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class="mb-3"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialogView = false">
              ปิด
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- 1 -->
    <v-card
      class="mx-auto mt-6  py-3 rounded-xl"
      elevaation="5"
      justify-centaer
    >
      <v-card-title>
        <v-btn
          color="primary"
          dark
          class="mr-5 rounded-xl mb-2 "
          elevation="10"
          @click="addItem"
        >
          <v-icon left> mdi-ticket-percent-outline</v-icon> เพิ่มคูปอง
        </v-btn>

        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหา"
          single-line
          class="rounded-xl"
          solo
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="coupon"
        :search="search"
        :items-per-page="10"
        :sort-by="['codename']"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50, -1],
          prevIcon: 'mdi-chevron-left',
          nextIcon: 'mdi-chevron-right',
          'items-per-page-text': 'ข้อมูลหน้าต่อไป'
        }"
      >
        <template v-slot:top>
          <!--------------------------------------------------- add -------------------------->
          <v-dialog v-model="dialog" max-width="700px">
            <v-card>
              <v-card-title>
                <span class="text-h5">
                  <v-icon left> mdi-ticket-percent-outline </v-icon>
                  เพิ่มข้อมูลคูปอง
                </span>
              </v-card-title>
              <v-form v-model="valid" ref="form">
                <v-card-text>
                  <div>
                    <v-row>
                      <v-col cols="12"> </v-col>
                      <v-col cols="6" md="10" sm="9">
                        <v-text-field
                          outlined
                          label="ชื่อคูปอง"
                          :rules="rules"
                          v-model="couponitem.codename"
                          color="primary"
                          @keypress.enter="check"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="6"
                        sm="2"
                        class="justify-center align-center"
                      >
                        <v-btn
                          @click="check"
                          class="mr-1 rounded-xl"
                          elevation="10"
                          color="warning"
                        >
                          ตรวจสอบ</v-btn
                        >
                        <div class="mt-2 ml-4" v-if="nametrue">
                          <span class="green--text ">ใช้ได้</span>
                        </div>
                        <div class="mt-2 ml-4" v-if="nameErr">
                          <span class="red--text ">ซ้ำ</span>
                        </div>
                      </v-col>
                      <v-col cols="12" md="12" sm="12">
                        <v-select
                          label="ออกให้"
                          outlined
                          color="primary"
                          item-text="name"
                          item-value="_id"
                          :items="Empname.flat()"
                          v-model="couponitem.ref_emp_id"
                          :rules="rules"
                        ></v-select>
                      </v-col>

                      <v-col cols="12" md="6" sm="6">
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="couponitem.start"
                              :rules="rules"
                              label="วันที่เริ่มใช้"
                              append-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              outlined
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="couponitem.start"
                            :rules="rules"
                            locale="th"
                            elevation="10"
                            :active-picker.sync="activePicker"
                            min="1950-01-01"
                            @input="menu = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" md="6" sm="6">
                        <v-menu
                          ref="menu"
                          v-model="menu2"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="couponitem.end"
                              :rules="rules"
                              label="วันหมดอายุ"
                              append-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              outlined
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="couponitem.end"
                            :rules="rules"
                            @input="menu2 = false"
                            elevation="10"
                            locale="th"
                            :active-picker.sync="activePicker2"
                            min="1950-01-01"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" md="6" sm="6">
                        <v-select
                          label="ส่วนลดในคูปอง"
                          outlined
                          color="primary"
                          :items="discount"
                          v-model="couponitem.discount"
                          :rules="rules"
                          type="number"
                        ></v-select>
                      </v-col>

                      <v-col cols="12" md="6" sm="6">
                        <v-text-field
                          outlined
                          label="จำนวลคูปองที่สมารถใช้ได้ต่อครั้ง"
                          v-model="couponitem.num_use"
                          :rules="rules"
                          type="number"
                          color="primary"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" class="mt-n7">
                        <v-textarea
                          outlined
                          v-model="couponitem.detail"
                          :rules="rules"
                          clearable
                          label="รายละเอียดส่วนลด"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>
              </v-form>
              <v-card-actions>
                <v-btn
                  class="ma-1 rounded-xl"
                  elevation="10"
                  color="primary"
                  dark
                  @click="close"
                >
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-close-box
                  </v-icon>
                  ยกเลิก
                </v-btn>

                <v-spacer></v-spacer>
                <v-btn
                  class="ma-1 rounded-xl"
                  elevation="10"
                  color="info"
                  :disabled="!valid"
                  @click="save()"
                >
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-content-save
                  </v-icon>
                  เพิ่มข้อมูลคูปอง
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!--------------------------------------------------- add -------------------------->

          <!--------------------------------------------------- edit -------------------------->
          <v-dialog v-model="dialogedit" max-width="700px" persistent>
            <v-card>
              <v-form ref="form">
                <v-card-title>
                  <span class="text-h5">
                    <v-icon left> mdi-ticket-percent-outline </v-icon>
                    แก้ไขคูปอง
                  </span>
                  <v-btn text color="error" class="mr-4" @click="reset"
                    >รีเซ็ตแบบฟอร์ม
                  </v-btn>
                </v-card-title>

                <v-card-text>
                  <div>
                    <v-row>
                      <v-col cols="12"> </v-col>
                      <v-col cols="6" md="9" sm="9" xs="6">
                        <v-text-field
                          outlined
                          label="ชื่อคูปอง"
                          v-model="couponitem.codename"
                          @keypress.enter="check"
                          color="primary"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="6"
                        sm="2"
                        class="justify-center align-center"
                      >
                        <v-btn @click="check" color="warning"> ตรวจสอบ</v-btn>
                        <div class="mt-2 ml-2" v-if="nametrue">
                          <span class="green--text ">ใช้ได้</span>
                        </div>
                        <div class="mt-2 ml-2" v-if="nameErr">
                          <span class="red--text ">ซ้ำ</span>
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          label="ออกให้"
                          outlined
                          color="primary"
                          item-text="name"
                          item-value="_id"
                          :items="Empname.flat()"
                          v-model="couponitem.ref_emp_id"
                        ></v-select>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-menu
                          ref="menu"
                          v-model="menu3"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-x
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="couponitem.start"
                              label="วันเริ่มใช้"
                              append-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              outlined
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="couponitem.start"
                            @input="menu3 = false"
                            elevation="10"
                            locale="th"
                            :active-picker.sync="activePicker3"
                            min="1950-01-01"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-menu
                          ref="menu"
                          v-model="menu4"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-x
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="couponitem.end"
                              label="วันหมุดอายุ"
                              append-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              outlined
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="couponitem.end"
                            locale="th"
                            @input="menu4 = false"
                            elevation="10"
                            :active-picker.sync="activePicker4"
                            min="1950-01-01"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-select
                          label="ส่วนลดในคูปอง"
                          outlined
                          color="primary"
                          :items="discount"
                          v-model="couponitem.discount"
                        ></v-select>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-text-field
                          outlined
                          label="จำนวลคูปองที่สมารถใช้ได้ต่อครั้ง"
                          v-model="couponitem.num_use"
                          type="number"
                          color="primary"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          label="ปรับสถานะคูปอง"
                          outlined
                          color="primary"
                          :items="status"
                          v-model="couponitem.status"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" class="mt-n7">
                        <v-textarea
                          outlined
                          v-model="couponitem.detail"
                          :rules="rules"
                          clearable
                          label="รายละเอียดส่วนลด"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>

                <v-card-actions>
                  <v-btn class="ma-1" color="primary" dark @click="closeedit">
                    <v-icon aria-hidden="false" class="mx-2">
                      mdi-close-box
                    </v-icon>
                    ยกเลิก
                  </v-btn>

                  <v-spacer></v-spacer>
                  <v-btn class="ma-1" color="info" @click="save()">
                    <v-icon aria-hidden="false" class="mx-2">
                      mdi-content-save
                    </v-icon>
                    เพิ่มข้อมูล
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
          <!--------------------------------------------------- edit -------------------------->

          <v-dialog v-model="dialogDelete" max-width="310px">
            <v-card>
              <v-card-title class=" white--text  primary">
                <p class="text-center">
                  คุณแน่ใจแล้วใช้มั้ยที่จะลบข้อมูล
                </p>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="info" small class="ma-2" @click="closeDelete">
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-close-box </v-icon
                  >ยกเลิก
                </v-btn>
                <v-btn
                  small
                  color="primary"
                  class="ma-2"
                  @click="deleteItemConfirm()"
                >
                  <v-icon aria-hidden="false" class="mx-4">
                    mdi-delete-forever </v-icon
                  >ลบ
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            small
            class=" white--text mb-2 rounded-xl "
            color="teal"
            @click="Detail(item)"
          >
            <v-icon aria-hidden="false" class="">
              mdi-eye-settings-outline
            </v-icon>
            ดูข้อมูล
          </v-btn>

          <v-btn
            small
            class="mb-2 rounded-xl "
            color="warning"
            @click="editItem(item)"
          >
            <v-icon aria-hidden="false" class="">
              mdi-pencil
            </v-icon>
            แก้ไข
          </v-btn>

          <v-btn
            rounded-lx
            class="mb-2 rounded-xl "
            color="error"
            small
            @click="deleteItem(item)"
          >
            <v-icon dark class="">
              mdi-delete-forever
            </v-icon>
            ลบ
          </v-btn>
        </template>
        <template v-slot:[`item.No`]="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:[`item.end`]="{ item }">
          <span>{{ item.end | moment }}</span>
        </template>
        <template v-slot:[`item.start`]="{ item }">
          <span>{{ item.start | moment }}</span>
        </template>
        <template v-slot:[`item.discount`]="{ item }">
          <v-chip :color="getColorstatus(item.discount)" dark small>
            <v-icon class="ma-2 ml-1" color="">
              mdi-brightness-percent
            </v-icon>
            {{ item.discount }}
          </v-chip>
        </template>
        <template v-slot:[`item.num_use`]="{ item }">
          <v-chip :color="getColorstatususe(item.num_use)" dark small>
            <v-icon class="ma-2 ml-1" color="">
              mdi-account
            </v-icon>
            {{ item.num_use }}
          </v-chip>
        </template>

        <template v-slot:[`item.status`]="{ item }">
          <v-chip :color="getColor(item.status)" dark small>
            {{ getTxt(item.status) }}
          </v-chip>
        </template>

        <template v-slot:no-data>
          <v-btn color="primary" @click="coupon">
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/th";

export default {
  data: () => ({
    rules: [value => !!value || "โปรดกรอกข้อมูลให้ครบถ้วน"],
    valid: true,
    //
    activePicker: null,
    activePicker2: null,
    activePicker3: null,
    activePicker4: null,
    menu: false,
    menu2: false,
    menu3: false,
    menu4: false,
    //
    select: null,
    detailArr: [],
    dialog: false,
    dialogView: false,
    dialogedit: false,
    dialogDelete: false,

    search: "",
    // rules
    //

    Empname: [],
    useronline: [],
    nameErr: false,
    nametrue: true,
    status: [
      {
        text: "รอใช้งาน",
        value: 0
      },
      {
        text: "เริ่มใช้งาน",
        value: 1
      },
      {
        text: "หมดอายุ",
        value: 2
      },
      {
        text: "ยกเลิก",
        value: 3
      }
    ],
    discount: [
      {
        text: "1%",
        value: 1
      },
      {
        text: "2%",
        value: 2
      },
      {
        text: "3%",
        value: 3
      },
      {
        text: "4%",
        value: 4
      },
      {
        text: "5%",
        value: 5
      },
      {
        text: "6%",
        value: 6
      },
      {
        text: "7%",
        value: 7
      },
      {
        text: "8%",
        value: 8
      },
      {
        text: "9%",
        value: 9
      },
      {
        text: "10%",
        value: 10
      },
      {
        text: "11%",
        value: 11
      },
      {
        text: "12%",
        value: 12
      },
      {
        text: "13%",
        value: 13
      },
      {
        text: "14%",
        value: 14
      },
      {
        text: "15%",
        value: 15
      },
      {
        text: "16%",
        value: 16
      },
      {
        text: "17%",
        value: 17
      },
      {
        text: "18%",
        value: 18
      },
      {
        text: "19%",
        value: 19
      },
      {
        text: "20%",
        value: 20
      }
    ],

    headers: [
      {
        text: "ลำดับ",
        sortable: false,
        value: "No"
      },
      {
        text: "ชื่อคูปอง",
        value: "codename"
      },
      // {
      //   text: "วันที่เริ่มใช้งาน",
      //   align: "start",
      //   value: "start"
      // },
      // {
      //   text: "วันหมดอายุ",
      //   align: "start",
      //   value: "end"
      // },
      {
        text: "ส่วนลด (%) ",
        align: "start",
        value: "discount"
      },
      {
        text: "จำนวลคูปอง",
        align: "start",
        value: "num_use"
      },
      {
        text: "สถานะการใช้งาน",
        align: "start",
        value: "status"
      },
      // {
      //   text: "คนที่ใช้คูปอง",
      //   align: "start",
      //   value: "view"
      // },
      {
        text: "หมายเหตุ",
        value: "actions",
        sortable: false
      }
    ],
    itemBy: {},
    numberRules: [
      v => !!v || "โปรดกรอกข้อความให้ครบในช่อง!",
      v => Number.isInteger(Number(v)) || "ใส่ตัวเลขเท่านั้น!"
    ],
    editedIndex: -1,
    couponitem: {
      _id: "",
      status: "",
      codename: "",
      ref_emp_id_by: "",
      ref_emp_id: "",
      start: "",
      end: "",
      discount: "",
      num_use: "",
      detail: ""
    },
    type: null,
    deleteId: null,
    codeName: []
  }),
  filters: {
    moment: function(date) {
      var strdate = moment(date).add(543, "years");
      return moment(strdate).format("DD MMMM YYYY ");
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogedit(val) {
      val || this.closeedit();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },
  methods: {
    moment2(date) {
      this.$moment().format("LLLL");
      let strdate = this.$moment(date).add(543, "years");
      return this.$moment(strdate).format("D MMMM YYYY ");
    },
    reset() {
      this.$refs.form.reset();
    },
    async check() {
      const cus = await this.$axios.$get("/coupon/" + this.couponitem.codename);
      if (cus.length > 0) {
        this.nameErr = true;
        this.nametrue = false;
        this.$swal({
          type: "error",
          title: "ไม่สามารถใช้งานได้"
        });
      } else {
        this.nameErr = false;
        this.nametrue = true;
        this.$swal({
          type: "success",
          title: "ใช้งานได้"
        });
      }
    },
    Detail(item) {
      this.codename = item.codename;
      this.itemBy = item;
      this.detailArr = [
        {
          name: "ออกโดย",
          value: item.ref_emp_id_by.fname + " " + item.ref_emp_id_by.lname
        },
        {
          name: "ออกให้",
          value: item.ref_emp_id.fname + " " + item.ref_emp_id.lname
        },

        {
          name: "วันเริ่ม",
          value: this.moment2(item.start)
        },
        {
          name: "วันหมดอายุ",
          value: this.moment2(item.end)
        },
        {
          name: "จำนวลคูปองที่เหลือ",
          value: item.num_use
        },
        {
          name: "ส่วนลด",
          value: item.discount + "%"
        },
        {
          name: "สถานะคูปอง",
          value: this.getTxt(item.status)
        },
        {
          name: "รายละเอียดส่วนลด",
          value: item.detail
        }
      ];

      this.dialogView = true;
      //console.log(item);
    },
    getTxt(status) {
      if (status === 0) return "รอใช้งาน / ครบยอด";
      else if (status === 1) return "เริ่มใช้งาน";
      else if (status === 2) return "หมดอายุ";
      else if (status === 3) return "ยกเลิกใช้งาน";
      else return "อื่นๆ";
    },
    getColor(status) {
      if (status === 0) return "#2196F3";
      else if (status === 1) return "#4CAF50";
      else if (status === 2) return "#F44336";
      else if (status === 3) return "primary";
      return "primary";
    },
    getColorstatus(discount) {
      if (discount) return "#E91E63";
      else return "red";
    },

    getColorstatususe(num_use) {
      if (num_use) return "#455A64";
      else return "red";
    },
    addItem() {
      this.type = "add";
      this.couponitem = {
        status: 0,
        codename: "",
        ref_emp_id_by: "",
        ref_emp_id: "",
        start: "",
        end: "",
        discount: "",
        num_use: "",
        detail: ""
      };
      this.dialog = true;
    },
    editItem(item) {
      this.type = "edit";
      this.couponitem = {
        status: 0,
        _id: item._id,
        codename: item.codename,
        ref_emp_id_by: item.ref_emp_id_by,
        ref_emp_id: item.ref_emp_id,
        start: new Date(item.start).toISOString().substr(0, 10),
        end: new Date(item.end).toISOString().substr(0, 10),
        discount: item.discount,
        num_use: item.num_use,
        detail: item.detail
      };
      this.dialogedit = true;
    },
    deleteItem(item) {
      this.deleteId = item._id;
      this.editedIndex = this.coupon.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.coupon.splice(this.editedIndex, 1);
      this.$axios
        .$delete("/coupon/" + this.deleteId)
        .then(res => {
          this.$emit("refresh");
          this.closeDelete();
          this.$swal({
            type: "success",
            title: res.message
          });
        })
        .catch(e => {
          this.$swal({
            type: "error",
            title: e
          });
        });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },
    closeedit() {
      this.dialogedit = false;
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

    save() {
      if (this.type === "add") {
        this.loading = true;
        this.$refs.form.validate();
        this.$axios
          .$post("/coupon/", this.couponitem)
          .then(res => {
            this.$emit("refresh");
            this.close();
            this.$swal.fire({
              type: "success",
              title: res.message
            });
          })
          .catch(e => {
            this.$swal({
              type: "error",
              title: e
            });
          });
      } else {
        this.loading = true;
        this.$axios
          .$put("/coupon/" + this.couponitem._id, this.couponitem)
          .then(res => {
            this.$emit("refresh");
            this.closeedit();
            this.$swal({
              type: "success",
              title: res.message
            });
          })
          .catch(e => {
            this.$swal({
              type: "error",
              title: e
            });
          });
      }
    },
    improveEmp() {
      for (let i in this.employee) {
        let Emp = {
          _id: this.employee[i]._id,
          name: this.employee[i].fname + " " + this.employee[i].lname
        };
        this.Empname.push(Emp);
      }
    },

    improveUsers() {
      for (let i in this.user) {
        let use = {
          _id: this.user[i]._id,
          name: this.user[i].fname + " " + this.user[i].lname
        };
        this.useronline.push(use);
      }
    }
  },

  props: ["coupon", "employee", "user"],
  created() {
    this.improveEmp();
    this.improveUsers();
    this.coupon.map(c => {
      this.codeName.push(c.codename);
    });
    //console.log(this.codeName);
  }
};
</script>
