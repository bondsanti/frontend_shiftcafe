<template>
  <div class="ma-3">
    <v-card class="mx-auto mt-6 py-3" elevaation="5" justify-centaer>
      <v-card-text class="px-0 pb-0">
        <v-card-title>
          <v-dialog v-model="dialognew" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mr-5" v-bind="attrs" v-on="on">
                <v-icon left> mdi-account-box </v-icon> จัดการพนังงาน
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5"
                  ><v-icon left> mdi-account-box </v-icon> จัดการพนังงาน</span
                >
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-select
                        label="คำนำหน้า"
                        outlined
                        color="#1D1D1D"
                        :items="items"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6" class="mt-n7">
                      <v-text-field
                        label="ชื่อ"
                        outlined
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="mt-n7">
                      <v-text-field
                        outlined
                        label="นามสกุล"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12"  md="6" class="mt-n7">
                      <v-text-field
                        outlined
                        label="วันเกิด"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>
            <v-col cols="12"  md="6" class="mt-n7">
                      <v-text-field
                        outlined
                        label="เลขบัตรประชาชน"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="mt-n7">
                      <v-text-field
                        outlined
                        label="เบอร์โทร"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="mt-n7">
                      <v-text-field
                        outlined
                        label="อีเมล์"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="mt-n7">
                      <v-textarea
                        color="#1D1D1D"
                        outlined
                        name=""
                        label="ที่อยู่"
                      ></v-textarea>
                    </v-col>
                     <v-col cols="12">
                        <v-select
                          label="ระดับ"
                          outlined
                          color="#1D1D1D"
                          :items="ref_id_role_position"
                          v-model="emp.ref_id_roleposition"
                        ></v-select>
                        
                      </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
       <v-card-actions>
              <v-btn class="ma-1" color="primary" dark @click="close">
                <v-icon aria-hidden="false" class="mx-2">
                  mdi-account-box 
                </v-icon>
                ยกเลิก
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="ma-1" color="info" @click="save">
                <v-icon aria-hidden="false" class="mx-2">
                  mdi-account-box
                </v-icon>
                เพิ่มข้อมูล
              </v-btn>
            </v-card-actions>
            </v-card>
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
        <v-data-table :headers="headers" :items="desserts" :search="search">
          <template v-slot:[`item.img`]="{}">
            <img
              src="@/assets/img/photo-2.jpg"
              class="mt-2 mb-2 rounded-circle"
              aspect-ratio="1"
              style="width: 50px; height: 50px"
            />
          </template>
          <template v-slot:top color="indig">
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="600px">
              <v-card>
                <v-card-title>
                  <span class="text-h5 post-content">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-select
                          label="คำนำหน้า"
                          outlined
                          color="#1D1D1D"
                          :items="items"
                          v-model="emp.pname"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="emp.fname"
                          label="ชื่อ"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="emp.lname"
                          label="นามสกุล"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                     <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="emp.username"
                          label="username"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col> 
                       <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="emp.password"
                          label="password"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col> 
                      <v-col cols="12" sm="6">
                        <v-text-field
                          type="date"
                          v-model="emp.birthday"
                          label="birthday"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                         <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="emp.idcard"
                          label="เลขบัตรประจำตัวประชาชน"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="emp.tel"
                          label="เบอร์โทรติดต่อ"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="emp.email"
                          label="e-mail"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="emp.address"
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
                          :items="ref_id_role_position"
                          v-model="emp.ref_id_roleposition"
                        ></v-select>
                        
                      </v-col>
                          
                    </v-row>
                  </v-container>
                </v-card-text>

                      <v-card-actions>
              <v-btn class="ma-1" color="primary" dark @click="close">
                <v-icon aria-hidden="false" class="mx-2">
                   mdi-account-box
                </v-icon>
                ยกเลิก
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="ma-1" color="info" @click="save">
                <v-icon aria-hidden="false" class="mx-2">
                   mdi-account-box
                </v-icon>
                บันทึก
              </v-btn>
            </v-card-actions>
                
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="280px">
              <v-card>
                <v-card-title class="text-h5">คุณต้องการลบหรือไม่</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn small class="mr-2" color="warning" @click="editItem(item)">
               <v-icon aria-hidden="false" class="mx-2">
                    mdi-account-box
                </v-icon>
              แก้ไข
              
            </v-btn>
            <v-btn small class="mr-2" color="error" @click="deleteItem(item)">
               <v-icon aria-hidden="false" class="mx-2">
                    mdi-account-box
                </v-icon>
              ลบ
            </v-btn>
          </template>

          <template v-slot:[`item.birthday`]="{ item }">
            <span>{{ item.birthday | moment }}</span>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import moment from "moment";
export default {
  middleware: "auth",
  async asyncData({ $axios }) {
    //  const emp = await $axios.$get('/api/employee')
    //  console.log(emp)
  },
  data: () => ({
    loading: false,
    search: "",
    // loading: true,
    dialog: false,
    dialogDelete: false,
    items: ["นาย", "นาง", "นางสาว"],
    level: ["classic", "silver", "gold","platinum "],
    ref_id_role_position:["ref_id_role.position"],
    headers: [
      { text: "อวตาร", sortable: false, value: "img" },
      { text: "คำนำหน้า",sortable: false, value: "pname" },
      { text: "ชื่อจริง", sortable: false,value: "fname" },
      { text: "นามสกุล", sortable: false,value: "lname" },
      { text: "เลขบัครประขาชน", sortable: false,value: "idcard" },
      { text: "วันเกิด ",sortable: false, value: "birthday" },
      { text: "เบอร์โทร ",sortable: false, value: "tel" },
      { text: "อีเมล์",sortable: false, value: "email" },
      { text: "ที่อยู่",sortable: false, value: "address" },
      { text: "ระดับสมาชิก",sortable: false, value: "ref_id_role.position" },
      { text: "ชื่อใข้งานเข้าระบบ",sortable: false, value: "username" },
      { text: "ดำเนินการ", value: "actions", sortable: false }
    ],

    desserts: [],

    editedIndex: -1,
    emp: {
      _id: "",
      pname: "",
      fname: "",
      lname: "",
      birthday: "",
      tel: "",
      email: "",
      address: "",
      level: "",
      point: ""
    },
    type: null,
    deleteId: null
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "แก้ไขสมาชิก" : "แก้ไขสมาชิก";
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
    this.initialize();
  },
  methods: {
    initialize() {
      this.loading = true;
      this.$axios.$get("/employee").then(desserts => {
        this.desserts = desserts;
      });
      this.desserts = [];
    },
    editItem(item) {
      // this.editedIndex = this.desserts.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      this.type = "edit";
      this.emp = item;
      this.dialog = true;
    },
    deleteItem(item) {
      this.deleteId = item._id;
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.$axios
        .$delete("/api/employee/" + this.deleteId)
        .then(() => {
          this.closeDelete();
        })
        .catch(e => {
          console.log(e);
        });
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
      // if (this.editedIndex > -1) {
      //   Object.assign(this.desserts[this.editedIndex], this.editedItem)
      // } else {
      //   this.desserts.push(this.editedItem)
      // }
      if (this.type === "add") {
        this.loading = true;
        this.$axios
          .$post("/api/employee", {
            ...this.emp,
            ref_id_role: "60e274847a205d160021ffbe",
            idcard: "123654789"
          })
          .then(() => {
            this.close();
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        this.loading = true;
        this.$axios
          .$put("/api/employee/" + this.emp._id, this.emp)
          .then(() => {
            this.close();
          })
          .catch(e => {
            console.log(e);
          });
      }
      this.close();
    },
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
    addEmp() {
      this.type = "add";
      this.emp = {
        _id: "",
        username: "",
        password: "",
        idcard: "",
        pname: "",
        fname: "",
        lname: "",
        birthday: "",
        tel: "",
        email: "",
        address: ""
      };
      this.dialog = true;
    }
  },
  filters: {
    moment: function(date) {
      // return moment(date).format('Do MMMM YYYY').add(543, 'years')

      var strdate = moment(date).add(543, "years");
      return moment(strdate).format("Do MMMM YYYY");
    }
  }
};
</script>
<style>
.scroll::-webkit-scrollbar {
  width: 17px;
}

.scroll::-webkit-scrollbar-track {
  background: #ededed;
  border-left: 1px solid #ededed;
  border-radius: 10px;
}

.scroll::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

.scroll::-webkit-scrollbar-thumb:hover {
  background: black;
}
</style>
