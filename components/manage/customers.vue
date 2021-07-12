<template>
  <div class="ma-2">
    <v-row>
      <v-col cols="12">
        <base-material-card class="px-5 py-3">
          <v-card-text class="px-0 pb-0">
            <v-sheet>
              <v-data-table
                :headers="headers"
                :items="desserts"
                :search="search"
                sort-by="calories"
                class="elevation-5 rounded-lg px-5 py-7"
              >
                <template v-slot:top color="#1d1d1d">
                  <v-toolbar class="mb-2 rounded-lg " color="#1d1d1d" dark flat>
                    <v-icon class="mx-2" dark>
                      mdi-clipboard account outline
                    </v-icon>
                    <v-toolbar-title>ระบบจัดสมาชิก</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="ค้นหา"
                      single-line
                      hide-details
                      class="subheading font-weight-bold"
                    ></v-text-field>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                      <template v-slot:activator="{ attrs }">
                        <!-- <v-btn
                        
                          class="ma-2"
                          color="1d1d1d"
                          outlined
                          dark
                          v-bind="attrs"
                          @click="addEmp"
                        >
                          <v-icon dark>
                            mdi-plus
                          </v-icon>
                          เพิ่มสมาชิก
                        </v-btn> -->
                      </template>
                      <v-card>
                        <v-card-title>
                          <v-card-title
                            class="black white--text text-h5 elevation-5 rounded-lg"
                          >
                            <v-icon class="ma-2" dark>
                              mdi-account
                            </v-icon>
                            {{ formTitle }}
                          </v-card-title>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  dense
                                  filled
                                  solo-inverted
                                  v-model="emp.pname"
                                  label="คำนำหน้าชื่อ"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  dense
                                  filled
                                  solo-inverted
                                  v-model="emp.fname"
                                  label="ชื่อ"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  dense
                                  filled
                                  solo-inverted
                                  v-model="emp.lname"
                                  label="นามสกุล"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  dense
                                  filled
                                  solo-inverted
                                  type="date"
                                  v-model="emp.birthday"
                                  label="birthday"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  dense
                                  filled
                                  solo-inverted
                                  v-model="emp.tel"
                                  label="เบอร์โทรติดต่อ"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  dense
                                  filled
                                  solo-inverted
                                  v-model="emp.email"
                                  label="e-mail"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  dense
                                  filled
                                  solo-inverted
                                  v-model="emp.address"
                                  label="ที่อยู่"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="close">
                            ยกเลิก
                          </v-btn>
                          <v-btn color="blue darken-1" text @click="save">
                            บันทึก
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <v-dialog v-model="dialogDelete" max-width="300px">
                      <v-sheet
                        class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
                        color="#d1d1d1d"
                        dark
                      >
                        <v-card-title class="text-h5">
                          คุณต้องการลบหรือไม่
                        </v-card-title>
                        <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-btn
                            x-large
                            class="ma-1"
                            color=""
                            plain
                            text
                            @click="closeDelete"
                            >ยกเลิก</v-btn
                          >
                          <v-btn
                            x-large
                            plain
                            color="error"
                            class="ma-1"
                            text
                            @click="deleteItemConfirm"
                            >ลบ</v-btn
                          >

                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-sheet>
                    </v-dialog>
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-btn
                    outlined
                    rounded
                    class="mr-2"
                    color="#1d1d1d"
                    @click="editItem(item)"
                  >
                    <v-icon dark>
                      mdi-pencil
                    </v-icon>
                    แก้ไข
                  </v-btn>
                  <v-btn
                    outlined
                    rounded
                    class="mr-2"
                    color="error"
                    @click="deleteItem(item)"
                  >
                    ลบ
                  </v-btn>
                </template>

                <template v-slot:item.birthday="{ item }">
                  <span>{{ item.birthday | moment }}</span>
                </template>
                <template v-slot:no-data>
                  <v-btn color="primary" @click="initialize"> Reset </v-btn>
                </template>
              </v-data-table>
            </v-sheet>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
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
    headers: [
      {
        text: "คำนำหน้าชื่อ",

        value: "pname"
      },
      {
        text: "ชื่อจริง",

        value: "fname"
      },
      { text: "นามสกุล", value: "lname" },
      { text: "วันเกิด ", value: "birthday" },
      { text: "เบอร์โทร ", value: "tel" },
      { text: "อีเมล์", value: "email" },
      { text: "ที่อยู่", value: "address" },
      { text: "ระดับสมาชิก", value: "level" },
      { text: "แต้มสะสม", value: "point" },
      { text: "Actions", value: "actions", sortable: false }
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
      return this.editedIndex === -1 ? "เพิ่มสมาชิก" : "แก้ไขสมาชิก";
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
#table > .v-data-footer .v-icon {
  color: rgb(255, 0, 0);
}
</style>
