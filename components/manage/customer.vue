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
        :items-per-page="15"
        :footer-props="{ 'items-per-page-options': [15, 20, 30, 40, 50, -1] }"
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
          <v-dialog v-model="dialog" max-width="700px">
            <v-card>
              <v-card-title>
                <span class="text-h5"
                  ><v-icon left> mdi-account-plus </v-icon>
                  {{ formTitle }}</span
                >
              </v-card-title>

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
                          :readonly="editedIndex === 0"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="customerItme.fname"
                          maxlength="25"
                          :rules="requiredRules"
                          :readonly="editedIndex === 0"
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
                          :readonly="editedIndex === 0"
                          label="นามสกุล"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="4">
                        <v-text-field
                          v-model="customerItme.birthday"
                          :readonly="editedIndex === 0"
                          :rules="rules"
                          type="date"
                          label="วันเกิด"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="4">
                        <v-text-field
                          v-model="customerItme.tel"
                          :readonly="editedIndex === 0"
                          hint="ไม่ต้องเติม - ในเบอร์โทรศัพท์"
                          maxlength="10"
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
                        <v-btn small fab @click="check">เช๊ค</v-btn>
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
                          :readonly="editedIndex === 0"
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
                          :readonly="editedIndex === 0"
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
                          :readonly="editedIndex === 0"
                          :rules="rules"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="customerItme.point"
                          :readonly="editedIndex === 0"
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

              <v-card-actions v-if="editedIndex !== 0">
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
          <!-- ดูข้อมูล -->
        </template>
        <template v-slot:[`item.viewItem`]="{ item }">
          <v-btn class="mr1" small color="success" @click="viewItem(item)">
            <v-icon aria-hidden="false" class="me-1">
              mdi-eye
            </v-icon>
            ดูข้อมูล
          </v-btn>
        </template>

        <!-- ดูข้อมูล -->
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
            {{ item.ref_level_id.level_name}}
          </v-chip>
        </template>
          <template v-slot:[`item.tel`]="{ item }">
            <v-icon class="ma-2 ml-2" color="primary">
            mdi-phone-in-talk-outline 
          </v-icon>
            {{ item.tel}}
        
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
export default {
  layout: "layoutCashier",
  data: () => ({
    teltrue: false,
    telErr: false,
    dialog: false,
    dialogDelete: false,
    rules: [value => !!value || "โปรดกรอกข้อมูลให้ครบถ้วน"],
    valid: true,
    search: "",
    pnamesec: ["นาย", "นาง", "นางสาว"],
    level: [],
    headers: [
      { text: "ลำดับ", sortable: false, value: "No" },
      //  { text: "ภาพ", sortable: false, value: "img" },
      { text: "คำนำหน้า", align: "start", value: "pname" },
      { text: "ชื่อ", align: "start", value: "fname" },
      { text: "นามสกุล", align: "start", value: "lname" },
      { text: "เบอร์โทร", align: "start", value: "tel" },
      { text: "ระดับ", align: "start", value: "ref_level_id.level_name" },
      //{ text: "แต้ม", align: "start", value: "point" },
      { text: "ดูข้อมูลสมาชิก", value: "viewItem", sortable: false },
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
      point: " "
    },
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
  computed: {
    formTitle() {
      if (this.editedIndex === -1) {
        return "จัดการข้อมูลลูกค้า";
      } else if (this.editedIndex === 0) {
        return "ดูข้อมูลลูกค้า";
      } else {
        return "จัดการข้อมูลลูกค้า";
      }
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
    async check() {
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
    viewItem(item) {
      this.editedIndex = 0;
      this.customerItme = Object.assign({}, item);
      this.dialog = true;
      console.log(item);
    },
    editItem(item) {
      this.editedIndex === -1;
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
  props: ["customer", "levelmember"]
};
</script>
