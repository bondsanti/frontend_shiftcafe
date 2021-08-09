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
              <v-icon left> mdi-card-account-details-star </v-icon> เพิ่มข้อมูล
            </v-btn>
          </template>
        </v-dialog>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหา"
          solo
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="levelmember"
        :search="search"
        :items-per-page="10"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50, -1],
          prevIcon: 'mdi-chevron-left',
          nextIcon: 'mdi-chevron-right',
          'items-per-page-text': 'ข้อมูลหน้าต่อไป'
        }"
      >
        <template v-slot:[`item.img`]="{ item }">
          <v-img
            :src="`${$nuxt.context.env.config.IMG_URL}${item.img}`"
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
                <span class="text-h5">
                  <v-icon left> mdi-ticket-account </v-icon>
                  {{ type === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล" }}
                </span>
              </v-card-title>
              <v-divider></v-divider>
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
                      <v-col cols="6" class="mt-n7">
                        <v-text-field
                          outlined
                          v-model="levelmemberitme.discount"
                          :rules="rules"
                          label="ส่วนลด(%)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" class="mt-n7">
                        <v-text-field
                          outlined
                          v-model="levelmemberitme.target_price"
                          :rules="rules"
                          label="กำหนดราคาที่ต้องการเปลี่ยนระดับ"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" class="mt-n7">
                        <v-textarea
                          outlined
                          v-model="levelmemberitme.detail"
                          :rules="rules"
                          label="รายละเอียดบัตร"
                        ></v-textarea>
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
                  {{ type === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล" }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="410">
            <v-card>
              <v-card-title class="primary--text text-center">
                คุณแน่ใจหรือว่าต้องการลบรายการนี้หรือไม่?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="info" plain class="ma-2" @click="closeDelete">
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-close-box </v-icon
                  >ยกเลิก
                </v-btn>
                <v-btn
                  color="error"
                  plain
                  class="ma-2"
                  @click="
                    deleteItemConfirm();
                    showAlert();
                  "
                >
                  <v-icon aria-hidden="false" class="mx-4">
                    mdi-delete-forever </v-icon
                  >ลบ
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDetail" max-width="500px">
            <v-card>
              <v-form>
                <v-card-title>
                  รายละเอียดบัตร
                </v-card-title>
                <v-divider class="mb-3"></v-divider>
                <v-card-text>
                  <p>{{ itemDetail }}</p>
                </v-card-text>
                <v-divider class="mt-n3"></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn color="error" @click="close">
                    <v-icon left> mdi-close </v-icon>ปิด
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:[`item.detail`]="{ item }">
          <v-btn class="mr1" small color="teal" @click="Detail(item.detail)">
            <div class="d-block  white--text">
              <v-icon small left> mdi-eye </v-icon>ดูรายละเอียด
            </div>
          </v-btn>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn class="mr2" color="warning" @click="editItem(item)" small>
            <v-icon left dark>
              mdi-close-box
            </v-icon>
            แก้ไข
          </v-btn>
          <v-btn
            rounded-lx
            class="mr-2"
            color="error"
            @click="deleteItem(item)"
            small
          >
            <v-icon left dark>
              mdi-delete-forever
            </v-icon>
            ลบ
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
        <template v-slot:[`item.datetime`]="{ item }">
          <span>{{ item.datetime | moment }}</span>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="$nuxt.refresh()">
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
    dialogDetail: false,
    rules: [value => !!value || "โปรดกรอกข้อมูลให้ครบถ้วน"],
    valiid: true,
    search: "",
    headers: [
      {
        text: "ลำดับ",
        sortable: false,
        value: "No"
      },
      {
        text: "วันที่อัพเดท",
        value: "datetime"
      },
      {
        text: "ภาพ",
        sortable: false,
        value: "img"
      },
      {
        text: "ชื่อระดับสมาชิก",
        value: "level_name"
      },
      {
        text: "ส่วนลด(%)",
        value: "discount"
      },
      {
        text: "รายละเอียด",
        value: "detail"
      },
      {
        text: "หมายเหตุ",
        value: "actions",
        sortable: false
      }
    ],
    editedIndex: -1,
    levelmemberitme: {
      _id: "",
      level_name: "",
      discount: "",
      img: "",
      target_price: "",
      detail: ""
    },
    type: null,
    deleteId: null,
    uploadState: false,
    img: [],
    error: {
      state: false,
      msg: ""
    },
    imageURL: null,
    preImg: null,
    valid: true,
    itemDetail: []
  }),

  // computed: {
  //   formTitle() {
  //     return this.editedIndex === -1 ? "จัดการข้อมูล " : "จัดการข้อมูล ";
  //   }
  // },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },
  filters: {
    moment: function(date) {
      // return moment(date).format('Do MMMM YYYY').add(543, 'years')
      var strdate = moment(date).add(543, "years");
      return moment(strdate).format("D/MM/YY H:mm");
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
        return `${$nuxt.context.env.config.IMG_URL}${item.img}`;
      }
    },
    editItem(item) {
      this.type = "edit";
      this.imageURL = `${$nuxt.context.env.config.IMG_URL}${item.img}`;
      this.levelmemberitme = {
        _id: item._id,
        level_name: item.level_name,
        discount: item.discount,
        target_price: item.target_price,
        detail: item.detail,
        img: item.img
      };
      this.dialog = true;
    },
    Detail(item) {
      this.itemDetail = item;
      // return itemDetail
      // console.log("aa" + JSON.stringify(this.itemDetail));

      this.dialogDetail = true;
    },
    addItem() {
      this.type = "add";
      this.levelmemberitme = {
        _id: "",
        level_name: "",
        discount: "",
        target_price: "",
        detail: ""
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
      (this.dialogDetail = false), (this.dialog = false);
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.$emit("refresh");
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.$emit("refresh");
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
        formdata.append("target_price", this.levelmemberitme.target_price);
        formdata.append("detail", this.levelmemberitme.detail);
        formdata.append("img", this.preImg);
        //console.log(this.productsItem);
        this.$axios
          .$post("/level-member", formdata)
          .then(res => {
            this.$emit("refresh");
            ///this.$emit("addCategory", formdata);
            this.levelmemberitme = {
              level_name: "",
              discount: "",
              target_price: "",
              detail: "",
              img: ""
            };

            this.imageURL = null;
            this.close();
            this.preImg = null;
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
      } else {
        this.loading = true;

        let formdata = new FormData();
        formdata.append("level_name", this.levelmemberitme.level_name);
        formdata.append("discount", this.levelmemberitme.discount);
        formdata.append("target_price", this.levelmemberitme.target_price);
        formdata.append("detail", this.levelmemberitme.detail);
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
              target_price: "",
              detail: "",
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
