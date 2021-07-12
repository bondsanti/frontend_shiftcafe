<template>
  <div class="ma-3">
    <v-card class="mx-auto mt-6  py-3" elevaation="5" justify-centaer>
      <v-card-title>
        <v-dialog v-model="dialogadd" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mr-5" v-bind="attrs" v-on="on">
              <v-icon left> mdi-ticket-percent-outline </v-icon> เมนูจัดการคูปอง
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5"
                ><v-icon left> mdi-ticket-percent-outline </v-icon>
                เพิ่มคูปอง</span
              >
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12"> </v-col>

                  <v-col cols="12" md="6" class="mt-n7">
                    <v-text-field
                      outlined
                      label="ชื่อคูปอง"
                      required
                      color="#1D1D1D"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" class="mt-n7">
                    <v-text-field
                      outlined
                      label="ผู้ร้องออกรหัสคูปอง"
                      required
                      color="#1D1D1D"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" class="mt-n7">
                    <v-text-field
                      outlined
                      label="พนักงานที่ทำการขอ"
                      required
                      color="#1D1D1D"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" class="mt-n7">
                    <v-text-field
                      outlined
                      label="วันหมดอายุคูปอง"
                      required
                      color="#1D1D1D"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" class="mt-n7">
                    <v-text-field
                      outlined
                      label="ส่วนลดในคูปอง"
                      required
                      color="#1D1D1D"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" class="mt-n7">
                    <v-text-field
                      outlined
                      label="จำคูปองที่สามารถใช้ได้"
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
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5"
                  ><v-icon left> mdi-ticket-percent-outline</v-icon>
                  {{ formTitle }}</span
                >
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12"> </v-col>

                    <v-col cols="12" md="6" class="mt-n7">
                      <v-text-field
                        outlined
                        label="ชื่อคูปอง"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" class="mt-n7">
                      <v-text-field
                        outlined
                        label="ผู้ร้องออกรหัสคูปอง"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" class="mt-n7">
                      <v-text-field
                        outlined
                        label="พนักงานที่ทำการขอ"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" class="mt-n7">
                      <v-text-field
                        outlined
                        label="วันหมดอายุคูปอง"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" class="mt-n7">
                      <v-text-field
                        outlined
                        label="ส่วนลดในคูปอง"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" class="mt-n7">
                      <v-text-field
                        outlined
                        label="จำคูปองที่สามารถใช้ได้"
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
                  <v-icon aria-hidden="false" class="mx-4">
                    mdi-ticket-percent-outline </v-icon
                  >ลบ</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="primary" @click="editItem(item)">
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
    headers: [
      { text: "ชื่อคูปอง", align: "start", sortable: false, value: "codename" },
      {
        text: "ผู้ออกรหัสคูปอง",
        align: "start",
        sortable: false,
        value: "ref_emp_id_by "
      },
      {
        text: "พนักงานที่ทำการขอ",
        align: "start",
        sortable: false,
        value: "ref_emp_id"
      },
      { text: "วันหมดอายุปอง", align: "start", sortable: false, value: "exp" },
      {
        text: "ส่วนลดคูปอง",
        align: "start",
        sortable: false,
        value: "discount"
      },
      {
        text: "จำนวนที่ใช้",
        align: "start",
        sortable: false,
        value: "num_use"
      },
      { text: "วันที่เพิ่มหน่วย", value: "data" },
      { text: "ดำเนินการ", value: "actions", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      codename: "",
      ref_emp_id_by: "",
      ref_emp_id: "",
      exp: "",
      discount: "",
      num_use: ""
    },
    defaultItem: {
      codename: "",
      ref_emp_id_by: "",
      ref_emp_id: "",
      exp: "",
      discount: "",
      num_use: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "แก้ไขคูปอง";
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
      this.desserts = [
        {
          name: "Frozen Yogurt",
          data: "11 กรกฏาคม 2564"
        },
        {
          name: "Ice cream sandwich",
          data: "12 กรกฏาคม 2564"
        },
        {
          name: "Eclair",
          data: "13 กรกฏาคม 2564"
        },
        {
          name: "Cupcake",
          data: "11 กรกฏาคม 2564"
        }
      ];
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
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
