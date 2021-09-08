<template>
  <div class="pa-3 ma-3">
        <!-- photo -->
    <v-dialog v-model="dialogPhoto" max-width="500">
      <v-card>
        <v-row no-gutters>
          <v-col cols="12">
            <v-row no-gutters align="center" justify="center">
              <v-img :src="image.src" contain ></v-img>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <!-- // -->
    <v-row style="min-height: 100px;">
      <v-col class="shrink"></v-col>
      <v-breadcrumbs large :items="items" divider=">"></v-breadcrumbs>
    </v-row>

    <v-card
      color="primary"
      elevation="10"
      class="rounded-xl"
      v-for="(settings, i) in settings"
      :key="i"
    >
      <v-card-title flat class="subheading font-weight-bold  white--text">
        <v-icon class="mr-3" color="white">mdi-cog-outline</v-icon>
        ตั้งค่า
      </v-card-title>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <h3>ชื่อร้าน:</h3>
          </v-list-item-content>
          <v-list-item-content class="align-end">
            {{ settings.head_title }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <h3>หัวเรื่องย่อย:</h3>
          </v-list-item-content>
          <v-list-item-content class="align-end">
            {{ settings.sub_title }}
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <h3>บริษัท:</h3>
          </v-list-item-content>
          <v-list-item-content class="align-end">
            {{ settings.restaurant }}
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <h3>ที่อยู่:</h3>
          </v-list-item-content>
          <v-list-item-content class="align-end">
            {{ settings.address }}
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <h3>เบอร์โทรติดต่อ:</h3>
          </v-list-item-content>
          <v-list-item-content class="align-end">
            {{ settings.tel }}
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <h3>ส่วนแสดงผลที่อยู่ด้านล่างสุดของเว็บไซต์ :</h3>
          </v-list-item-content>
          <v-list-item-content class="align-end">
            {{ settings.footer }}
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <h3>โลโก้:</h3>
          </v-list-item-content>
          <v-spacer></v-spacer>
          <v-card color="#ccd1d6" class="px-1 pa-3 mt-2 ">
            <v-img
              :src="`${$nuxt.context.env.config.IMG_URL}${settings.logo}`"
              class=""
              aspect-ratio="1"
              width="250px"
              height="200px"
              contain
              @click="photo(settings)"
            />
          </v-card>
          <v-spacer></v-spacer>
        </v-list-item>

        <v-list-item>
          <v-spacer></v-spacer>
          <v-list-item-content class="align-end">
            <v-btn
              text
              color="pink lighten-4"
              class="mt-3"
              @click="editItem(settings)"
            >
              <span class="primary--text">
                <v-icon>mdi-pencil</v-icon>
                แก้ไขข้อมูล
              </span>
            </v-btn>
          </v-list-item-content>
          <v-spacer></v-spacer>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- 1 -->
    <!-- add  edit -->
    <v-dialog v-model="dialog" max-width="1200px" persistent>
      <v-card>
        <v-card-title class=" grey lighten-2 mb-6">
          ตั้งค่า
        </v-card-title>

        <v-card-text>
          <div>
            <v-row>
              <v-col cols="12" sm="4">
                <v-text-field
                  outlined
                  label="ชื่อร้าน"
                  v-model="settingitem.head_title"
                  required
                  append-icon="mdi-home-city"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="4">
                <v-text-field
                  outlined
                  label="หัวเรื่องย่อย"
                  v-model="settingitem.sub_title"
                  required
                  append-icon="mdi-text-subject"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="4">
                <v-text-field
                  outlined
                  label="บริษัท"
                  v-model="settingitem.restaurant"
                  required
                  append-icon="mdi-receipt"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-textarea
                  rows="2"
                  label="ที่อยู่"
                  v-model="settingitem.address"
                  required
                  outlined
                  append-icon="mdi-map-marker"
                ></v-textarea>
              </v-col>

              <v-col cols="12" sm="4">
                <v-text-field
                  outlined
                  label="เบอร์โทรติดต่อ"
                  v-model="settingitem.tel"
                  required
                  append-icon="mdi-cellphone"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  outlined
                  label="ส่วนแสดงผลที่อยู่ด้านล่างสุดของเว็บไซต์"
                  v-model="settingitem.footer"
                  required
                  append-icon="mdi-page-layout-footer"
                ></v-text-field>
              </v-col>

              <!-- รูป -->
              <v-col cols="4" sm="4" md="4"> </v-col>

              <v-col cols="12" class="mt-n7">
                <h3 v-if="image.src" class="text-center ml-12  mt-3 mb-3">
                  <v-icon class="ma-2">mdi-flower</v-icon> โลโก้
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
                          require('../../../assets/icons/flip-horizontal.svg')
                        "
                      />
                    </square-button>
                    <square-button
                      title="Flip Vertical"
                      @click="flip(false, true)"
                    >
                      <img
                        :src="
                          require('../../../assets/icons/flip-vertical.svg')
                        "
                      />
                    </square-button>
                    <square-button title="Rotate Clockwise" @click="rotate(90)">
                      <img
                        :src="
                          require('../../../assets/icons/rotate-clockwise.svg')
                        "
                      />
                    </square-button>
                    <square-button
                      title="Rotate Counter-Clockwise"
                      @click="rotate(-90)"
                    >
                      <img
                        :src="
                          require('../../../assets/icons/rotate-clockwise.svg')
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
                      small
                      class="mx-1 my-1  white--text"
                      @click="crop"
                      color="green"
                      >ดูรูปตัวอย่าง</v-btn
                    >
                    <v-btn
                      small
                      class="mx-1 my-1  white--text"
                      @click="crop"
                      color="blue"
                      >บันทึกรูปที่หมุน</v-btn
                    >
                    <v-btn
                      small
                      class="mx-1 my-1 white--text"
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
                      class="upload-example__button mt-3"
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
              <!-- รูป -->
              <v-col cols="4" sm="4" md="4"> </v-col>
            </v-row>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn
            class="ma-1"
            color="primary"
            dark
            @click="close()"
            style=" padding: 0.5rem 1rem; border: none; outline: none;"
          >
            <v-icon aria-hidden="false" class="mx-2"> mdi-close-box </v-icon>
            ยกเลิก
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            class="ma-1"
            color="success"
            @click="save()"
            style="color: #fff;border-radius: 0.25rem; padding: 0.5rem 1rem; border: none; outline: none;"
          >
            <v-icon aria-hidden="false" class="mx-2">
              mdi-content-save
            </v-icon>
            {{ type === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 1 -->
  </div>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import ExampleWrapper from "../Components/ExampleWrapper.vue";
import VerticalButtons from "../Components/VerticalButtons .vue";
import SquareButton from "../Components/SquareButton.vue";
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
  data() {
    return {
      //แคป
      result: {
        coordinates: null,
        img: null
      },
      // ปุ่มกลับ
      items: [
        {
          text: "ตั้งค่า",
          disabled: false,
          to: "/manage/settings"
        },
        {
          text: "ปรับแต่ง",
          disabled: true,
          to: "Customizer"
        }
      ],
      dialogPhoto: false,
      dialog: false,
      type: null,
      image: {
        src: null
      },
      preImg: null,
      error: {
        state: false,
        msg: ""
      },
      uploadState: false,
      editedIndex: -1,
      logo: [],

      settingitem: {
        _id: "",
        head_title: "",
        sub_title: "",
        restaurant: "",
        address: "",
        tel: "",
        footer: ""
      }
    };
  },
  props: ["settings"],
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
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
    // รูป
    photo(settings) {
      this.result.img = null;
      this.image.src = `${$nuxt.context.env.config.IMG_URL}${settings.logo}`;
      this.settingitem = {};
      this.dialogPhoto = true;
    },
    // แก้ไข
    editItem(settings) {
      this.type = "edit";
      this.result.img = null;
      this.image.src = `${$nuxt.context.env.config.IMG_URL}${settings.logo}`;
      this.settingitem = {
        _id: settings._id,
        head_title: settings.head_title,
        sub_title: settings.sub_title,
        restaurant: settings.restaurant,
        address: settings.address,
        tel: settings.tel,
        footer: settings.footer
      };
      this.dialog = true;
    },

    close() {
      this.result.img = null;
      this.image.src;
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({});
        this.$emit("refresh");
      });
    },
    save() {
      // edti
      this.loading = true;
      let formdata = new FormData();
      formdata.append("head_title", this.settingitem.head_title);
      formdata.append("sub_title", this.settingitem.sub_title);
      formdata.append("restaurant", this.settingitem.restaurant);
      formdata.append("address", this.settingitem.address);
      if (this.preImg !== null) {
        formdata.append("logo", this.preImg);
      }
      // if (this.preImg2 !== null) {
      //   formdata.append("img_cover", this.preImg2);
      // }
      console.log(formdata);
      this.$axios
        .$put("/setting/" + this.settingitem._id, formdata)
        .then(res => {
          this.$emit("refresh");
          //this.$nuxt.refresh()
          this.close();
          window.location.reload();
          this.$forceUpdate();
          this.settingitem = {
            _id: "",
            head_title: "",
            sub_title: "",
            restaurant: "",
            address: "",
            tel: "",
            footer: ""
          };

          this.image.src = null;
          this.result.img = null;
          this.preImg = null;
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
    }
  }
};
</script>
<style>
.vue-advanced-cropper__background,
.vue-advanced-cropper__foreground {
  opacity: 1;
  background: rgb(111, 126, 109);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
<style lang="scss" scoped>
@media (hover: none) and (pointer: coarse) {
  .v-list-item {
    align-items: center;
    display: flex;
    flex: 1 1 100%;
    letter-spacing: normal;
    min-height: 48px;
    outline: none;
    padding: 0 16px;
    position: relative;
    text-decoration: none;
    flex-direction: column;
  }
}

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
    display: column;
    justify-content: center;
    margin-top: 12px;
    margin-bottom: 10px;
    position: absolute;
    left: 94%;
    top: -10px;
    transform: translateX(-50%);

    padding: 5px 20px;
  }
}
</style>
