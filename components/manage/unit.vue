<template>
  <div class="ma-3 rounded-lg">
    <v-card
      class="mx-auto mt-6  py-3 rounded-xl"
      elevaation="5"
      justify-centaer
    >
      <v-card-title>
        <v-btn
          color="primary"
          dark
          class="ma-2 ma-1 rounded-xl"
          elevation="10"
          @click="addItem"
        >
          <v-icon left> mdi-barley </v-icon>
          <span>เพิ่มประเภทอาหาร</span>
        </v-btn>

        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหา"
          class="rounded-xl"
          single-line
          solo
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        multi-sort
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
            <v-card class="rounded-xl">
              <v-card-title>
                <span class="text-h5">
                  <v-icon left> mdi-barley </v-icon>
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
                          clearable
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>
              </v-form>
              <v-card-actions>
                <v-btn
                  class="mr-1 rounded-xl"
                  elevation="10"
                  color="primary"
                  dark
                  @click="close"
                >
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-close-box
                  </v-icon>
                  ยกเลิก
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  class="mr-1 rounded-xl"
                  elevation="10"
                  color="info"
                  :disabled="!valid"
                  @click="save()"
                >
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-content-save
                  </v-icon>
                  {{ type === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล" }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="410px">
            <v-card>
              <v-card-title class="shades--text justify-center error">
                คุณต้องลบรายการนี้หรือไม่
                <v-icon color="shades" class="mx-2">mdi-delete</v-icon>
              </v-card-title>
              <v-divider class="mx-auto"></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  x-large
                  color="warning"
                  text
                  rounded
                  class="rounded-xl"
                  @click="closeDelete"
                >
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-close-box </v-icon
                  >ยกเลิก
                </v-btn>
                <v-btn
                  class="rounded-xl my-3"
                  text
                  x-large
                  rounded
                  color="success"
                  :loading="loading"
                  @click="deleteItemConfirm()"
                >
                  <v-icon aria-hidden="false" class="mx-4">
                    mdi-delete-forever </v-icon
                  >ลบ
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            class="mr-1  mb-2 rounded-xl"
            elevation="10"
            small
            color="warning"
            @click="editItem(item)"
          >
            <v-icon aria-hidden="false" class="mx-2">
              mdi-pencil-plus
            </v-icon>
            แก้ไข
          </v-btn>
          <v-btn
            class="mr-1 mb-2  rounded-xl"
            elevation="10"
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
          โปรดตวรจสอบประเภทอาหารให้ดีก่อนลบประเภทอหารที่ใช้อยู่

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
    loading: false,
    valid: true,
    search: "",
    headers: [
      {
        text: "ลำดับ",
        value: "No"
      },
      {
        text: "ประเภทอาหาร",
        align: "start",
        value: "u_name"
      },
      {
        text: "หมายเหตุ",
        value: "actions",
        sortable: false
      }
    ],
    editedIndex: -1,
    units: {
      _id: "",
      u_name: ""
    },
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
      const result = this.unit.find(u => u._id === this.deleteId);
      // console.log(result);
      if (result.products.length !== 0) {
        //alert("ลบไม่ได้นะจ้ะ");
        this.$swal.fire({
          type: "info",
          title: "ลบไม่ได้ มีการใช้งานที่สินค้าตามรายชื่อด้านล่าง",
          text: result.products.map(p => p.product_name)
        });
      } else {
        this.unit.splice(this.editedIndex, 1);
        this.$axios
          .$delete("/unit/" + this.deleteId)
          .then(res => {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.closeDelete();
              this.$emit("refresh");
              this.$swal({
                type: "success",
                title: res.message,
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,               
              });
            }, 500);
          })
          .catch(e => {
            this.$swal({
              type: "error",
              toast: true,
              title: e
            });
          });
      }
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
        this.loading = false;
        this.$axios
          .$post("/unit/", this.units)
          .then(res => {
            this.$emit("refresh");
            this.close();
            this.$swal.fire({
              type: "success",
              title: res.message
            });
          })
          .catch(e => {
            this.$swal({
              type: "error",
              title: e
            });
          });
      } else {
        this.loading = false;
        this.$axios
          .$put("/unit/" + this.units._id, this.units)
          .then(res => {
            this.$emit("refresh");
            this.close();
            this.$swal({
              type: "success",
              title: res.message
            });
          })
          .catch(e => {
            this.$swal({
              type: "error",
              title: e
            });
          });
      }
    }
  },
  props: ["unit"]
};
</script>
