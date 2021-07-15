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
              <v-icon left> mdi-ticket-account </v-icon> จัดการข้อมูล
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

      <v-data-table :headers="headers" :items="levelmember" :search="search" :items-per-page="15">
            <template v-slot:[`item.img`]="{}">
          <img
            src="@/assets/img/lv-4.jpeg"
            class="mt-2 mb-2 rounded-lg"
            aspect-ratio="1"
            style="width: 180px; height: 120px"
          />
        </template>
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5"
                  ><v-icon left> mdi-ticket-account </v-icon> {{ formTitle }}</span
                >
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12"> </v-col>
                    <v-col cols="12" class="mt-n7">
                      <v-text-field
                        outlined
                        v-model="levelmemberitme.level_name"
                        label="ชื่อระดับสมาชิก"
                      ></v-text-field>
                    </v-col>
                       <v-col cols="12" class="mt-n7">
                      <v-text-field
                        outlined
                        v-model="levelmemberitme.discount"
                        label="ส่วนลด"
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
          <v-dialog v-model="dialogDelete" max-width="270px">
            <v-card>
              <v-card-title class="text-h5 white--text  primary">
                แน่ใจแล้วใช่มั้ยที่จะลบ
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="info" class="ma-2" @click="closeDelete">
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-barley-off </v-icon
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
              mdi-barley
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
              mdi-barley-off
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
      { text: "ชื่อหม่วดหมู่", align: "start", value: "level_name",  },
      //{ text: "ID", align: "start", value: "_id", divider: true },
      { text: "ส่วนลด", align: "start", value: "discount",  },
      { text: "Actions", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    levelmemberitme: { _id: "", level_name: "" ,discount:" "},
    type: null,
    deleteId: null
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "จัดการข้อมูล " : "จัดการข้อมูล ";
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
      // this.$axios.$get("/unit").then(unit => {
      //   this.unit = unit;
      // });
      // this.unit = [];
    },
    editItem(item) {
      this.type = "edit";
      this.levelmemberitme = item;
      this.dialog = true;
    },
    addItem() {
      this.type = "add";
      this.levelmemberitme = {
        _id: "", level_name: "" ,discount:" "
      };
      this.dialog = true;
    },
    deleteItem(item) {
      this.deleteId = item._id;
      this.editedIndex = this.levelmember.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.levelmember.splice(this.editedIndex, 1);
      this.$axios.$delete("/level-member/" + this.deleteId).then(() => {});
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
     
        this.$emit("addlevelmember", { ...this.levelmemberitme });
        this.close();
      } else {
        this.loading = true;
        this.$axios
          .$put("/level-member/" + this.levelmemberitme._id, this.levelmemberitme)
          .then(() => {
            this.close();
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  },
  props:['levelmember']
};
</script>
