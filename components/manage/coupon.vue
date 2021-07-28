<template>
  <div class="ma-3">
    <!-- 1 -->
    <v-dialog v-model="dialogView" max-width="400px">
      <v-card>
        <v-form>
          <v-card-title>
            <span class="text-h">
              <v-icon left> mdi-account-search</v-icon> ลูกค้า
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
    <!-- 1 -->
    <v-card class="mx-auto mt-6  py-3" elevaation="5" justify-centaer>
      <v-card-title>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mr-5"
              v-bind="attrs"
              v-on="on"
              @click="addItem"
            >
              <v-icon left> mdi-ticket-percent-outline</v-icon> จัดการคูปอง
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
        :items="coupon"
        :search="search"
        :items-per-page="10"
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
                      <v-col cols="12" md="10">
                        <v-text-field
                          outlined
                          label="ชื่อคูปอง"
                          v-model="coupone.codename"
                          :rules="rules"
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="2"
                        class="justify-center align-center"
                      >
                        <v-btn color="warning"> ตรวจสอบ</v-btn>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-select
                          label=" ชื่อคนออกคูปอง"
                          outlined
                          color="#1D1D1D"
                          item-text="name"
                          item-value="_id"
                          v-model="coupone.ref_emp_id_by"
                          :items="useronline.flat()"
                          :rules="rules"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          label="ออกให้"
                          outlined
                          color="#1D1D1D"
                          item-text="name"
                          item-value="_id"
                          :items="Empname.flat()"
                          v-model="coupone.ref_emp_id"
                          :rules="rules"
                        ></v-select>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <date-picker
                          class="my-datepicker"
                          placeholder="วันหมดอายุ"
                          :rules="rules"
                          :max="
                            new Date(
                              Date.now() -
                                new Date().getTimezoneOffset() * 60000
                            )
                              .toISOString()
                              .substr(0, 10)
                          "
                          min="1950-01-01"
                          v-model="coupone.exp"
                          valueType="format"
                        ></date-picker>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-select
                          label="ส่วนลดในคูปอง"
                          outlined
                          color="#1D1D1D"
                          :items="discount"
                          v-model="coupone.discount"
                          :rules="rules"
                        ></v-select>
                      </v-col>

                      <v-col cols="12" sm="12">
                        <v-text-field
                          outlined
                          label="จำนวลคูปองที่สมารถใช้ได้ต่อครั้ง"
                          v-model="coupone.num_use"
                          :rules="rules"
                          type="number"
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>
              </v-form>

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
                  @click="
                    save();
                    showAlert();
                  "
                  :disabled="!valid"
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
          <v-dialog v-model="dialogedit" max-width="700px">
            <v-card>
              <v-card-title>
                <span class="text-h5">
                  <v-icon left> mdi-ticket-percent-outline </v-icon>
                  แก้ไขคูปอง
                </span>
              </v-card-title>

              <v-form v-model="valid" ref="form">
                <v-card-text>
                  <div>
                    <v-row>
                      <v-col cols="12"> </v-col>
                      <v-col cols="12" md="10">
                        <v-text-field
                          outlined
                          label="ชื่อคูปอง"
                          v-model="coupone.codename"
                          :rules="rules"
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="2"
                        class="justify-center align-center"
                      >
                        <v-btn color="warning"> ตรวจสอบ</v-btn>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-select
                          label=" ชื่อคนออกคูปอง"
                          outlined
                          color="#1D1D1D"
                          item-text="name"
                          item-value="_id"
                          v-model="coupone.ref_emp_id_by"
                          :items="useronline.flat()"
                          :rules="rules"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          label="ออกให้"
                          outlined
                          color="#1D1D1D"
                          item-text="name"
                          item-value="_id"
                          :items="Empname.flat()"
                          v-model="coupone.ref_emp_id"
                          :rules="rules"
                        ></v-select>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <date-picker
                          class="my-datepicker"
                          placeholder="วันหมดอายุ"
                          :rules="rules"
                          v-model="coupone.exp"
                          valueType="format"
                        ></date-picker>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-select
                          label="ส่วนลดในคูปอง"
                          outlined
                          color="#1D1D1D"
                          :items="discount"
                          v-model="coupone.discount"
                          :rules="rules"
                        ></v-select>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-text-field
                          outlined
                          label="จำนวลคูปองที่สมารถใช้ได้ต่อครั้ง"
                          v-model="coupone.num_use"
                          :rules="rules"
                          type="number"
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          label="ปรับสถานะคูปอง"
                          outlined
                          color="#1D1D1D"
                          :items="status_edit"
                          v-model="coupone.status_edit"
                          :rules="rules"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>
                <v-card-text>
                  <v-alert
                    text
                    outlined
                    color="deep-orange"
                    icon="mdi-ticket-percent-outline"
                  >
                    <q class="font-weight-bold">{{ status_edit }}</q>
                  </v-alert>
                </v-card-text>
              </v-form>

              <v-card-actions>
                <v-btn class="ma-1" color="primary" dark @click="closeedit">
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-close-box
                  </v-icon>
                  ยกเลิก
                </v-btn>

                <v-spacer></v-spacer>
                <v-btn
                  class="ma-1"
                  color="info"
                  @click="
                    save();
                    showAlert();
                  "
                  :disabled="!valid"
                >
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-content-save
                  </v-icon>
                  เพิ่มข้อมูลคูปอง
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--------------------------------------------------- edit -------------------------->

          <v-dialog v-model="dialogDelete" max-width="270px">
            <v-card>
              <v-card-title class="text-h5 white--text  primary">
                แน่ใจแล้วใช่มั้ยที่จะลบ
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
                  @click="
                    deleteItemConfirm();
                    showAlert();
                  "
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
          <v-btn small class="mr2" color="warning" @click="editItem(item)">
            <v-icon aria-hidden="false" class="mx-2">
              mdi-pencil
            </v-icon>
            แก้ไขคูปอง
          </v-btn>
          <v-btn
            rounded-lx
            class="mr-2"
            color="error"
            small
            @click="deleteItem(item)"
          >
            <v-icon dark class="mx-2">
              mdi-delete-forever
            </v-icon>
            ลบคูปอง
          </v-btn>
        </template>
        <template v-slot:[`item.view`]="{ item }">
          <v-btn small class="mr2" color="warning" @click="Detail(item)">
            <v-icon aria-hidden="false" class="mx-2">
              mdi-eye-settings-outline
            </v-icon>
            ดูข้อมูล
          </v-btn>
        </template>
        <template v-slot:[`item.No`]="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:[`item.exp`]="{ item }">
          <span>{{ item.exp | moment }}</span>
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

        <template v-slot:[`item.status_edit`]="{ item }">
          <v-chip :color="getColorstatususe(item.status_edit)" dark small>
            {{ item.status_edit }}
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
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/locale/th";
import "@/assets/css/datepicker.css";
import "vue2-datepicker/index.css";
export default {
  components: {
    DatePicker
  },
  data: () => ({
    detailArr: [],
    dialog: false,
    dialogView: false,
    dialogedit: false,
    dialogDelete: false,
    rules: [value => !!value || "โปรดกรอกข้อมูลให้ครบถ้วน"],
    valid: true,
    search: "",
    Empname: [],
    useronline: [],
    status_edit: [
      {
        text: "รอใช้งาน",
        value: "รอใช้งาน"
      },
      {
        text: "ใช้งานแล้ว",
        value: "ใช้งาน"
      },
      {
        text: "หมดอายุ",
        value: "หมดอายุ"
      },
      {
        text: "ยกเลิก",
        value: "ยกเลิก"
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
        align: "start",
        value: "codename"
      },

      {
        text: "ออกให้พนักงาน",
        align: "start",
        value: "ref_emp_id"
      },
      {
        text: " คนออกคูปอง",
        align: "start",
        value: "ref_emp_id_by"
      },
      {
        text: "วันหมดอายุ",
        align: "start",
        value: "exp"
      },
      {
        text: "ส่วนลด (%) ",
        align: "start",
        value: "discount"
      },
      {
        text: "จำนวลคูปองที่สมารถใช้ได้ต่อครั้ง",
        align: "start",
        value: "num_use"
      },
      {
        text: "สถานะการใช้งาน",
        align: "start",
        value: "status_edit"
      },
      {
        text: "คนที่ใช้คูปอง",
        align: "start",
        value: "view"
      },
      {
        text: "หมายเหตุ",
        value: "actions",
        sortable: false
      }
    ],
    numberRules: [
      v => !!v || "โปรดกรอกข้อความให้ครบในช่อง!",
      v => Number.isInteger(Number(v)) || "ใส่ตัวเลขเท่านั้น!"
    ],
    editedIndex: -1,
    coupone: {
      _id: " ",
      codename: " ",
      ref_emp_id_by: " ",
      ref_emp_id: " ",
      exp: " ",
      discount: " ",
      num_use: " "
    },
    type: null,
    deleteId: null
  }),

  computed: {},
  filters: {
    moment: function(date) {
      var strdate = moment(date).add(543, "years");
      return moment(strdate).format("วันที่ DD MMM YY ");
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
  created() {},
  mounted() {
    this.toast = this.$swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000
    });
  },
  methods: {
    Detail(item) {
      this.itemBy = item;
      this.detailArr = [
        {
          name: "ชื่อ-นามสกุล",
          value: item.ref_emp_id
        }
      ];

      this.dialogView = true;
      //console.log(item);
    },

    getColorstatus(discount) {
      if (discount) return "green";
      else return "red";
    },
    getColorstatususe(num_use) {
      if (num_use) return "teal";
      else return "red";
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

    addItem() {
      this.type = "add";
      this.coupone = {
        _id: " ",
        codename: " ",
        ref_emp_id_by: " ",
        ref_emp_id: " ",
        exp: "",
        discount: " ",
        num_use: " "
      };
      this.dialog = true;
    },
    editItem(item) {
      this.type = "edit";
      this.coupone = item;

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
      this.$axios.$delete("/coupon/" + this.deleteId).then(() => {});
      this.closeDelete();
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
      this.$refs.form.validate();
      if (this.type === "add") {
        this.loading = true;

        this.$emit("addCoupon", {
          ...this.coupone
        });
        this.close();
      } else {
        this.loading = true;
        this.$axios
          .$put("/coupon/" + this.coupone._id, this.coupone)
          .then(() => {
            this.closeedit();
          })
          .catch(e => {
            console.log(e);
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
  }
};
</script>
