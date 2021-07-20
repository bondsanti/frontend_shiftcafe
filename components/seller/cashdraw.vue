<template>
  <div class="ma-3">
    <v-card class="mx-auto mt-6 py-3" elevaation="5" justify-centaer>
      <v-card-title>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mr-5" v-bind="attrs" v-on="on">
              <v-icon left> mdi-cash-register</v-icon> ลงข้อมูลเงินทอน
            </v-btn>
          </template>
          <v-card>
            <v-form>
              <v-card-title>
                <span class="text-h"
                  ><v-icon left> mdi-cash-register </v-icon> กรอกข้อมูล</span
                >
              </v-card-title>
              <v-divider class="mb-3"></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-select
                      v-model="cashdraw.type"
                      label="เลือก"
                      outlined
                      color="#1D1D1D"
                      :items="items"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="12" class="mt-n7">
                    <v-text-field
                      outlined
                      label="จำนวนเงิน"
                      required
                      v-model="cashdraw.total_money"
                      color="#1D1D1D"
                      prefix="฿"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" class="mt-n7">
                    <v-textarea
                      color="#1D1D1D"
                      outlined
                      v-model="cashdraw.remark"
                      label="หมายเหตุ"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-divider class="mt-n3"></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" @click="close">
                  <v-icon left> mdi-close </v-icon>Cancel
                </v-btn>
                <v-btn color="primary" @click="saveData">
                  <v-icon left> mdi-content-save </v-icon>Save
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>


        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="loadData" :search="search"    
        :items-per-page="15"  
       :footer-props="{
    'items-per-page-options': [15, 20, 30, 40, 50,-1]
  }">
  <template v-slot:top>
        <v-dialog v-model="dialogDelete" max-width="270px">
            <v-card>
              <v-card-title class="black--text  text-body-1 mb-4 ml-6" >
                แน่ใจแล้วใช่มั้ยที่จะลบ
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="info" @click="closeDelete">
                  <v-icon aria-hidden="false" class="mx-2 ma-1">
                   mdi-close-box   </v-icon
                  >ยกเลิก</v-btn
                >
                <v-btn color="primary"  @click="deleteItemConfirm();showAlert();">
                  <v-icon aria-hidden="false" class="mx-4">  mdi-delete-forever  </v-icon
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
            แก้ไข
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
            ลบ
          </v-btn>
        </template>
        <template v-slot:[`item.type`]="{ item }">
          <v-chip :color="getColor(item.type)" dark small>
            {{ item.type }}
          </v-chip>
        </template>
        
        <template v-slot:[`item.datetime`]="{ item }">
          <span>{{ item.datetime | moment }}</span>
        </template>
        <template v-slot:[`item.total_money`]="{ item }">
          <span class="">{{ formatPrice(item.total_money) }}</span>
        </template>
          <template v-slot:[`item.no`]="{ index }">
    {{ index + 1 }}
  </template>
  
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
import milkShake from "@/assets/milkshake.svg";
export default {
  layout: "layoutCashier",
  data() {
    return {
      //loadData: [],
    dialog: false,
    dialogDelete: false,
    type: null,
    deleteId: null,
      search: "",
       editedIndex: -1,
        type: null,
    deleteId: null,
      cashdraw: {
        _id:" ",
        type: "",
        total_money: "",
        remark: ""
      },
      items: ["นำเงินเข้า", "นำเงินออก"],
      headers: [
        { text: "ลำดับ", sortable: false, value: "no" },
        { text: "วันที่", align: "start",sortable: false, value: "datetime" },       
        { text: "ผู้ทำการบันทึก", value: "ref_emp_id.fname"},
        { text: "ประเภท", value: "type" },
        { text: "จำนวนเงิน", value: "total_money" },
        { text: "หมายเหตุ", value: "remark" },
        { text: "แก้ไข", value: "actions" }
      ]
    };
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
  created() {
    this.initialize();
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
     showAlert() {
         this.toast({
        type: "success",
        title:
          "ดำเนิการสำเร็จ"
      });
       this.text_val_for_test = Date.now();
  
    },
      someFn(ev) {
      console.log(ev)}
      ,
    initialize() {},
    formatPrice(total_money) {
      const value = parseInt(total_money);
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getColor(type) {
      if (type === "นำเงินเข้า") return "green";
      else  return "red";

    },
    editItem(item) {
      this.type = "edit";
      this.cashdraw = item;
      this.dialog = true;
    },

     deleteItem(item) {
      this.deleteId = item._id;
       this.editedIndex = this.loadData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
      deleteItemConfirm() {
      this.loadData.splice(this.editedIndex, 1);
      this.$axios.$delete("/withdraw/" + this.deleteId).then(() => {});
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

    saveData() {
       if (this.type === "edit") {
        this.loading = true;
           this.$axios
          .$put("/withdraw/" + this.cashdraw._id, this.cashdraw)
          .then(() => {
            this.close();
          })
          .catch(e => {
            console.log(e);
          });
      } else {
      //alert(JSON.stringify(this.cashdraw));
      this.$emit("addCashdraw", this.cashdraw);
      //alert(JSON.stringify(this.cashdraw));
      this.dialog = false;
    }
    }
  },

  components: {
    milkShake
  },
  props: ["loadData"]
};
</script>
