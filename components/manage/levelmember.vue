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

      <v-data-table
        :headers="headers"
        :items="levelmember"
        :search="search"
        :items-per-page="20"
        :footer-props="{
          'items-per-page-options': [20, 30, 40, 50, -1]
        }"
      >
        <template v-slot:[`item.img`]="{ item }">
          <v-img
            :src="`https://api.shift-cafe.com/${item.img}`"
            class="mt-2 mb-2 rounded-xl"
            aspect-ratio="1"
            width="180px"
            height="80px"
            contain
          />
        </template>
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5"
                  ><v-icon left> mdi-ticket-account </v-icon>
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
                          v-model="levelmemberitme.level_name"
                          :rules="rules"
                          label="ชื่อระดับสมาชิก"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" class="mt-n7">
                        <v-text-field
                          outlined
                          v-model="levelmemberitme.discount"
                          :rules="rules"
                          label="ส่วนลด(%)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" class="mt-n7">
                        <v-img
                          v-if="imageURL"
                          :src="imageURL"
                          contain
                          max-height="300px"
                          max-width="300px"
                          class="mb-3 ml-12 my-3"
                        ></v-img>
                        <input
                          accept="image/*"
                          type="file"
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
          <v-btn class="mr2" color="warning" @click="editItem(item)">
            <v-icon aria-hidden="false" class="mx-2">
              mdi-close-box
            </v-icon>
            แก้ไขข้อมูล
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
            ลบระดับสมาชิก
          </v-btn>
        </template>
        <template v-slot:[`item.No`]="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:[`item.discount`]="{ item }">
          <v-chip :color="getColorstatus(item.discount)" dark small>
            <v-icon class="ma-2 ml-1" color="">
              mdi-brightness-percent
            </v-icon>
            {{ item.discount }}
          </v-chip>
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
    rules: [value => !!value || "โปรดกรอกข้อมูลให้ครบถ้วน"],
    valiid: true,
    search: "",
    headers: [
      { text: "ลำดับ", sortable: false, value: "No" },
      { text: "ภาพ", sortable: false, value: "img" },
      { text: "ชื่อหม่วดหมู่", align: "start", value: "level_name" },
      //{ text: "ID", align: "start", value: "_id", divider: true },
      { text: "ส่วนลด(%)", align: "start", value: "discount" },
      { text: "หมายเหตุ", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    levelmemberitme: { _id: "", level_name: "", discount: " ", img: "" },
    type: null,
    deleteId: null,
    uploadState: false,
    img: [],
    error: { state: false, msg: "" },
    imageURL: null,
    preImg: null,
    valid: true
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
    getColorstatus(discount) {
      if (discount) return "green";
      else return "red";
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
        return `https://api.shift-cafe.com/${item.img}`;
      }
    },
    editItem(item) {
      this.type = "edit";
      this.imageURL = `https://api.shift-cafe.com/${item.img}`;
      this.levelmemberitme = {
        _id: item._id,
        level_name: item.level_name,
        discount: item.discount,
        img: item.img
      };
      this.dialog = true;
    },
    addItem() {
      this.type = "add";
      this.levelmemberitme = {
        _id: "",
        level_name: "",
        discount: " "
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
      this.$refs.form.validate();
      if (this.type === "add") {
        this.loading = true;
        let formdata = new FormData();
        formdata.append("level_name", this.levelmemberitme.level_name);
        formdata.append("discount", this.levelmemberitme.discount);
        formdata.append("img", this.preImg);
        //console.log(this.productsItem);
        this.$emit("addCategory", formdata);
        this.levelmemberitme = {
          level_name: "",
          discount: " ",
          img: ""
        };
        this.imageURL = null;
        this.close();
        this.preImg = null;
      } else {
        this.loading = true;

        let formdata = new FormData();
        formdata.append("level_name", this.levelmemberitme.level_name);
        formdata.append("discount", this.levelmemberitme.discount);
        if (this.preImg !== null) {
          formdata.append("img", this.preImg);
        }
        // console.log(this.productsItem);

        this.$axios
          .$put("/level-member/" + this.levelmemberitme._id, formdata)
          .then(() => {
            this.$emit("refresh");
            this.close();
            this.levelmemberitme = {
              level_name: "",
              discount: " ",
              img: ""
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
  props: ["levelmember"]
};
</script>
