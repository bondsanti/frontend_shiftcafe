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
        :items-per-page="5"
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
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5"
                  ><v-icon left> mdi-clipboard-account-outline </v-icon>
                  จัดการสมาชิก(เพิ่มข้อมูล / แก้ไขข้อมูล)</span
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
                          v-model="customerItme.pname"
                          :rules="requiredRules"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="customerItme.fname"
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
                          :rules="requiredRules"
                          label="นามสกุล"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="customerItme.birthday"
                          :rules="requiredRules"
                          type="date"
                          label="วันเกิด"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <!-- <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="customerItme.idcard"
                          :rules="numberRules"
                          type="number"
                          label="เลขบัตรประจำตัวประชาชน"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col> -->
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="customerItme.tel"
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
                          :rules="requiredRules"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="customerItme.point"
                          :rules="numberRules"
                          type="number"
                          label="แต้ม"
                          outlined
                          required
                          value="10.00"
                          color="#1D1D1D"
                        ></v-text-field>
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
                  บันทึกข้อมูลลูกค้า
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
                    mdi-food-off </v-icon
                  >ยกเลิก</v-btn
                >
                <v-btn color="primary" class="ma-2" @click="deleteItemConfirm">
                  <v-icon aria-hidden="false" class="mx-4"> mdi-barley </v-icon
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
            แก้ไขมูลสมาชิก
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
            ลบข้อมูลสมาชิก
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
            Reset(ข้อมูลไม่โหลด)
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
    pnamesec: ["นาย", "นาง", "นางสาว"],
    level: [],
    headers: [
      { text: "ภาพ", sortable: false, value: "img" },
       { text: "ชื่อสมาชิก", align: "start", value: "fname" },
     // { text: "ชื่อ", align: "start", value: "fname" },
      //{ text: "นามสกุล", align: "start", value: "lname" },
      { text: "วันเกิด", align: "start", value: "birthday" },
      { text: "เบอร์โทร", align: "start", value: "tel" },
      { text: "อีเมล์", align: "start", value: "email" },
      { text: "ที่อยู่", align: "start", value: "address" },
      { text: "ระดับ", align: "start", value: "ref_level_id.level_name" },
      { text: "แต้ม", align: "start", value: "point" },
      { text: "หมายเหตุ", value: "actions", sortable: false }
    ],
    editedIndex: -1,
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
      point: "0"
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
    this.improveLvmb();
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
        tel: " ",
        email: "",
        address: "",
        ref_level_id: "",
        point: "0"
      };
      this.dialog = true;
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
    improveLvmb() {
      for (let i in this.levelmember) {
        let Lvmb = {
          _id: this.levelmember[i]._id,
          name: this.levelmember[i].level_name
        };
        this.level.push(Lvmb);
      }
    },
    save() {
      this.$refs.form.validate();
      if (this.type === "add") {
        this.loading = true;

        this.$emit("addCustomer", { ...this.customerItme });
        this.close();
      } else {
        this.loading = true;
        this.$axios
          .$put("/customer/" + this.customerItme._id, this.customerItme)
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
  props: ["customer", "levelmember"]
};
</script>
