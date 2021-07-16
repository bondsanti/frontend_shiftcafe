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
              <v-icon left> mdi-ticket-percent-outline</v-icon> จัดหมวดหมู่
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

      <v-data-table :headers="headers" :items="coupon" :search="search" :items-per-page="15">
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5"
                  ><v-icon left> mdi-ticket-percent-outline </v-icon> {{ formTitle }}</span
                >
              </v-card-title>

              <v-card-text>
                <v-container>
            
                   <v-row>
                    <v-col cols="12"> </v-col>

                    <v-col cols="12" md="6" class="mt-n7">
                      <v-text-field
                        outlined
                        label="คนออก"
                        v-model="coupone.codename"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" class="mt-n7">
                       
                  <v-select 
                      label=" ชื่อคูปอง"
                      outlined
                      color="#1D1D1D"
                        item-text="name"        
                       item-value="_id"
                       
                          v-model="coupone.ref_emp_id_by"
                       :items="useronline.flat()"
                     
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
                    ></v-select>
                  </v-col>
                    
                    <v-col cols="12" md="6" class="mt-n7">
                       <v-text-field
                          type="date"
                          v-model="coupone.exp"
                          label="exp"
                          outlined
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" class="mt-n7">
                      <v-text-field
                        outlined
                        label="ส่วนลดในคูปอง"
                         v-model="coupone.discount"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" class="mt-n7">
                      <v-text-field
                        outlined
                        label="จำคูปองที่สามารถใช้ได้"
                        v-model="coupone.num_use"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-btn class="ma-1" color="primary" dark @click="close">
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-ticket-percent-outline
                  </v-icon>
                  ยกเลิก
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="ma-1" color="info" @click="save">
                  <v-icon aria-hidden="false" class="mx-2">
                   mdi-ticket-percent-outline
                  </v-icon>
                  เพิ่มข้อมูล
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
                    mdi-ticket-percent-outline </v-icon
                  >ยกเลิก</v-btn
                >
                <v-btn color="primary" class="ma-2" @click="deleteItemConfirm">
                  <v-icon aria-hidden="false" class="mx-4"> mdi-ticket-percent-outline</v-icon
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
            mdi-ticket-percent-outline
            </v-icon>
            แก้ไข
          </v-btn>
          <v-btn
            rounded-lx
            class="mr-2"
            color="error"
            @click="deleteItem(item)"
          >
            <v-icon dark class="mx-2">
              mdi-ticket-percent-outline
            </v-icon>
            ลบ
          </v-btn>
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
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    Empname:[],
    useronline:[],
    headers: [
      { text: "ชื่อหม่วดหมู่", align: "start", value: "codename", divider: true },
     
      { text: "ออกให้พนักงาน", align: "start", value: "ref_emp_id", divider: true },
       { text: " คนออกคูปอง", align: "start", value: "ref_emp_id_by", divider: true },
      { text: "วันหมดอายุ", align: "start", value: "exp", divider: true },
      { text: "ส่วนลด % ", align: "start", value: "discount", divider: true },
       { text: "จำนวลผู้ใช้คูปอง", align: "start", value: "num_use", divider: true },
      { text: "Actions", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    coupone: { _id: " ", codename: " ",ref_emp_id_by:" ",ref_emp_id:" ",exp:" " ,discount:" ",num_use:" "},
    type: null,
    deleteId: null
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
    this.initialize();
  },
  methods: {
    initialize() {
      // this.loading = true;
      //  this.$axios.$get("/authen/user").then(user => {
      //   this.user = user;
      // });
      // this.user = [];

     },
    editItem(item) {
      this.type = "edit";
      this.coupone = item;
      this.dialog = true;
    },
    addItem() {
      this.type = "add";
      this.coupone = {
        _id: " ", codename: " ",ref_emp_id_by:" ",ref_emp_id:" ",exp:" " ,discount:" ",num_use:" "
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

      if (this.type === "add") {
        this.loading = true;
     
        this.$emit("addCoupon", { ...this.coupone});
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
        this.useronline .push(use);
        
      }
    }
    
  },
  
  props:['coupon','employee','user'],
   created() {
    this.improveEmp();
    this.improveUsers();
   }
};
</script>
