<template>
  <div class="ma-3">
    <!-- 1 -->
    <v-dialog v-model="dialogView" max-width="400px">
      <v-card>
        <v-form>
          <v-card-title>
            <span class="text-h">
              <v-icon left> mdi-account-search</v-icon> รหัสลูกค้า ลำดับ.#{{
                itemBy.member_no
              }}
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
        </v-form>
      </v-card>
    </v-dialog>
    <!-- 2 -->
    <v-card class="mx-auto mt-6  py-3" elevaation="5" justify-centaer>
      <v-card-title>
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
              <v-icon left> mdi-account-plus </v-icon> ลงทะเบียนสมาชิก
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
        :items="customer"
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
            src="@/assets/img/photo-2.jpg"
            class="mt-2 mb-2 rounded-circle"
            aspect-ratio="1"
            style="width: 50px; height: 50px"
          />
        </template>
        <template v-slot:top>
          <!-- add -->
          <v-dialog v-model="dialogadd" max-width="700px">
            <v-card>
              <v-card-title>
                <v-icon left> mdi-account-plus </v-icon> ลงทะเบียนลูกค้า
              </v-card-title>
              <v-card-text>
                <v-divider class="mx-auto" inset></v-divider>
              </v-card-text>
              <v-card-text>
                <v-form v-model="valid" ref="form">
                  <div>
                    <v-row>
                      <v-col cols="12">
                        <v-select
                          label="คำนำหน้า"
                          outlined
                          color="#1D1D1D"
                          :items="pnamesec"
                          v-model="customerItme.pname"
                          :rules="requiredRules"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="customerItme.fname"
                          maxlength="25"
                          :rules="requiredRules"
                          label="ชื่อ"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="customerItme.lname"
                          maxlength="25"
                          :rules="requiredRules"
                          label="นามสกุล"
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
                          v-model="customerItme.birthday"
                          lang="th"
                          valueType="format"
                        ></date-picker>
                      </v-col>

                      <v-col cols="12" sm="4">
                        <v-text-field
                          v-model="customerItme.tel"
                          hint="ไม่ต้องเติม - ในเบอร์โทรศัพท์"
                          maxlength="10"
                          min="0"
                          oninput="validity.valid||(value='');"
                          :rules="numberRules"
                          label="เบอร์โทรติดต่อ"
                          outlined
                          type="number"
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
                        <v-btn elevation="5" color="warning" @click="check"
                          >ตรวจสอบ</v-btn
                        >
                        <div class="mt-2 ml-4" v-if="teltrue">
                          <span class="green--text ">ใช้ได้</span>
                        </div>
                        <div class="mt-2 ml-4" v-if="telErr">
                          <span class="red--text ">ซ้ำ</span>
                        </div>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="customerItme.email"
                          label="อีเมล"
                          :rules="emailRules"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="customerItme.address"
                          :rules="requiredRules"
                          label="ที่อยู่"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          label="ระดับ"
                          outlined
                          color="#1D1D1D"
                          item-text="name"
                          item-value="_id"
                          v-model="customerItme.ref_level_id"
                          :items="level"
                          :rules="rules"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="customerItme.point"
                          type="number"
                          label="แต้ม"
                          outlined
                          required
                          disabled
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                </v-form>
              </v-card-text>
              <v-card-text>
                <v-alert outlined type="warning" prominent border="left">
                  โปรดกรอกข้อความให้ในช่อง และ
                  <q class="font-weight-black ">
                    กดปุ่มตรวจสอบเบอร์ทุกครั้งเพื่อไม่ให้ซ้ำกัน
                  </q>
                </v-alert>
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
                  บันทึก
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- ***************************************add ********************************************************************************************************-->

          <!--******************************* edi ****************************************************************************************************************-->
          <v-dialog v-model="dialog" max-width="750px">
            <v-card>
              <v-card-title>
                <span class="text-h5">
                  <v-icon left> mdi-account-plus </v-icon>
                  แก้ไขข้อมูลลูกค้า
                </span>
              </v-card-title>
              <v-card-text>
                <v-divider class="mx-auto" inset></v-divider>
              </v-card-text>
              <v-card-text>
                <v-form v-model="valid" ref="form">
                  <div>
                    <v-row>
                      <v-col cols="12">
                        <v-select
                          label="คำนำหน้า"
                          outlined
                          color="#1D1D1D"
                          :items="pnamesec"
                          v-model="customerItme.pname"
                          :rules="requiredRules"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="customerItme.fname"
                          maxlength="25"
                          :rules="requiredRules"
                          label="ชื่อ"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-text-field
                          v-model="customerItme.lname"
                          maxlength="25"
                          :rules="requiredRules"
                          label="นามสกุล"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <date-picker
                          placeholder="วันเกิด"
                          :rules="requiredRules"
                          lang="th"
                          v-model="customerItme.birthday"
                          valueType="format"
                        ></date-picker>
                      </v-col>

                      <v-col cols="12" sm="4">
                        <v-text-field
                          v-model="customerItme.tel"
                          hint="ไม่ต้องเติม - ในเบอร์โทรศัพท์"
                          maxlength="10"
                          :rules="numberRules"
                          label="เบอร์โทรติดต่อ"
                          outlined
                          min="0"
                          oninput="validity.valid||(value='');"
                          type="number"
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
                        <v-btn @click="check" color="warning"> ตรวจสอบ</v-btn>
                        <div class="mt-2 ml-4" v-if="teltrue">
                          <span class="green--text ">ใช้ได้</span>
                        </div>
                        <div class="mt-2 ml-4" v-if="telErr">
                          <span class="red--text ">ซ้ำ</span>
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="customerItme.email"
                          label="อีเมล"
                          :rules="emailRules"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="customerItme.address"
                          :rules="requiredRules"
                          label="ที่อยู่"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          label="ระดับ"
                          outlined
                          color="#1D1D1D"
                          item-text="name"
                          item-value="_id"
                          :disabled="$store.getters['position'] === 'cashier'"
                          v-model="customerItme.ref_level_id"
                          :items="level"
                          :rules="rules"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="customerItme.point"
                          type="number"
                          label="แต้ม"
                          outlined
                          required
                          disabled
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                </v-form>
              </v-card-text>
              <v-card-text>
                <v-alert outlined type="warning" prominent border="left">
                  โปรดกรอกข้อความให้ในช่อง และ
                  <q class="font-weight-black "
                    >กดปุ่มตรวจสอบเบอร์ทุกครั้งเพื่อไม่ให้ซ้ำกัน</q
                  >
                </v-alert>
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
                  บันทึกข้อมูลลูกค้า
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--****************************** edi ********************************************************************************************************* -->
          <v-dialog v-model="dialogDelete" max-width="300">
            <v-card color="">
              <v-card-title class="mb-4 ml-4 primary--text">
                <v-alert dense outlined color="" type="warning">
                  แน่ใจแล้วใช่มั้ยที่จะลบ
                </v-alert>
              </v-card-title>
              <v-divider class="mx-2"></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  :disabled="loading"
                  @click="closeDelete"
                  class="ma-1"
                  color="info"
                  plain
                >
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-close-box
                  </v-icon>

                  ยกเลิก
                </v-btn>
                <v-btn
                  class="ma-1"
                  color="error"
                  plain
                  @click="
                    deleteItemConfirm();
                    showAlert();
                  "
                >
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-delete-forever
                  </v-icon>
                  ลบข้อมูล
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn class="mr1" small color="warning" @click="editItem(item)">
            <v-icon aria-hidden="false" class="me-1">
              mdi-pencil-plus
            </v-icon>
            แก้ไข
          </v-btn>
          <v-btn
            rounded-lx
            class="mr-1"
            color="error"
            :disabled="$store.getters['position'] === 'cashier'"
            small
            @click="deleteItem(item)"
          >
            <v-icon dark class="me-1">
              mdi-delete-forever
            </v-icon>
            ลบ
          </v-btn>
        </template>
        <template v-slot:[`item.No`]="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:[`item.pname`]="{ item }">
          <v-chip :color="getPnameColor(item.pname)" dark small>
            {{ item.pname }}
          </v-chip>
        </template>
        <template v-slot:[`item.ref_level_id.level_name`]="{ item }">
          <v-chip :color="getColor(item.ref_level_id.level_name)" dark small>
            {{ item.ref_level_id.level_name }}
          </v-chip>
        </template>
        <template v-slot:[`item.birthday`]="{ item }">
          <span>{{ item.birthday | moment }}</span>
        </template>
        <template v-slot:[`item.tel`]="{ item }">
          <v-icon class="ma-2 ml-2" color="primary">
            mdi-phone-in-talk-outline
          </v-icon>
          {{ item.tel }}
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">
            Reset(ข้อมูลไม่โหลด)
          </v-btn>
        </template>
        <template v-slot:[`item.view`]="{ item }">
          <v-btn class="mr1" small color="teal" @click="Detail(item)">
            <div class="d-block  white--text">
              <v-icon aria-hidden="false" class="mx-1"> mdi-eye </v-icon
              >ดูรายละเอียด
            </div>
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
import 'vue2-datepicker/locale/th';
export default {
  layout: "layoutCashier",
  data: () => ({
    teltrue: false,
    telErr: false,
    dialogadd: false,
    dialog: false,
    dialogDelete: false,
    dialogView: false,
    loading: false,
    //
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    //
    rules: [value => !!value || "โปรดกรอกข้อมูลให้ครบถ้วน"],
    valid: true,
    search: "",
    pnamesec: ["นาย", "นาง", "นางสาว"],
    level: [],
    headers: [
      {
        text: "ลำดับ",
        sortable: false,
        value: "No"
      },
      //  { text: "ภาพ", sortable: false, value: "img" },
      {
        text: "คำนำหน้า",
        align: "start",
        value: "pname"
      },
      {
        text: "ชื่อ",
        align: "start",
        value: "fname"
      },
      {
        text: "นามสกุล",
        align: "start",
        value: "lname"
      },
      {
        text: "ระดับ",
        align: "start",
        value: "ref_level_id.level_name"
      },
      // {
      //   text: "วันเกิด",
      //   align: "start",
      //   value: "birthday"
      // },
      {
        text: "ดูข้อมูล",
        value: "view",
        sortable: false
      },
      {
        text: "หมายเหตุ",
        value: "actions",
        sortable: false
      }
    ],
    customerItme: {
      _id: "",
      pname: "",
      fname: "",
      lname: "",
      birthday: "",
      tel: " ",
      email: "",
      address: "",
      ref_level_id: "",
      point: " "
    },
    detailArr: [],
    defaultItem: {
      _id: "",
      pname: "",
      fname: "",
      lname: "",
      birthday: "",
      tel: "null ",
      email: "",
      address: "",
      ref_level_id: "",
      point: " "
    },
    itemBy: {},
    time1: null,
    type: null,
    deleteId: null,
    requiredRules: [v => !!v.length <= 25 || "โปรดกรอกข้อความให้ครบในช่อง!"],
    emailRules: [
      v => !!v || "โปรดกรอกข้อความให้ครบในช่อง!",
      v =>
        !v ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "โปรใส่อีเมลให้ถูกต้อง"
    ],
    numberRules: [
      v => (/\d{9,10}/.test(v) && v.length <= 10) || "เบอร์โทรศัพท์ไม่ถูกต้อง",
      v => Number.isInteger(Number(v)) || "ใส่ตัวเลขเท่านั้น!"
    ]
  }),

  components: { DatePicker },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogadd(val) {
      val || this.closeadd();
    }
  },
  created() {
    this.improveLvmb();
  },
  filters: {
    moment: function(date) {
      // return moment(date).format('Do MMMM YYYY').add(543, 'years')
      var strdate = moment(date).add(543, "years");
      return moment(strdate).format("Do MMMM YYYY");
    }
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
    showAlert() {
      this.toast({
        type: "success",
        title: "ดำเนินการสำเร็จ"
      });
      this.text_val_for_test = Date.now();
    },
    someFn(ev) {
      console.log(ev);
    },
    async check() {
      this.$refs.form.validate();
      const cus = await this.$axios.$get(
        "/customer-tel/" + this.customerItme.tel
      );
      if (cus.length > 0) {
        this.telErr = true;
        this.teltrue = false;
      } else {
        this.telErr = false;
        this.teltrue = true;
      }
      //return { category };
    },

    editItem(item) {
      this.type = "edit";
      this.customerItme = item;
      this.dialog = true;
    },
    addItem() {
      this.type = "add";
      this.customerItme = {
        _id: "",
        pname: "",
        fname: "",
        lname: "",
        birthday: "",
        tel: "null",
        email: "",
        address: "",
        ref_level_id: "",
        point: "0"
      };
      this.dialogadd = true;
    },
    deleteItem(item) {
      this.deleteId = item._id;
      this.editedIndex = this.customer.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.customer.splice(this.editedIndex, 1);
      this.$axios.$delete("/customer/" + this.deleteId).then(() => {});
      this.closeDelete();
    },
    closeadd() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },
    close() {
      this.dialog = false;
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
    getFormattedDate(date) {
      return new Date(date)
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "/");
    },

    improveLvmb() {
      for (let i in this.levelmember) {
        let Lvmb = {
          _id: this.levelmember[i]._id,
          name: this.levelmember[i].level_name
        };
        this.level.push(Lvmb);
      }
    },
    Detail(item) {
      this.member_no = item.member_no;
      this.itemBy = item;
      this.detailArr = [
        {
          name: "ชื่อ-นามสกุล",
          value: item.pname + "  " + item.fname + " " + item.lname
        },
        {
          name: "วันเกิด",
          value: this.formatDate(item.birthday)
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
        },
        {
          name: "ตำแหน่ง",
          value: item.ref_level_id.level_name
        }
      ];

      this.dialogView = true;
      //console.log(item);
    },

    getColor(status) {
      if (status === "platinum") return "cyan";
      else if (status === "gold") return "amber";
      else if (status === "silver") return "blue-grey";
      return "brown";
    },

    getPnameColor(status) {
      if (status === "นาย") return "#03A9F4";
      else if (status === "นางสาว") return "#F06292";
      else if (status === "นาง") return "#F06292";
      return "#FFCC80";
    },
    save() {
      this.$refs.form.validate();
      if (this.type === "add") {
        this.loading = true;
        this.$emit("addCustomer", {
          ...this.customerItme
        });
        this.closeadd();
      } else {
        this.loading = true;
        this.$axios
          .$put("/customer/" + this.customerItme._id, this.customerItme)
          .then(() => {
            this.$emit("refresh");
            this.close("refresh");
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    formatDate(date) {
      this.$moment().format("LLLL");
      let strdate = this.$moment(date).add(543, "years");
      return this.$moment(strdate).format("D MMMM YYYY ");
    }
  },
  props: ["customer", "levelmember"]
};
</script>

<style>

</style>
