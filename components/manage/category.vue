<template>
  <div class="ma-3">
    <!-- photo -->
    <v-dialog v-model="dialogPhoto" max-width="500">
      <v-card>
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
              elevation="24"
              v-bind="attrs"
              v-on="on"
              @click="addItem"
            >
              <v-icon left> mdi-food-fork-drink </v-icon> จัดหมวดหมู่สินค้า
            </v-btn>
          </template>
        </v-dialog>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหา"
          single-line
          class="rounded-xl"
          solo
          hide-details
        ></v-text-field>
      </v-card-title>
      <!-- add edit -->
      <v-dialog v-model="dialog" max-width="700px" persistent>
        <v-card>
          <v-card-title>
            <span class="text-h5">
              <v-icon left> mdi-food-fork-drink</v-icon>
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
                      label="ชื่อสิ้นค้า"
                      v-model="cate.cate_name"
                      :rules="rules"
                      clearable
                      required
                      color="#1D1D1D"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" class="mt-n7">
                    <h3 v-if="image.src" class="text-center ml-12  mt-3 mb-3">
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
                        :transitions="true"
                        image-restriction="fit-area"
                        :default-size="defaultSize"
                        :src="image.src"
                      />
                      <vertical-buttons>
                        <square-button
                          title="Flip Horizontal"
                          @click="flip(true, false)"
                        >
                          <img
                            :src="
                              require('../../assets/icons/flip-horizontal.svg')
                            "
                          />
                        </square-button>
                        <square-button
                          title="Flip Vertical"
                          @click="flip(false, true)"
                        >
                          <img
                            :src="
                              require('../../assets/icons/flip-vertical.svg')
                            "
                          />
                        </square-button>
                        <square-button
                          title="Rotate Clockwise"
                          @click="rotate(90)"
                        >
                          <img
                            :src="
                              require('../../assets/icons/rotate-clockwise.svg')
                            "
                          />
                        </square-button>
                        <square-button
                          title="Rotate Counter-Clockwise"
                          @click="rotate(-90)"
                        >
                          <img
                            :src="
                              require('../../assets/icons/rotate-clockwise.svg')
                            "
                          />
                        </square-button>
                      </vertical-buttons>
                      <results
                        :coordinates="result.coordinates"
                        :image="result.img"
                      />

                      <!-- <div class="crop-button" @click="crop">Crop Image</div> -->
                      <div class="crop-button">
                        <v-btn
                          class="mx-1 white--text rounded-xl"
                          @click="crop"
                          color="green"
                          elevation="24"
                          small
                          >ดูรูปตัวอย่าง</v-btn
                        >
                        <v-btn
                          class="mx-1 white--text rounded-xl"
                          @click="crop"
                          small
                          color="blue"
                          elevation="24"
                          >บันทึกรูปที่หมุน</v-btn
                        >
                        <v-btn
                          class="mx-1 white--text rounded-xl"
                          small
                          color="orange"
                          elevation="24"
                          @click="croppedFinish"
                          >ตัดรูปภาพ</v-btn
                        >
                      </div>
                    </example-wrapper>
                    <v-row>
                      <v-col> </v-col>
                      <v-col>
                        <v-btn
                          outlined
                          elevation="24"
                          :rules="rules"
                          @click="$refs.file.click()"
                          class=" rounded-xl upload-example__button mt-3 primary--text "
                          style="color: #fff;border-radius: 0.25rem; padding: 0.5rem 1rem; border: none; outline: none;"
                        >
                          <input
                            :rules="rules"
                            type="file"
                            ref="file"
                            accept="image/*"
                            required
                            @change="loadImage($event)"
                          />
                          เลือกรูปภาพ
                        </v-btn>
                      </v-col>
                      <v-col> </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
          </v-form>
          <v-card-actions>
            <v-btn
              class="ma-1 mr-1 rounded-xl"
              color="primary"
              elevation="24"
              dark
              @click="close"
            >
              <v-icon aria-hidden="false" class="mx-2 mr-1 rounded-xl">
                mdi-close-box
              </v-icon>
              ยกเลิก
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              class="ma-1 mr-1 rounded-xl"
              color="info"
              elevation="24"
              :disabled="!valid"
              @click="save()"
            >
              <v-icon aria-hidden="false" class="mx-2 ">
                mdi-content-save
              </v-icon>
              {{ type === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล" }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- add edit -->

      <!-- delete -->
      <v-dialog v-model="dialogDelete" max-width="410">
        <v-card>
          <v-card-title class="primary--text text-center">
            คุณแน่ใจหรือว่าต้องการลบรายการนี้หรือไม่?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="info" plain class="ma-2" @click="closeDelete">
              <v-icon aria-hidden="false" class="mx-2"> mdi-close-box </v-icon
              >ยกเลิก
            </v-btn>
            <v-btn
              color="error"
              class="ma-2"
              plain
              @click="deleteItemConfirm()"
            >
              <v-icon aria-hidden="false"> mdi-delete-forever </v-icon>ลบ
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- delete -->

      <!-- data -->
      <v-data-iterator
        :items="category"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        hide-default-footer
      >
        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item.name"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card dark class="mx-2 rounded-xl" elevation="15">
                <div class="d-flex justify-start mb-6">
                  <!-- แสดงข้อมูล -->
                  <v-avatar class="ma-3 rounded-xl" size="125" tile>
                    <v-img
                      :aspect-ratio="16 / 9"
                      max-width="100%"
                      max-height="100%"
                      :src="`${$nuxt.context.env.config.IMG_URL}${item.img}`"
                      @click="photo(item)"
                    ></v-img>
                  </v-avatar>
                  <div>
                    <v-card-title
                      class=""
                      v-text="item.cate_name"
                    ></v-card-title>
                    <!-- แสดงข้อมูล -->
                    <v-card-subtitle></v-card-subtitle>
                    <v-card-actions>
                      <!-- แก้ไข -->
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            class="ml-2 mt-3"
                            fab
                            icon
                            v-bind="attrs"
                            v-on="on"
                            height="40px"
                            right
                            width="40px"
                            color="warning"
                            @click="editItem(item)"
                          >
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                        </template>
                        <span>แก้ไขข้อมูลหมวดหมู่</span>
                      </v-tooltip>
                      <!-- แก้ไข -->
                      <!-- ลบ -->
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            class="ml-2 mt-3"
                            fab
                            icon
                            v-bind="attrs"
                            v-on="on"
                            height="40px"
                            right
                            width="40px"
                            color="error"
                            @click="deleteItem(item)"
                          >
                            <v-icon>mdi-delete-forever</v-icon>
                          </v-btn>
                        </template>
                        <span>ลบข้อมูลหมวดหมู่สิ้นค้า</span>
                      </v-tooltip>
                      <!-- ลบ -->
                    </v-card-actions>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </template>
        <!-- footer -->
        <template v-slot:footer>
          <v-row class="mt-2 mx-3" align="center" justify="center">
            <span class="grey--text">จำนวนรายการต่อหน้า</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  text
                  color="primary"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ itemsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-spacer></v-spacer>

            <span class="mr-4 grey--text">
              หน้า {{ page }} จาก {{ numberOfPages }}
            </span>
            <v-btn text dark color="primary" class="mr-1" @click="formerPage">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn text dark color="primary" class="ml-1" @click="nextPage">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </template>
        <!-- footer -->
      </v-data-iterator>
      <!-- footer text -->
      <v-card-text>
        <v-alert
          outlined
          color="info"
          prominent
          border="left"
          class="text-center"
        >
          โปรดตวรจสอบหมวดหมู่ให้ดีก่อนลบหมวดหมู่ที่ใช้อยู่
          <q class="font-weight-black ">
            ระบบจะมีปัญหา
          </q>
        </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import ExampleWrapper from "./Components/ExampleWrapper.vue";
import VerticalButtons from "./Components/VerticalButtons .vue";
import SquareButton from "./Components/SquareButton.vue";
import Results from "@/components/Results";
import "vue-advanced-cropper/dist/style.css";
export default {
  components: {
    Cropper,
    ExampleWrapper,
    VerticalButtons,
    SquareButton,
    Results
  },

  data: () => ({
    // fielinput ปุ่มรีค่าในform
    fileInputKey: 0,
    //แคป
    result: {
      coordinates: null,
      img: null
    },
    //ค่า
    rules: [value => !!value || "โปรดกรอกข้อมูลให้ครบถ้วน"],
    valid: true,

    // dialog all
    dialog: false,
    dialogDelete: false,
    dialogPhoto: false,
    //ปรับหน้าการแสดง
    itemsPerPageArray: [20, 30, 40, 50],
    search: "",
    filter: {},
    page: 1,
    itemsPerPage: 20,
    editedIndex: -1,
    // v-model
    cate: {
      _id: "",
      cate_name: "",
      img: ""
    },
    // ประเภท
    type: null,
    // ลบ
    deleteId: null,
    //-รูป
    uploadState: false,
    img: [],
    error: {
      state: false,
      msg: ""
    },
    image: {
      src: null
    },
    preImg: null
  }),

  computed: {
    // ข้อมูลตาราง
    numberOfPages() {
      return Math.ceil(this.category.length / this.itemsPerPage);
    }
  },
  // watch-dialog ทั้งหมด
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },
  methods: {
    // data-iterators
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },

    //ปรับรูปซ้ายขาว
    flip(x, y) {
      if (this.$refs.cropper.customImageTransforms.rotate % 180 !== 0) {
        this.$refs.cropper.flip(!x, !y);
      } else {
        this.$refs.cropper.flip(x, y);
      }
    },
    // หนุมรูป
    rotate(angle) {
      this.$refs.cropper.rotate(angle);
    },
    change(args) {
      console.log(args);
    },
    // ปุ่มรีค่าในform
    reset() {
      this.$refs.form.reset();
    },
    // fielinput ปุ่มรีค่าในform
    clearfile() {
      this.fileInputKey++;
    },

    // ขนาดรูปแคปเริ่มต้น
    defaultSize({ imageSize, visibleArea }) {
      return {
        width: (visibleArea || imageSize).width,
        height: (visibleArea || imageSize).height
      };
    },
    // แคป
    crop() {
      const { coordinates, canvas } = this.$refs.cropper.getResult();
      canvas.toBlob(blob => {
        this.preImg = blob;
      });
      this.result.coordinates = coordinates;

      this.result.img = canvas.toDataURL();
    },
    // ครอบเสร็จ
    croppedFinish() {
      const { canvas } = this.$refs.cropper.getResult();
      canvas.toBlob(blob => {
        this.preImg = blob;
      });
      this.image.src = canvas.toDataURL();
      this.result.img = null;
    },

    //  แปลงไฟล์

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

    // ส่งค่ารูปภาพ
    getProductImage(item) {
      if (this.cate.img.length > 0) {
        return this.cate.img;
      } else {
        return `${$nuxt.context.env.config.IMG_URL}${item.img}`;
      }
    },
    // รูป
    photo(item) {
      this.result.img = null;
      this.image.src = `${$nuxt.context.env.config.IMG_URL}${item.img}`;
      this.cate = {
        img: item.img
      };
      this.dialogPhoto = true;
    },
    // แก้ไข
    editItem(item) {
      this.result.img = null;
      this.image.src = `${$nuxt.context.env.config.IMG_URL}${item.img}`;
      this.type = "edit";
      this.cate = {
        _id: item._id,
        cate_name: item.cate_name,
        img: item.img
      };
      this.dialog = true;
    },
    // เพิ่ม
    addItem() {
      this.image.src = null;
      this.result.img = null;
      this.type = "add";
      this.cate = {
        _id: "",
        cate_name: "",
        img: ""
      };
      this.dialog = true;
    },
    // ลบ
    deleteItem(item) {
      this.deleteId = item._id;
      this.editedIndex = this.category.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    // ยืนยันการลบ
    deleteItemConfirm() {
      this.category.splice(this.editedIndex, 1);
      this.$axios
        .$delete("/category/" + this.deleteId)
        .then(res => {
          this.$emit("refresh");
          this.closeDelete();
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
    },
    // ยกเลิก
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
    // ยกเลิกลบ
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.$emit("refresh");
      });
    },
    // บันทึก
    save() {
      if (this.type === "add") {
        this.$refs.form.validate();
        this.loading = true;
        // formdata ส่งข้อมูลฟรอม
        let formdata = new FormData();
        formdata.append("cate_name", this.cate.cate_name);
        formdata.append("img", this.preImg);
        //console.log(this.productsItem);
        // ส่งข้อมูลpost
        this.$axios
          .$post("/category", formdata)
          .then(res => {
            this.$emit("refresh");
            this.cate = {
              cate_name: "",
              img: " "
            };
            this.image.src = null;
            this.result.img = null;
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
        formdata.append("cate_name", this.cate.cate_name);
        if (this.preImg !== null) {
          formdata.append("img", this.preImg);
        }
        // console.log(this.productsItem);

        // ส่งข้อมูล put
        this.$axios
          .$put("/category/" + this.cate._id, formdata)
          .then(res => {
            this.$emit("refresh");
            this.cate = {
              cate_name: "",
              img: " "
            };
            this.image.src = null;
            this.result.img = null;
            this.close();
            this.preImg = null;
            this.$swal({
              type: "success",
              title: res.message
              // title: res.message
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
  // ค่าที่ส่งข้อมูลมาหน้าcategory
  props: ["category"]
};
</script>

<style lang="scss" scoped>
.cropper {
  max-height: 500px;
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
