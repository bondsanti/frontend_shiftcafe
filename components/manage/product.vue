<template>
  <div class="ma-3">
    <!-- photo -->
    <v-dialog v-model="dialogPhoto" max-width="500" max-height="300">
      <v-card class="rounded-xl">
        <v-row no-gutters>
          <v-col cols="12">
            <v-row no-gutters align="center" justify="center">
              <v-img :src="image.src" contain></v-img>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <!-- // -->
    <v-card
      class="mx-auto mt-6  py-3 rounded-xl"
      elevaation="5"
      justify-centaer
    >
      <v-card-title>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="ma-5 rounded-xl"
              elevation="15"
              v-bind="attrs"
              v-on="on"
              @click="addItem"
            >
              <v-icon left> mdi-food-turkey</v-icon> เพิ่มสินค้า
            </v-btn>
          </template>
        </v-dialog>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          class="rounded-xl"
          label="ค้นหาข้อมูล"
          single-line
          solo
          hide-details
        ></v-text-field>
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
            width="100px"
            height="110px"
            contain
            @click="photo(item)"
          />
        </template>

        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="700px" persistent>
            <v-card>
              <v-card-title>
                <span class="text-h5 mr-5"
                  ><v-icon left> mdi-ticket-percent-outline </v-icon>
                  {{ type === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล" }}</span
                >
                <v-switch
                  v-model="productsItem.discount"
                  color="green"
                  class="ma-0"
                  hide-details
                  inset
                  :label="
                    productsItem.discount
                      ? 'สามารถใช้ส่วนลดกับรายการอาหารนี้ได้'
                      : 'ไม่สามารถใช้ส่วนลดกับรายการอาหารนี้ได้'
                  "
                ></v-switch>
              </v-card-title>
              <v-form v-model="valid" ref="form">
                <v-card-text>
                  <div>
                    <v-row>
                      <v-col cols="12"> </v-col>
                      <v-col cols="12" class="mt-n7">
                        <v-text-field
                          outlined
                          label="ชื่อสิ้นค้า"
                          :rules="rules"
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
                          :rules="rules"
                          :items="categoryname.flat()"
                          v-model="productsItem.ref_cate_id"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="6" class="mt-n7">
                        <v-select
                          label="ประเภท"
                          outlined
                          color="#1D1D1D"
                          :rules="rules"
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
                          :rules="rules"
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
                          :rules="rules"
                          v-model="productsItem.price"
                          required
                          color="#1D1D1D"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" class="mt-n7">
                        <h3 v-if="image.src" class="text-center ml-12  mt-3">
                          รูปภาพประกอบ
                        </h3>

                        <example-wrapper
                          class="getting-result-second-example"
                          noBoder
                          v-if="image.src"
                        >
                          <cropper
                            class="cropper"
                            ref="cropper"
                            :src="image.src"
                          />
                          <results
                            :coordinates="result.coordinates"
                            :image="result.img"
                          />
                          <!-- <div class="crop-button" @click="crop">Crop Image</div> -->
                          <div class="crop-button">
                            <v-btn
                              class="mx-5 rounded-xl"
                              elevation="15"
                              @click="crop"
                              color="green"
                              >ดูรูปตัวอย่าง</v-btn
                            ><v-btn
                              class="mx-5 rounded-xl"
                              elevation="15"
                              color="orange"
                              @click="croppedFinish"
                              >ตัดรูปภาพ</v-btn
                            >
                          </div>
                        </example-wrapper>
                        <v-row>
                          <v-col>
                            <v-btn
                              @click="$refs.file.click()"
                              class="upload-example__button rounded-xl"
                              elevation="15"
                            >
                              <input
                                type="file"
                                ref="file"
                                accept="image/*"
                                required
                                @change="loadImage($event)"
                              />
                              เลือกรูปภาพ
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>
              </v-form>
              <v-card-actions>
                <v-btn
                  class="ma-1 rounded-xl"
                  elevation="15"
                  color="primary"
                  dark
                  @click="close"
                >
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-ticket-percent-outline
                  </v-icon>
                  ยกเลิก
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  class="ma-1 rounded-xl"
                  elevation="15"
                  color="info"
                  :disabled="!valid"
                  @click="save"
                >
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
          <v-btn
            class="ma-2 white--text rounded-xl"
            elevation="15"
            color="warning"
            @click="editItem(item)"
          >
            <v-icon aria-hidden="false" class="mx-2">
              mdi-pencil
            </v-icon>
            แก้ไข
          </v-btn>
          <v-btn
            class="ma-2 rounded-xl"
            elevation="15"
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
import ExampleWrapper from "@/components/ExampleWrapper";
import Results from "@/components/Results";
export default {
  components: {
    Cropper,
    Preview,
    ExampleWrapper,
    Results
  },
  data: () => ({
    result: {
      coordinates: null,

      img: null
    },
    rules: [value => !!value || "โปรดกรอกข้อมูลให้ครบถ้วน"],
    valid: true,
    dialog: false,
    dialogDelete: false,
    dialogPhoto: false,
    search: "",
    unitname: [],
    categoryname: [],
    sortBy: "ชื่อ",
    sortDesc: false,
    headers: [
      { text: "ลำดับ", sortable: true, value: "No" },
      { text: "ภาพ", sortable: true, value: "img" },
      { text: "ชื่อสินค้า", sortable: true, value: "product_name" },
      { text: "ประเภท", sortable: true, value: "ref_uid.u_name" },
      { text: "หมวดหมู่", sortable: true, value: "ref_cate_id.cate_name" },
      { text: "ราคาต้นทุน", sortable: true, value: "price_cost" },
      { text: "ราคา", sortable: true, value: "price" },
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
      img: "",
      discount: true
    },
    type: null,
    deleteId: null,
    uploadState: false,
    img: [],
    error: {
      state: false,
      msg: ""
    },

    preImg: null,

    image: {
      src: null
    }
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
    // รูป
    photo(item) {
      this.result.img = null;
      this.image.src = `${$nuxt.context.env.config.IMG_URL}${item.img}`;
      this.levelmemberitme = { img: item.img };
      this.dialogPhoto = true;
    },

    crop() {
      const { coordinates, canvas } = this.$refs.cropper.getResult();
      canvas.toBlob(blob => {
        this.preImg = blob;
      });
      this.result.coordinates = coordinates;

      this.result.img = canvas.toDataURL();
    },

    croppedFinish() {
      const { canvas } = this.$refs.cropper.getResult();
      canvas.toBlob(blob => {
        this.preImg = blob;
      });
      this.image.src = canvas.toDataURL();
      this.result.img = null;
    },

    loadImage(event) {
      const { files } = event.target;

      if (files && files[0]) {
        if (this.image.src) {
          URL.revokeObjectURL(this.image.src);
        }

        const blob = URL.createObjectURL(files[0]);

        const reader = new FileReader();

        reader.onload = e => {
          this.image = {
            src: blob

            // type: getMimeType(e.target.result, files[0].type)
          };
        };
        this.preImg = files[0];
        reader.readAsArrayBuffer(files[0]);
      }
    },
    getProductImage(item) {
      if (this.productsItem.img.length > 0) {
        return this.productsItem.img;
      } else {
        return `${$nuxt.context.env.config.IMG_URL}${item.img}`;
      }
    },
    editItem(item) {
      this.result.img = null;
      this.image.src = `${$nuxt.context.env.config.IMG_URL}${item.img}`;
      this.type = "edit";
      this.productsItem = {
        _id: item._id,
        product_name: item.product_name,
        ref_uid: item.ref_uid._id,
        ref_cate_id: item.ref_cate_id ? item.ref_cate_id._id : "",
        price_cost: item.price_cost,
        price: item.price,
        img: item.img,
        discount: item.discount
      };
      this.dialog = true;
    },

    addItem() {
      this.image.src = null;
      this.result.img = null;
      this.type = "add";
      this.productsItem = {
        _id: "",
        product_name: "",
        ref_uid: "",
        ref_cate_id: " ",
        price_cost: " ",
        price: "",
        img: "",
        discount: true
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
      this.result.img = null;
      this.image.src;
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
        this.$refs.form.validate();
        let formdata = new FormData();
        formdata.append("product_name", this.productsItem.product_name);
        formdata.append("ref_uid", this.productsItem.ref_uid);
        formdata.append("ref_cate_id", this.productsItem.ref_cate_id);
        formdata.append("price_cost", this.productsItem.price_cost);
        formdata.append("price", this.productsItem.price);
        formdata.append("discount", this.productsItem.discount);
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
            this.image.src = null;
            this.result.img = null;
            this.close();
            this.preImg = null;
            this.$swal.fire({
              type: "success",
              title: res.message
            });
          })
          .catch(e => {
            this.$swal.fire({
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
        formdata.append("discount", this.productsItem.discount);
        //formdata.append("stock", this.productsItem.stock);
        if (this.preImg !== null) {
          formdata.append("img", this.preImg);
        }
        //console.log(this.preImg);
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
            this.image.src = null;
            this.result.img = null;
            this.preImg = null;
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    getColor(status) {
      if (status === true) return " green";
      else if (status === false) return "red";
      else return "primary ";
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
<style scoped lang="scss">
.cropper {
  height: 600px;
  background: #ddd;
  margin: 0;
}

.upload-example {
  margin-top: 20px;
  margin-bottom: 20px;
  user-select: none;
  &__cropper {
    border: solid 1px #eee;
    min-height: 300px;
    max-height: 500px;
    width: 100%;
  }
  &__cropper-wrapper {
    position: relative;
  }
  &__reset-button {
    position: absolute;
    right: 20px;
    bottom: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;
    width: 42px;
    background: rgba(#3fb37f, 0.7);
    transition: background 0.5s;
    &:hover {
      background: #3fb37f;
    }
  }
  &__buttons-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 17px;
  }
  &__button {
    display: flex;
    border: none;
    outline: solid transparent;
    color: gray;
    font-size: 16px;
    padding: 10px 20px;
    background: #3fb37f;
    cursor: pointer;
    transition: background 0.5s;
    margin: 0 16px;
    &:hover,
    &:focus {
      background: #38d890;
    }
    input {
      display: none;
    }
  }
  &__file-type {
    position: absolute;
    top: 20px;
    left: 20px;
    background: #0d0d0d;
    border-radius: 5px;
    padding: 0px 10px;
    padding-bottom: 2px;
    font-size: 12px;
    color: white;
  }
}
.getting-result-second-example {
  position: relative;
  .crop-button {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    position: absolute;
    left: 50%;
    top: -10px;
    transform: translateX(-50%);

    padding: 5px 20px;
  }
}
</style>
