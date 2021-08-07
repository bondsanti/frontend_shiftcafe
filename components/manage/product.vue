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
              <v-icon left> mdi-food-turkey</v-icon> เพิ่มสินค้า
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
          solo-inverted
          flat
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-select
          v-model="sortBy"
          flat
          solo-inverted
          hide-details
          item-text="name"
          item-value="_id"
          :items="categoryname.flat()"
          prepend-inner-icon="mdi-magnify"
          label="ประเภท"
        ></v-select>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="product"
        :search="search"
        :items-per-page="20"
        :footer-props="{
          'items-per-page-options': [20, 20, 30, 40, 50, -1],
          prevIcon: 'mdi-chevron-left',
          nextIcon: 'mdi-chevron-right',
          'items-per-page-text': 'ข้อมูลหน้าต่อไป'
        }"
      >
        >
        <template v-slot:[`item.img`]="{ item }">
          <v-img
            :src="`${$nuxt.context.env.config.IMG_URL}${item.img}`"
            class="mt-2 mb-2 rounded-xl"
            aspect-ratio="1"
            width="70px"
            height="70px"
            contain
          />
        </template>

        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="700px">
            <v-card>
              <v-card-title>
                <span class="text-h5"
                  ><v-icon left> mdi-ticket-percent-outline </v-icon>
                  {{ type === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล" }}</span
                >
              </v-card-title>

              <v-card-text>
                <div>
                  <v-row>
                    <v-col cols="12"> </v-col>

                    <v-col cols="12" class="mt-n7">
                      <v-text-field
                        outlined
                        label="ชื่อสิ้นค้า"
                        v-model="productsItem.product_name"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" class="mt-n7">
                      <v-select
                        label="หมวดหมู่"
                        outlined
                        color="#1D1D1D"
                        item-text="name"
                        item-value="_id"
                        :items="categoryname.flat()"
                        v-model="productsItem.ref_cate_id"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6" class="mt-n7">
                      <v-select
                        label="ประเภท"
                        outlined
                        color="#1D1D1D"
                        item-text="name"
                        item-value="_id"
                        :items="unitname.flat()"
                        v-model="productsItem.ref_uid"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6" class="mt-n7">
                      <v-text-field
                        outlined
                        label="ราคาต้นทุน"
                        suffix="฿"
                        type="number"
                        min="0"
                        v-model="productsItem.price_cost"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" class="mt-n7">
                      <v-text-field
                        outlined
                        label="ราคาขาย"
                        suffix="฿"
                        type="number"
                        min="0"
                        v-model="productsItem.price"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="mt-n7">
                      <h3 class="text-center ml-12  mt-3">รูปภาพประกอบ</h3>

                      <v-img
                        v-if="imageURL"
                        :src="imageURL"
                        contain
                        :aspect-ratio="16 / 9"
                        class="mb-3 ml-12"
                      ></v-img>
                      <v-row>
                        <v-col>
                          <input
                            type="file"
                            accept="image/*"
                            required
                            @change="onFileSelected"
                          />
                        </v-col>
                        <v-col>
                          <v-btn color="primary" @click="dialogCrop = true"
                            >ตัดรูปภาพ</v-btn
                          >
                          <v-dialog
                            transition="dialog-bottom-transition"
                            max-width="600"
                            v-model="dialogCrop"
                          >
                            <v-card>
                              <v-toolbar color="primary" dark
                                >Opening from the bottom</v-toolbar
                              >

                              <cropper
                                ref="cropper"
                                class="cropper"
                                :src="imageURL"
                                :stencil-props="{
                                  aspectRatio: 10 / 12
                                }"
                                @change="change"
                              />
                              <preview
                                :width="120"
                                :height="120"
                                :image="result.image"
                                :coordinates="result.coordinates"
                              />

                              <v-card-actions class="justify-end">
                                <v-btn @click="croppedFinish">ตกลง</v-btn>
                                <v-btn text @click="dialogCrop = false"
                                  >ปิด</v-btn
                                >
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </div>
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
                    mdi-ticket-percent-outline </v-icon
                  >ยกเลิก</v-btn
                >
                <v-btn color="primary" class="ma-2" @click="deleteItemConfirm">
                  <v-icon aria-hidden="false" class="mx-4">
                    mdi-ticket-percent-outline</v-icon
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
              mdi-pencil
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
              mdi-trash-can
            </v-icon>
            ลบ
          </v-btn>
        </template>
        <template v-slot:[`item.No`]="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:[`item.exp`]="{ item }">
          <span>{{ item.exp | moment }}</span>
        </template>

        <template v-slot:no-data>
          <v-btn color="primary" @click="product">
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { Cropper, Preview } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
export default {
  components: {
    Cropper,
    Preview
  },
  data: () => ({
    result: {
      coordinates: null,
      image: null,
      img: null
    },
    dialog: false,
    dialogDelete: false,
    search: "",
    unitname: [],
    categoryname: [],
    sortBy: "ชื่อ",
    sortDesc: false,
    headers: [
      { text: "ลำดับ", sortable: false, value: "No" },
      { text: "ภาพ", sortable: false, value: "img" },
      { text: "ชื่อสิ้นค้า", sortable: false, value: "product_name" },
      { text: "ประเภท", sortable: false, value: "ref_uid.u_name" },
      { text: "หมวดหมู่", sortable: false, value: "ref_cate_id.cate_name" },
      { text: "ราคาต้นทุน", sortable: false, value: "price_cost" },
      { text: "ราคา", sortable: false, value: "price" },
      // { text: "สต็อก", sortable: false, value: "stock" },
      // { text: "id", sortable: false, value: "_id" },
      //{ text: "วันที่เพิ่มหน่วย", value: "data", sortable: false },
      { text: "หมายเหตุ", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    productsItem: {
      _id: "",
      product_name: "",
      ref_uid: "",
      ref_cate_id: " ",
      price_cost: " ",
      price: "",
      img: ""
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
    dialogCrop: false
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "จัดการสินค้า " : "จัดการสินค้า";
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
  methods: {
    change({ coordinates, image, canvas }) {
      canvas.toBlob(blob => {
        //console.log(blob);
        this.preImg = blob;
      });

      this.result = {
        coordinates,
        image,
        img: canvas.toDataURL()
      };
    },
    croppedFinish() {
      this.imageURL = this.result.img;
      this.dialogCrop = false;
    },

    onFileSelected(event) {
      const reader = new FileReader();
      reader.onload = event => {
        this.imageURL = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files[0]);
      this.preImg = event.target.files[0];
      //console.log(this.preImg);
    },
    editItem(item) {
      this.imageURL = `${$nuxt.context.env.config.IMG_URL}${item.img}`;
      this.type = "edit";
      this.productsItem = {
        _id: item._id,
        product_name: item.product_name,
        ref_uid: item.ref_uid._id,
        ref_cate_id: item.ref_cate_id._id,
        price_cost: item.price_cost,
        price: item.price,
        img: item.img
      };
      this.dialog = true;
    },
    getProductImage(item) {
      if (this.productsItem.img.length > 0) {
        return this.productsItem.img;
      } else {
        return `${$nuxt.context.env.config.IMG_URL}${item.img}`;
      }
    },
    addItem() {
      this.type = "add";
      this.products = {
        product_name: "",
        ref_uid: "",
        ref_cate_id: " ",
        price_cost: " ",
        price: "",
        stock: "",
        img: " "
      };
      this.dialog = true;
    },
    deleteItem(item) {
      this.deleteId = item._id;
      this.editedIndex = this.product.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.product.splice(this.editedIndex, 1);
      this.$axios.$delete("/product/" + this.deleteId).then(() => {});
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.$emit("refresh");
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.$emit("refresh");
      });
    },
    save() {
      if (this.type === "add") {
        this.loading = true;
        let formdata = new FormData();
        formdata.append("product_name", this.productsItem.product_name);
        formdata.append("ref_uid", this.productsItem.ref_uid);
        formdata.append("ref_cate_id", this.productsItem.ref_cate_id);
        formdata.append("price_cost", this.productsItem.price_cost);
        formdata.append("price", this.productsItem.price);
        //formdata.append("stock", this.productsItem.stock);
        formdata.append("img", this.preImg);
        //console.log(this.productsItem);
        //this.$emit("addProduct", formdata);
        this.$axios
          .$post("/product", formdata)
          .then(res => {
            this.$emit("refresh");
            this.productsItem = {
              product_name: "",
              ref_uid: "",
              ref_cate_id: " ",
              price_cost: " ",
              price: "",
              stock: "",
              img: " "
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
        formdata.append("product_name", this.productsItem.product_name);
        formdata.append("ref_uid", this.productsItem.ref_uid);
        formdata.append("ref_cate_id", this.productsItem.ref_cate_id);
        formdata.append("price_cost", this.productsItem.price_cost);
        formdata.append("price", this.productsItem.price);
        //formdata.append("stock", this.productsItem.stock);
        if (this.preImg !== null) {
          formdata.append("img", this.preImg);
        }
        console.log(this.preImg);
        this.$axios
          .$put("/product/" + this.productsItem._id, formdata)
          .then(() => {
            this.$emit("refresh");
            this.close();
            this.productsItem = {
              product_name: "",
              ref_uid: "",
              ref_cate_id: " ",
              price_cost: " ",
              price: "",
              stock: "",
              img: " "
            };
            this.imageURL = null;
            this.preImg = null;
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    improveUn() {
      for (let i in this.unit) {
        let un = {
          _id: this.unit[i]._id,
          name: this.unit[i].u_name
        };
        this.unitname.push(un);
      }
    },
    improveCatename() {
      for (let i in this.category) {
        let cate = {
          _id: this.category[i]._id,
          name: this.category[i].cate_name
        };
        this.categoryname.push(cate);
      }
    }
  },
  props: ["product", "unit", "category"],
  created() {
    this.improveUn();
    this.improveCatename();
  }
};
</script>
<style scoped>
.cropper {
  height: 600px;
  background: #ddd;
  margin: 0;
}
</style>
