<template>
  <div class="ma-3">
    <v-card class="mx-auto mt-6  py-3" elevaation="5" justify-centaer>
      <v-card-title>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-card color="primary" dark class="mr-5 mb-4">
              <span color="primary" class="mr-5 mt-2">
                <v-icon left class="mb-2 mt-2 ml-2 ">
                  mdi-file-powerpoint-box </v-icon
                >จัดการพอยท์ เพิ่ม/ลด
              </span>
            </v-card>
            <v-btn
              color="primary"
              disabled
              dark
              class="mr-5"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left> mdi-barley </v-icon> จัดการพอยท์
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5"
                ><v-icon left> mdi-barley </v-icon> เพิ่มหน่วย</span
              >
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12"> </v-col>

                  <v-col cols="12" class="mt-n7">
                    <v-text-field
                      outlined
                      label="ชื่อหน่วยนับ"
                      required
                      color="#1D1D1D"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n7">
                    <v-text-field
                      outlined
                      label="วันที่ลงข้อมูล"
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
                  mdi-barley-off
                </v-icon>
                ยกเลิก
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="ma-1" color="info" @click="save">
                <v-icon aria-hidden="false" class="mx-2">
                  mdi-barley
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

      <v-data-table :headers="headers" :items="pointmanage" :search="search">
        <template v-slot:[`item.No`]="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:[`item.ref_emp_id`]="{ item }">
          {{ item.ref_emp_id.pname }} - {{ item.ref_emp_id.fname }}
          {{ item.ref_emp_id.lname }}
        </template>
        <template v-slot:[`item.point`]="{ item }">
          <v-icon class="ma-2 ml-2" color="primary">
            mdi-file-powerpoint-box
          </v-icon>
          {{ item.point }}
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-chip :color="getColorstatus(item.status)" dark small>
            {{ item.status }}
          </v-chip>
        </template>
        <template v-slot:[`item.datetime`]="{ item }">
          <span>{{ item.datetime | moment }}</span>
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
    search: "",
    headers: [
      { text: "ลำดับ", sortable: false, value: "No" },
      {
        text: "ชื่อลูกที่ถูกจัดการ",
        align: "start",
        sortable: false,
        value: "ref_cus_id"
      },
      { text: "ชื่อพนักงานที่จัดการ", sortable: false, value: "ref_emp_id" },

      { text: "แต้ม(P)", align: "start", sortable: false, value: "point" },
      { text: "สถานะ", align: "start", sortable: false, value: "status" },

      { text: "วันทีเพิ่มลดแต้ม", sortable: false, value: "datetime" }
      //   { text: "Actions", value: "actions", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      data: ""
    },
    defaultItem: {
      name: "",
      data: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "แก้หนวยนับ";
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
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.desserts = [];
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
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
    getColorstatus(status) {
      if (status === "plus") return "green";
      else return "red";
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  },
  props: ["pointmanage"]
};
</script>
