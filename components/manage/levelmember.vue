<template>
  <div class="ma-3 ">
    <!-- photo -->
    <v-dialog v-model="dialogPhoto" max-width="500" max-height="300">
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
        <v-btn
          color="primary"
          dark
          class="mr-5  mb-6 rounded-xl"
          elevation="15"
          @click="addItem"
        >
          <v-icon left> mdi-card-account-details-star </v-icon> เพิ่มข้อมูล
        </v-btn>

        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหา"
          solo
          class="rounded-xl"
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
            @click="photo(item)"
          />
        </template>
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="800px">
            <v-card class="rounded-xl">
              <v-card-title>
                <span class="text-h5">
                  <v-icon left> mdi-ticket-account </v-icon>
                  {{ type === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล" }}
                </span>
                <v-btn text color="error" class="mr-4" @click="reset">
                  รีเซ็ตแบบฟอร์ม
                </v-btn>
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
                          clearable
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" class="mt-n7">
                        <v-text-field
                          outlined
                          v-model="levelmemberitme.discount"
                          :rules="rules"
                          clearable
                          type="number"
                          label="ส่วนลด(%)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" class="mt-n7">
                        <v-text-field
                          outlined
                          v-model="levelmemberitme.target_price"
                          :rules="rules"
                          type="number"
                          clearable
                          label="กำหนดราคาที่ต้องการเปลี่ยนระดับ"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" class="mt-n7">
                        <v-textarea
                          outlined
                          v-model="levelmemberitme.detail"
                          :rules="rules"
                          clearable
                          label="รายละเอียดบัตร"
                        ></v-textarea>
                      </v-col>

                      <!--photo  -->

                      <v-col cols="12" class="mt-n7">
                        <h3
                          v-if="image.src"
                          class="text-center ml-12  mt-3 mb-3"
                        >
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
                              class="mx-1 white--text  rounded-xl"
                              elevation="15"
                              @click="crop"
                              color="green"
                              >ดูรูปตัวอย่าง</v-btn
                            >
                            <v-btn
                              class="mx-1 white--text  rounded-xl"
                              elevation="15"
                              @click="crop"
                              color="blue"
                              >บันทึกรูปที่หมุน</v-btn
                            >
                            <v-btn
                              class="mx-1 white--text  rounded-xl"
                              elevation="15"
                              color="orange"
                              @click="croppedFinish"
                              >ตัดรูปภาพ</v-btn
                            >
                          </div>
                        </example-wrapper>
                        <v-row>
                          <v-col> </v-col>
                          <v-col>
                            <v-btn
                              @click="$refs.file.click()"
                              class="upload-example__button mt-3 rounded-xl"
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
                          <v-col> </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>
              </v-form>
              <v-card-actions>
                <v-btn
                  class="ma-1  rounded-xl"
                  color="primary"
                  dark
                  elevation="15"
                  @click="close"
                >
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-close-box
                  </v-icon>
                  ยกเลิก
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  class="ma-1  rounded-xl"
                  color="info"
                  elevation="15"
                  :disabled="!valid"
                  @click="save()"
                >
                  <v-icon aria-hidden="false" class="mx-2 rounded-xl">
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

                  <v-btn
                    class="mr-1 rounded-xl"
                    elevation="15"
                    color="error"
                    @click="close"
                  >
                    <v-icon left> mdi-close </v-icon>ปิด
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:[`item.detail`]="{ item }">
          <v-btn
            class="mr1 rounded-xl"
            color="teal"
            elevation="15"
            @click="Detail(item.detail)"
          >
            <div class="d-block  white--text">
              <v-icon small left> mdi-eye </v-icon>ดูรายละเอียด
            </div>
          </v-btn>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            elevation="15"
            class="mr2 rounded-xl"
            color="warning"
            @click="editItem(item)"
          >
            <v-icon left dark>
              mdi-close-box
            </v-icon>
            แก้ไข
          </v-btn>
          <v-btn
            elevation="15"
            class="mr-2 rounded-xl"
            color="error"
            @click="deleteItem(item)"
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
    //แคป
    result: {
      coordinates: null,
      img: null
    },
    // dialog all
    dialog: false,
    dialogDelete: false,
    dialogDetail: false,
    dialogPhoto: false,
    //
    rules: [value => !!value || "โปรดกรอกข้อมูลให้ครบถ้วน"],
    valiid: true,
    // ค้นหา
    search: "",
    // หัวข้อความที่ดึงออกมาแสดง
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
    // v-model
    levelmemberitme: {
      _id: "",
      level_name: "",
      discount: "",
      img: "",
      target_price: "",
      detail: ""
    },
    //type and deleteId
    type: null,
    deleteId: null,
    uploadState: false,
    // img function all
    img: [],
    error: {
      state: false,
      msg: ""
    },
    image: {
      src: null
    },
    preImg: null,
    valid: true,
    itemDetail: []
  }),
  // ตัวแอกชั้นทั้งหมด
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },
  // ปรับรูแบบวันแบบไทย
  filters: {
    moment: function(date) {
      var strdate = moment(date).add(543, "years");
      return moment(strdate).format("D/MM/YY H:mm");
    }
  },
  methods: {
    reset() {
      this.$refs.form.reset();
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

    // ส่งค่าสีในตาราง
    getColorstatus(discount) {
      if (discount) return "green";
      else return "red";
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
      this.levelmemberitme = {
        img: item.img
      };
      this.dialogPhoto = true;
    },
    // แก้ไข
    editItem(item) {
      this.type = "edit";
      this.result.img = null;
      this.image.src = `${$nuxt.context.env.config.IMG_URL}${item.img}`;
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
      this.dialogDetail = true;
    },
    // ADD DATA TO DB
    addItem() {
      this.image.src = null;
      this.result.img = null;
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
    // ลบ
    deleteItem(item) {
      this.deleteId = item._id;
      this.editedIndex = this.levelmember.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    // ยืนยันการลบ
    deleteItemConfirm() {
      this.levelmember.splice(this.editedIndex, 1);
      this.$axios
        .$delete("/level-member/" + this.deleteId)
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
      (this.dialogDetail = false), (this.dialog = false);
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
        this.loading = true;
        this.$refs.form.validate();
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

            this.image.src = null;
            this.result.img = null;
            this.close();
            this.preImg = null;
            this.$swal({
              type: "success",
              // title: res.message
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
          .then(res => {
            this.$emit("refresh");

            this.levelmemberitme = {
              level_name: "",
              discount: " ",
              target_price: "",
              detail: "",
              img: ""
            };
            this.image.src = null;
            this.result.img = null;
            this.preImg = null;
            this.close();
            this.$swal({
              type: "success",
              // title: res.message
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
  props: ["levelmember"]
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
