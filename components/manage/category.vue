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
              <v-icon left> mdi-food-fork-drink </v-icon> จัดหมวดหมู่สินค้า
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
        :items="category"
        :search="search"
        :items-per-page="20"
        :footer-props="{
          'items-per-page-options': [20, 30, 40, 50, -1]
        }"
      >
        <template v-slot:[`item.img`]="{ item }">
          <v-img
            :src="`http://192.168.1.24:5555/${item.img}`"
            class="mt-2 mb-2 rounded-xl"
            aspect-ratio="1"
            width="100px"
            height="100px"
            contain
          />
        </template>
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5"
                  ><v-icon left> mdi-food-fork-drink </v-icon>
                  {{ formTitle }}</span
                >
              </v-card-title>
              <v-form v-model="valid" ref="form">
                <v-card-text>
                  <div>
                    <v-row>
                      <v-col cols="12"> </v-col>
                      <v-col cols="12" class="mt-n7">
                        <v-text-field
                          outlined
                          :rules="rules"
                          v-model="cate.cate_name"
                          label="ชื่อ"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" class="mt-n7">
                        <v-img
                          v-if="imageURL"
                          :src="imageURL"
                          contain
                          max-height="300px"
                          max-width="300px"
                          class="mb-3 ml-12"
                        ></v-img>
                        <input
                          accept="image/*"
                          type="file"
                          :rules="rules"
                          @change="onFileSelected"
                        />
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
                    showAlert();
                  "
                >
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-content-save
                  </v-icon>
                  เพิ่มข้อมูลหมวดหมูสินค้า
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
                    showAlert();
                  "
                >
                  <v-icon aria-hidden="false"> mdi-delete-forever </v-icon
                  >ลบ</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn class="mr-2 pa-2" color="warning" @click="editItem(item)">
            <v-icon aria-hidden="false">
              mdi-pencil
            </v-icon>
            แก้ไขหมวดหมู่
          </v-btn>
          <v-btn
            rounded-lx
            class="mr-2  pa-2"
            color="error"
            @click="deleteItem(item)"
          >
            <v-icon dark class="mx-2">
              mdi-delete-forever
            </v-icon>
            ลบหมวดหมู
          </v-btn>
        </template>
        <template v-slot:[`item.No`]="{ index }">
          {{ index + 1 }}
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
    rules: [value => !!value || "โปรดกรอกข้อมูลให้ครบถ้วน"],
    valid: true,
    dialog: false,
    dialogDelete: false,
    search: "",
    headers: [
      { text: "ลำดับ", sortable: false, value: "No" },
      { text: "ภาพ", sortable: false, value: "img" },
      { text: "ชื่อหม่วดหมู่", align: "start", value: "cate_name" },
      { text: "เหตุผล", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    cate: { _id: "", cate_name: "", img: "" },
    type: null,
    deleteId: null,
    uploadState: false,
    img: [],
    error: { state: false, msg: "" },
    imageURL: null,
    preImg: null
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
  mounted() {
    this.toast = this.$swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000
    });
  },
  methods: {
    onFileSelected(event) {
      const reader = new FileReader();
      reader.onload = event => {
        this.imageURL = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.preImg = event.target.files[0];
      //console.log(this.preImg);
    },
    showAlert() {
      this.toast({
        type: "success",
        title: "ดำเนิการสำเร็จ"
      });
      this.text_val_for_test = Date.now();
    },
    someFn(ev) {
      console.log(ev);
    },
    getProductImage(item) {
      if (this.cate.img.length > 0) {
        return this.cate.img;
      } else {
        return `http://192.168.1.24:5555/${item.img}`;
      }
    },
    editItem(item) {
      this.type = "edit";
      this.imageURL = `http://192.168.1.24:5555/${item.img}`;
      this.cate = {
        _id: item._id,
        cate_name: item.cate_name,
        img: item.img
      };
      this.dialog = true;
    },
    addItem() {
      this.type = "add";
      this.cate = {
        _id: "",
        cate_name: "",
        img: ""
      };
      this.dialog = true;
    },
    deleteItem(item) {
      this.deleteId = item._id;
      this.editedIndex = this.category.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.category.splice(this.editedIndex, 1);
      this.$axios.$delete("/category/" + this.deleteId).then(() => {});
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
      this.$refs.form.validate();
      if (this.type === "add") {
        this.loading = true;
        let formdata = new FormData();
        formdata.append("cate_name", this.cate.cate_name);
        formdata.append("img", this.preImg);
        //console.log(this.productsItem);
        this.$emit("addCategory", formdata);
        this.cate = {
          cate_name: "",
          img: " "
        };
        this.imageURL = null;
        this.close();
        this.preImg = null;
      } else {
        this.loading = true;
        let formdata = new FormData();
        formdata.append("cate_name", this.cate.cate_name);
        if (this.preImg !== null) {
          formdata.append("img", this.preImg);
        }
        // console.log(this.productsItem);

        this.$axios
          .$put("/category/" + this.cate._id, formdata)
          .then(() => {
            this.$emit("refresh");
            this.close();
            this.cate = {
              cate_name: "",
              img: " "
            };
            this.imageURL = null;
            this.preImg = null;
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  },
  props: ["category"]
};
</script>
