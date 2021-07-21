<template>
  <div class="ma-3">
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
          'items-per-page-options': [10, 20, 30, 40, 50, -1]
        }"
      >
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5"
                  ><v-icon left> mdi-ticket-percent-outline </v-icon>
                  {{ formTitle }}</span
                >
              </v-card-title>

              <v-form v-model="valid" ref="form">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12"> </v-col>
                      <v-col cols="12" md="6" class="mt-n7">
                        <v-text-field
                          outlined
                          label="ชื่อคูปอง"
                          v-model="coupone.codename"
                          :rules="rules"
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6" class="mt-n7">
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
                      <v-col cols="12" md="6" class="mt-n7">
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

                      <v-col cols="12" md="6" class="mt-n7">
                        <v-text-field
                          type="date"
                          v-model="coupone.exp"
                          :rules="rules"
                          label="exp"
                          outlined
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6" class="mt-n7">
                        <v-text-field
                          outlined
                          label="ส่วนลดในคูปอง"
                          v-model="coupone.discount"
                          :rules="numberRules"
                          type="nubar"
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6" class="mt-n7">
                        <v-text-field
                          outlined
                          label="จำคูปองที่สามารถใช้ได้"
                          v-model="coupone.num_use"
                          :rules="numberRules"
                          type="nubar"
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
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
          <v-dialog v-model="dialogDelete" max-width="270px">
            <v-card>
              <v-card-title class="text-h5 white--text  primary">
                แน่ใจแล้วใช่มั้ยที่จะลบ
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="info" class="ma-2" @click="closeDelete">
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-close-box </v-icon
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
                    mdi-delete-forever </v-icon
                  >ลบ</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn class="mr2" color="warning" @click="editItem(item)">
            <v-icon aria-hidden="false" class="mx-2">
              mdi-pencil-plus
            </v-icon>
            แก้ไขคูปอง
          </v-btn>
          <v-btn
            rounded-lx
            class="mr-2"
            color="error"
            @click="deleteItem(item)"
          >
            <v-icon dark class="mx-2">
              mdi-delete-forever
            </v-icon>
            ลบคูปอง
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
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    rules: [value => !!value || "โปรดกรอกข้อมูลให้ครบถ้วน"],
    valid: true,
    search: "",
    Empname: [],
    useronline: [],
    headers: [
      { text: "ลำดับ", sortable: false, value: "No" },
      {
        text: "ชื่อหม่วดหมู่",
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
      { text: "วันหมดอายุ", align: "start", value: "exp" },
      { text: "ส่วนลด (%) ", align: "start", value: "discount" },
      {
        text: "จำนวลผู้ใช้คูปอง(คน)",
        align: "start",
        value: "num_use",
        divider: true
      },
      { text: "หมายเหตุ", value: "actions", sortable: false }
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

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "จัดการคูปอง " : "จัดการคูปอง ";
    }
  },
  filters: {
    moment: function(date) {
      // return moment(date).format('Do MMMM YYYY').add(543, 'years')
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
    editItem(item) {
      this.type = "edit";
      this.coupone = item;
      this.dialog = true;
    },
    addItem() {
      this.type = "add";
      this.coupone = {
        _id: " ",
        codename: " ",
        ref_emp_id_by: " ",
        ref_emp_id: " ",
        exp: " ",
        discount: " ",
        num_use: " "
      };
      this.dialog = true;
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
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.$refs.form.validate();
      if (this.type === "add") {
        this.loading = true;

        this.$emit("addCoupon", { ...this.coupone });
        this.close();
      } else {
        this.loading = true;
        this.$axios
          .$put("/coupon/" + this.coupone._id, this.coupone)
          .then(() => {
            this.close();
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
