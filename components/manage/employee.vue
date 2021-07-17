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
              <v-icon left> mdi-badge-account-outline  </v-icon> จัดการพนักงาน
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
        :items-per-page="30"
      >
        <template v-slot:[`item.img`]="{}">
          <img
            src="@/assets/img/photo-5.jpg"
            class="mt-2 mb-2 rounded-circle"
            aspect-ratio="1"
            style="width: 60px; height: 60px"
          />
        </template>
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="800px">
            <v-card>
              <v-card-title>
                <span class="text-h5"
                  ><v-icon left> mdi-badge-account-outline </v-icon>
                  ข้อมูลพนักงาน</span
                >
              </v-card-title>

              <v-card-text>
                <v-form v-model="valid" ref="form">
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-select
                          label="คำนำหน้า"
                          outlined
                          color="#1D1D1D"
                          :items="pnamesec"
                          v-model="employeeitme.pname"
                          :rules="requiredRules"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="employeeitme.username"
                          :rules="requiredRules"
                          label="username"
                          type="username"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="employeeitme.password"
                          :rules="requiredRules"
                          label="password"
                          type="password"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="employeeitme.fname"
                          :rules="requiredRules"
                          label="ชื่อ"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="employeeitme.lname"
                          :rules="requiredRules"
                          label="นามสกุล"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="employeeitme.birthday"
                          :rules="requiredRules"
                          type="date"
                          label="วันเกิด"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="employeeitme.idcard"
                          :rules="numberRules"
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
                          :rules="numberRules"
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
                          :rules="emailRules"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="employeeitme.address"
                          :rules="requiredRules"
                          label="ที่อยู่"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          label="ตำแหน่งงาน"
                          outlined
                          color="#1D1D1D"
                          item-text="name"
                          item-value="_id"
                          :items="roleitme.flat()"
                          v-model="employeeitme.ref_id_role"
                          :rules="requiredRules"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
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
                  @click="save"
                >
                  <v-icon aria-hidden="false" class="mx-2">
                     mdi-content-save
                  </v-icon>
                  บันทึกข้อมูลพนักงาน
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
                     mdi-close-box f </v-icon
                  >ยกเลิก</v-btn
                >
                <v-btn color="primary" class="ma-2" @click="deleteItemConfirm">
                  <v-icon aria-hidden="false" class="mx-4"> mdi-delete-forever</v-icon
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
            แก้ไขข้อมูลพนักงาน
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
            ลบข้อมูลพนักงาน
          </v-btn>
        </template>
        <template v-slot:[`item.fname`]="{ item }">
          {{ item.pname }} - {{ item.fname }} - {{ item.lname }}
        </template>
        <template v-slot:[`item.birthday`]="{ item }">
          <span>{{ item.birthday | moment }}</span>
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
    roleitme: [],
    pnamesec: ["นาย", "นาง", "นางสาว", "Guest"],
    headers: [
      { text: "ภาพ", sortable: false, value: "img" },
      { text: "ชื่อใช้เข้าระบบ", align: "start", value: "username" },
      { text: "ตำแหน่ง", align: "start", value: "ref_id_role.position" },
      { text: "เลขบัตรประชาชน", align: "start", value: "idcard" },
      // { text: "คำนำหน้า", align: "start", value: "pname" },
      { text: "ชื่อสมาชิก", align: "start", value: "fname" },
      // { text: "นามสกุล", align: "start", value: "lname"},
      { text: "วันเกิด", align: "start", value: "birthday" },
      { text: "เบอร์โทร", align: "start", value: "tel" },
      { text: "อีเมล์", align: "start", value: "email" },
      { text: "ที่อยู่", align: "start", value: "address" },
      { text: "หมายเหตุ", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    employeeitme: {
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
    },
    type: null,
    deleteId: null,
    requiredRules: [v => !!v || "โปรดกรอกข้อความให้ครบในช่อง!"],
    emailRules: [
      v => !!v || "โปรดกรอกข้อความให้ครบในช่อง!",
      v =>
        !v ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "โปรใส่อีเมลให้ถูกต้อง"
    ],
    numberRules: [
      v => !!v || "โปรดกรอกข้อความให้ครบในช่อง!",
      v => Number.isInteger(Number(v)) || "ใส่ตัวเลขเท่านั้น!"
    ]
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "จัดหมวดหมู่ " : "จัดหมวดหมู่ ";
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
  created() {
    this.improverole();
  },

  methods: {
    toBuddhistYear(moment, format) {
      var christianYear = moment.format("YYYY");
      var buddhishYear = (parseInt(christianYear) + 543).toString();
      return moment
        .format(
          format
            .replace("YYYY", buddhishYear)
            .replace("YY", buddhishYear.substring(2, 4))
        )
        .replace(christianYear, buddhishYear);
    },
    editItem(item) {
      this.type = "edit";
      this.employeeitme = item;
      this.dialog = true;
      this.improverole;
    },
    addItem() {
      this.type = "add";
      this.employeeitme = {
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
      this.dialog = true;
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
    improverole() {
      for (let i in this.role) {
        let roles = {
          _id: this.role[i]._id,
          name: this.role[i].position
        };
        this.roleitme.push(roles);
      }
    },

    save() {
      this.$refs.form.validate();
      if (this.type === "add") {
        this.loading = true;

        this.$emit("addEmployee", { ...this.employeeitme });
        this.close();
      } else {
        this.loading = true;
        this.$axios
          .$put(
            "/employee/" + this.employeeitme._id,
            this.employeeitme,
            this.improverole
          )
          .then(() => {
            this.close();
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  },
  filters: {
    moment: function(date) {
      // return moment(date).format('Do MMMM YYYY').add(543, 'years')

      var strdate = moment(date).add(543, "years");
      return moment(strdate).format("Do MMMM YYYY");
    }
  },
  props: ["employee", "role"]
};
</script>
