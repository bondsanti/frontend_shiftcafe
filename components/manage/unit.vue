<template>
  <div class="ma-3 rounded-lg">
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
              <v-icon left> mdi-barley </v-icon>
              <span>ประเภทอาหาร</span>
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
        :items="unit"
        :search="search"
        :items-per-page="15"
        :footer-props="{
          'items-per-page-options': [15, 20, 30, 40, 50, -1],
          prevIcon: 'mdi-chevron-left',
          nextIcon: 'mdi-chevron-right',
          'items-per-page-text': 'ข้อมูลหน้าต่อไป'
        }"
      >
        >
        <template v-slot:[`item.img`]="{}">
          <img
            src="@/assets/img/photo-1.jpg"
            class="mt-2 mb-2 rounded-lg"
            aspect-ratio="1"
            style="width: 60px; height: 60px"
          />
        </template>
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5"
                  ><v-icon left> mdi-barley </v-icon>
                  {{ type === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล" }}
                </span>
              </v-card-title>
              <v-form v-model="valid" ref="form">
                <v-card-text>
                  <div>
                    <v-row>
                      <v-col cols="12"> </v-col>
                      <v-col cols="12" class="mt-n7">
                        <v-text-field
                          outlined
                          v-model="units.u_name"
                          :rules="rules"
                          label="ชื่อ"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>
              </v-form>
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
                  @click="
                    save();
                  
                  "
                >
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-content-save
                  </v-icon>
                  {{ type === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล" }}
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
                    mdi-close-box </v-icon
                  >ยกเลิก</v-btn
                >
                <v-btn
                  color="primary"
                  class="ma-2"
                  @click="
                    deleteItemConfirm();                  
                  "
                >
                  <v-icon aria-hidden="false" class="mx-4">
                    mdi-delete-forever </v-icon
                  >ลบ</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn class="mr2" small color="warning" @click="editItem(item)">
            <v-icon aria-hidden="false" class="mx-2">
              mdi-pencil-plus
            </v-icon>
            แก้ไข
          </v-btn>
          <v-btn
            rounded-lx
            class="mr-2"
            color="error"
            small
            @click="deleteItem(item)"
          >
            <v-icon dark class="mx-2">
              mdi-delete-forever
            </v-icon>
            ลบ
          </v-btn>
        </template>
        <template v-slot:[`item.No`]="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="unit">
            Reset
          </v-btn>
        </template>
      </v-data-table>
      <v-card-text>
        <v-alert
          outlined
          color="info"
          prominent
          border="left"
          class="text-center"
        >
          โปรดตวรจสอบหน่วยนับให้ดีก่อนลบประเภทอหารที่ใช้อยู่
          <q class="font-weight-black ">
            ระบบจะมีปัญหาได้
          </q>
        </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    valid: true,
    search: "",
    headers: [
      { text: "ลำดับ", value: "No" },
      { text: "ชื่อหม่วดหมู่", align: "start", value: "u_name", divider: true },
      { text: "หมายเหตุ", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    units: { _id: "", u_name: "" },
    type: null,
    deleteId: null,
    rules: [value => !!value || "โปรดกรอกข้อมูลให้ครบถ้วน"]
  }),


  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },
  methods: {
    someFn(ev) {
      console.log(ev);
    },
    editItem(item) {
      this.type = "edit";
      this.units = item;
      this.dialog = true;
    },
    addItem() {
      this.type = "add";
      this.units = {
        _id: "",
        u_name: ""
      };
      this.dialog = true;
    },
    deleteItem(item) {
      this.deleteId = item._id;
      this.editedIndex = this.unit.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.unit.splice(this.editedIndex, 1);
      this.$axios.$delete("/unit/" + this.deleteId).then(() => {});
      this.closeDelete();
        this.$swal({
              type: "success",
              title: 'ดำเนินการสำเร็จ'
            });
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
      this.$refs.form.validate();
      if (this.type === "add") {
        this.loading = true;
        this.$emit("addUnit", { ...this.units });
      
        this.close();
        this.$swal({
              type: "success",
              title: 'เพิ่มข้อมูลสำเร็จ'
            });
      
      } else {
        this.loading = true;
        this.$axios
          .$put("/unit/" + this.units._id, this.units)
          .then(() => {
            this.close();
              this.$swal({
              type: "success",
              title: 'ดำเนินการสำเร็จ'
            });
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  },
  props: ["unit"]
};
</script>
