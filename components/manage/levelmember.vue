<template>
  <div class="ma-3">
    <v-card class="mx-auto mt-6  py-3" elevaation="5" justify-centaer>
      <v-card-title>
        <v-dialog v-model="dialogadd" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mr-5" v-bind="attrs" v-on="on">
              <v-icon left> mdi-ticket-account </v-icon> จัดการระดับสมาชิก
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5"
                ><v-icon left> mdi-ticket-account</v-icon>
                เพิ่มการระดับสมาชิก</span
              >
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12"> </v-col>

                  <v-col cols="12" md="6" class="mt-n7">
                    <v-text-field
                      outlined
                      label="ระดับสมาขิก"
                      required
                      color="#1D1D1D"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" class="mt-n7">
                    <v-text-field
                      outlined
                      label="ส่วนลด"
                      required
                      color="#1D1D1D"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-alert text prominent type="error" icon="mdi-alert"
                  ><span>0 = classic</span>
                  <span>1 = silver</span>
                  <span>2 = gold</span>
                  <span>3 = platinum </span>
                </v-alert>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-btn class="ma-1" color="primary" dark @click="close">
                <v-icon aria-hidden="false" class="mx-2">
                  mdi-ticket-account
                </v-icon>
                ยกเลิก
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="ma-1" color="info" @click="save">
                <v-icon aria-hidden="false" class="mx-2">
                  mdi-ticket-account
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
            src="@/assets/img/lv-4.jpeg"
            class="mt-2 mb-2 rounded-lg"
            aspect-ratio="1"
            style="width: 180px; height: 120px"
          />
        </template>
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="600px">
            <v-card>
              <v-card-title>
                <span class="text-h5"
                  ><v-icon left> mdi-ticket-account </v-icon>
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
                        label="ระดับสมาขิก"
                        v-model="editedItem.level_name"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" class="mt-n7">
                      <v-text-field
                        outlined
                        label="ส่วนลด"
                        v-model="editedItem.discount"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-alert text prominent type="error" icon="mdi-alert"
                    ><span>0 = classic</span>
                    <span>1 = silver</span>
                    <span>2 = gold</span>
                    <span>3 = platinum </span>
                  </v-alert>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-btn class="ma-1" color="primary" dark @click="close">
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-ticket-account
                  </v-icon>
                  ยกเลิก
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="ma-1" color="info" @click="save">
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-ticket-account
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
                    mdi-ticket-account </v-icon
                  >ยกเลิก</v-btn
                >
                <v-btn color="primary" class="ma-2" @click="deleteItemConfirm">
                  <v-icon aria-hidden="false" class="mx-4">
                    mdi-ticket-account </v-icon
                  >ลบ</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn   class="mr-2"  color="warning" @click="editItem(item)">
            <v-icon aria-hidden="false" class="mx-2">
              mdi-ticket-account
            </v-icon>
            แก้ไข
          </v-btn>
          <v-btn
            rounded-lx
            class="mr-2 "
            color="error"
            @click="deleteItem(item)"
          >
            <v-icon dark class="mx-2">
              mdi-ticket-account
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
      { text: "ภาพ", sortable: false, value: "img" },
      { text: "ระดับ level-member ", sortable: false, value: "level_name" },
      { text: "ส่วนลด", sortable: false, value: "discount" },
      { text: "วันที่เพิ่มหน่วย", value: "data", sortable: false },
      { text: "ดำเนินการ", value: "actions", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      level_name: "",
      discount: "",
      img: ""
    },
    defaultItem: {
      level_name: "",
      discount: "",
      img: "",
      data: " "
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "ระดับสมาชิก";
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
          level_name: "platinum ",

          discount: "10%",

          data: "11 กรกฏาคม 2564"
        },
        {
          level_name: "platinum",
          discount: "10%",

          data: "12 กรกฏาคม 2564"
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
