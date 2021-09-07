<template>
  <div class="ma-3" style="height: 100%">
        <!-- photo -->
    <v-dialog v-model="dialogPhoto" max-width="500">
      <v-card>
        <v-row no-gutters>
          <v-col cols="12">
            <v-row no-gutters align="center" justify="center">
              <v-img :src="image2.src" contain ></v-img>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <!-- // -->

    <!--breadcrumbs-->
    <v-row style="min-height: 100px;">
      <v-col class="shrink"></v-col>
      <v-breadcrumbs large :items="items" divider=">"></v-breadcrumbs>
    </v-row>
    <!--breadcrumbs  -->

    <!-- view -->
    <v-overlay :absolute="absolute" :opacity="opacity" :value="overlay" dark>
      <v-dialog
        v-model="dialogView"
        color="primary"
        max-width="600px"
        persistent
      >
        <v-card
          style="backdrop-filter:blur(5px); background-color:rgba(255,255,255,0.9);"
        >
          <v-form>
            <v-card-title>
              <h3 class="ma-2 ">
                <v-icon left>mdi-credit-card-outline</v-icon>
                หมายบัญชีเลข
                {{ itemBy.bank_number }}
              </h3>
            </v-card-title>
            <v-divider
              class="mb-3"
              style="backdrop-filter:blur(5px); background-color:rgba(255,255,255,0.2);"
            ></v-divider>
            <v-card-text>
              <v-row>
                <v-col cols="6" class="flex-grow-0 flex-shrink-0 text-center ">
                  <h2 class="text-left">บัญชีธนาคาร</h2>
                </v-col>
                <v-col cols="6" class="flex-grow-0 flex-shrink-0 text-center ">
                  <h2 class="text-center">{{ itemBy.bank_name }}</h2>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" class="flex-grow-0 flex-shrink-0 text-center ">
                  <h2 class="text-left">บัญชีธนาคาร</h2>
                </v-col>
                <v-col cols="6" class="flex-grow-0 flex-shrink-0 text-center">
                  <h2 class="text-center">{{ itemBy.bank_name }}</h2>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" class="flex-grow-0 flex-shrink-0 text-center ">
                  <h2 class="text-left">QRCODE</h2>
                </v-col>
                
                <v-col
                  cols="6"
                  class="flex-grow-0 flex-shrink-0 text-center mt-6"
                >
                  <v-img
                  
                    :src="
                      `${$nuxt.context.env.config.IMG_URL}${itemBy.img}`
                    "
                    class="mt-1 mb-1 rounded-xl"
                    aspect-ratio="1"
                    width="250px"
                    height="250px"
                    contain
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn
                class="ma-1"
                style="  background-color: #00b894; color: #fff;border-radius: 0.25rem; padding: 0.5rem 1rem; border: none; outline: none;"
                dark
                @click="
                  closeviev();
                  overlay = false;
                "
              >
                <v-icon aria-hidden="false" class="mx-2">
                  mdi-close-box
                </v-icon>
                ปิด
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-overlay>
    <!-- view -->
    <!-- add and edit -->
    <v-dialog v-model="dialog" max-width="auto"  persistent>
      <v-card
        style="backdrop-filter:blur(5px); background-color:rgba(255,255,255,0.9); border-radius: 0.25rem; "
      >
        <v-card-title>
          <h2 class="text-h5 ">
            <v-icon> mdi-ticket-percent-outline </v-icon>
            {{ type === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล" }}
          </h2>
        </v-card-title>
     
        <v-card-text>
             <v-form v-model="valid" ref="form">
          <div>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  outlined
                  label="ชื่อบัญชี"
                  :rules="rules"
                  v-model="bankitem.bank_name"
                  required
                  append-icon="mdi-credit-card"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  outlined
                  label="เลขบัญชี"
                  :rules="banknumber"
                 counter
            maxlength="15"
                  v-model="bankitem.bank_number"
                  required
                  type="number"
                  append-icon="mdi-credit-card-plus-outline"
                ></v-text-field>
              </v-col>

              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <h3 class="text-center  ml-12 mb-6" v-if="image.src">
                    <v-icon class="ma-2">mdi-credit-card-scan-outline</v-icon
                    >รูปคิวอาร์โค้ด
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
                     <results
                            :coordinates="result.coordinates"
                            :image="result.img"
                          />
                       <div class="crop-button">
                            <v-btn
                              class="mx-1 white--text"
                              @click="crop"
                              color="green"
                              >ดูรูปตัวอย่าง</v-btn
                            >                   
                            <v-btn
                              class="mx-1 white--text"
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
                              @click="reset"
                              class="upload-example__button mt-3"
                            >
                              <input
                                type="file"
                                ref="file"
                                accept="image/*"
                                required
                                @change="loadImage($event)"
                              />
                              เลือกรูปคิวอาร์โค้ด
                            </v-btn>
                          </v-col>
                          <v-col> </v-col>
                        </v-row>
                </v-col>
<!-- รูปปก -->
                      <v-col cols="12" sm="6" md="6">
                  <h3 class="text-center  ml-12 mb-6" v-if="image2.src">
               <v-icon class="ma-2">mdi-qrcode</v-icon>รูปปก
                  </h3>
                  <example-wrapper
                    class="getting-result-second-example"
                    noBoder
                    v-if="image2.src"
                  >
                   <cropper
                            class="cropper"
                            ref="cropper2"
                            :transitions="true"
                            image-restriction="fit-area"
                            :default-size="defaultSize"
                            :src="image2.src"
                          />               
                     <results
                            :coordinates="result2.coordinates"
                            :image="result2.img_cover"
                          />
                       <div class="crop-button">
                            <v-btn
                              class="mx-1 white--text"
                              @click="crop2"
                              color="green"
                              >ดูรูปตัวอย่าง</v-btn
                            >                   
                            <v-btn
                              class="mx-1 white--text"
                              color="orange"
                              @click="croppedFinish2"
                              >ตัดรูปภาพ</v-btn
                            >
                          </div>    
                  </example-wrapper>
                     <v-row>
                          <v-col> </v-col>
                          <v-col>
                            <v-btn
                              @click="reset2"
                              class="upload-example__button mt-3"
                            >
                              <input
                                type="file"
                                ref="file2"
                                accept="image/*"
                                required
                                @change="loadImage2($event)"
                              />
                              เลือกรูปปก
                            </v-btn>
                          </v-col>
                          <v-col> </v-col>
                        </v-row>
                </v-col>

              </v-row>
            </v-row>
          </div>
          </v-form>
        </v-card-text>
 
        <v-card-actions>
          <v-btn
            class="ma-1"
            color="primary"
            dark
            @click="
              close();
              overlay = false;
            "
            style=" padding: 0.5rem 1rem; border: none; outline: none;"
          >
            <v-icon aria-hidden="false" class="mx-2">
              mdi-ticket-percent-outline
            </v-icon>
            ยกเลิก
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            class="ma-1"
            color="Success"
            :disabled="!valid"
            @click="
              save();
              overlay = false;
            "
            style="color: #fff;border-radius: 0.25rem; padding: 0.5rem 1rem; border: none; outline: none;"
          >
            <v-icon aria-hidden="false" class="mx-2">
              mdi-ticket
            </v-icon>
            {{ type === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- add and edit -->

    <!-- dialogDelete -->
    <v-dialog v-model="dialogDelete" max-width="350px" persistent>
      <v-card
        style="backdrop-filter:blur(5px); background-color:rgba(255,255,255,0.9); border-radius: 0.25rem; "
      >
        <v-card-title class=" text-center ml-12">
          แน่ใจแล้วใช่มั้ยที่จะลบ
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="Success"
            class="ma-2"
            @click="
              closeDelete();
              overlay = false;
            "
            style="color: #fff;border-radius: 0.25rem; padding: 0.5rem 1rem; border: none; outline: none;"
          >
            <v-icon aria-hidden="false" class="mx-2"> mdi-close-box </v-icon
            >ยกเลิก
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="ma-2"
            @click="
              deleteItemConfirm();
              overlay = false;
            "
            style="color: #fff;border-radius: 0.25rem; padding: 0.5rem 1rem; border: none; outline: none;"
          >
            <v-icon aria-hidden="false" class="mx-4">
              mdi-delete-forever </v-icon
            >ลบ
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- dialogDelete -->

    <v-row>
      <v-col xs="12" sm="12" md="12" class="">
        <v-card
         color="shades"
          elevation="15"
          class="px-6 py-5 mb-6"
          style="border-radius: 40px;"
        >
          <v-card-title>
            <v-btn
              dark
              class="mr-5 "
              elevation="15"
              color="primary"
              @click="
                addItem();
                overlay = !overlay;
              "
            >
              <v-icon>mdi-credit-card-plus-outline</v-icon>

              <h3 class="text-center mr-6 ml-2" style="letter-spacing: 3px">
                เพิ่มข้อมูล
              </h3>
            </v-btn>

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
          <!-- card main -->
          <v-data-iterator
            :headers="headers"
            :items="bank"
            :items-per-page.sync="itemsPerPage"
            :page.sync="page"
            :search="search"
             hide-default-footer
             class="mb-n5 "
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
                  <v-card elevation="15" class="rounded-xl " width="350">
                    <v-img
                      height="150px"
                      contain
                      :aspect-ratio="21/9"
                      :src="
                        `${$nuxt.context.env.config.IMG_URL}${item.img_cover}`
                      "
                      @click="photo(item)"
                    >
                      <v-app-bar flat color="rgba(0, 0, 0, 0)">
                        <v-toolbar-title
                          class="primary--text pl-0  ml-1"
                          style="height:57px  "
                        >
                        </v-toolbar-title>
                      </v-app-bar>
                    </v-img>
                    <v-card-actions>
                      <v-row
                        align="center"
                        justify="space-around"
                        class="mb-1 mt-1"
                      >
                        <v-btn
                          text
                          depressed
                          color="primary accent-4"
                          @click="
                            Detail(item);
                            overlay = !overlay;
                          "
                        >
                          <span class="primary--text">
                            <v-icon>mdi-eye-settings-outline</v-icon>
                          </span>
                          <v-icon></v-icon>
                        </v-btn>
                        <v-btn
                          text
                          color="primary accent-4"
                          @click="
                            editItem(item);
                            overlay = !overlay;
                          "
                        >
                          <span class="primary--text">
                            <v-icon>mdi-pencil</v-icon>
                          </span>
                        </v-btn>
                        <v-btn
                          text
                          color="primary accent-4"
                          @click="
                            deleteItem(item);
                            overlay = !overlay;
                          "
                        >
                          <span class="primary--text">
                            <v-icon>mdi-delete</v-icon>
                          </span>
                        </v-btn>
                      </v-row>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </template>
              <!-- footer -->
        <template v-slot:footer>
          <v-row class="mt-2 mx-3 mt-6 mb-6 mx-6" align="center" justify="center">
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
          <!-- card main -->
          <!-- text -->
            <v-card-text>
        <v-alert
          outlined
          color="info"
          prominent
          border="left"
          class="text-center"
        >
         ระบบธนาคาร
          <q class="font-weight-black ">
            อัพรูป QRCODE
          </q>
        </v-alert>
      </v-card-text>
          <!-- text -->
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import ExampleWrapper from "../Components/ExampleWrapper.vue";
import Results from "@/components/Results";
import "vue-advanced-cropper/dist/style.css";
export default {
  components: {
    Cropper,
    ExampleWrapper,
    Results
  },
  data() {
    return {
      // 
      itemsPerPage: 5, page: 1,
       itemsPerPageArray:  [5, 10, 15, 20, 30],
      // 
       rules: [value => !!value || "โปรดกรอกธนาคาร"],
      valid: true,
      banknumber: [
      v => !!v || "เขาเลขบัญชี 10 หลัก แต่มีบ้างธนาคารมี12,14,15หลัก",
      v => (/\d{10}/.test(v) && v.length >= 10) || "ใส่ตัวเลขไม่ถึง10ตัว",
      v => (/\d{10}/.test(v) && v.length <= 15) || "ใส่ตัวเลขเกิน15ตัว",
    ],
      //แคป
      result: {
        coordinates: null,
        img: null
      },
      result2: {
        coordinates: null,
        img_cover: null
      },
      items: [
        {
          text: "ตั้งค่า",
          disabled: false,
          to: "/manage/settings"
        },
        {
          text: "เพิ่มธนาคาร",
          disabled: true,
          to: "Bank"
        }
      ],
      absolute: true,
      opacity: 0.95,
      overlay: false,
      search: "",
       // dialog all
      dialog: false,
      dialogDelete: false,
      dialogView: false,
      dialogPhoto: false,
      img: [],
      deleteId: null,
      type: null,
      bankitem: {
        _id: " ",
        bank_name: "",
        bank_numbe: "",
        img:"",
        img_cover: ""
      },
 
      itemBy: {},
      headers: [
        {
          text: "ภาพ",
          sortable: false,
          value: "img"
        },

        {
          text: "ชื่อบัญชีธนาคาร",
          value: "bill_name"
        },
        {
          text: "เลขบัญชีธนาคาร",
          value: "bank_number"
        }
      ],
      detailArr: [],
      ploadState: false,
      error: {
        state: false,
        msg: ""
      },
      image: {
        src: null
      },
      preImg: null,
      //
      image2: {
        src: null
      },
      preImg2: null
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogView(val) {
      val || this.closeviev();
    }
  },
    computed: {
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },

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
    // ขนาดรูปแคปเริ่มต้น
    defaultSize({ imageSize, visibleArea }) {
      return {
        width: (visibleArea || imageSize).width,
        height: (visibleArea || imageSize).height
      };
    },
   // ปุ่มรีค่าในform
    reset2() {     
      this.$refs.file2.click()
    },
      reset() {     
      this.$refs.file.click()
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
          };
        };
        this.preImg = files[0];
        reader.readAsArrayBuffer(files[0]);
      }
    },
    // 

     // แคป2
    crop2() {
      const { coordinates, canvas } = this.$refs.cropper2.getResult();
      canvas.toBlob(blob => {
        this.preImg2 = blob;
      });
      this.result2.coordinates = coordinates;
      this.result2.img_cover = canvas.toDataURL();
    },
    // ครอบเสร็จ
    croppedFinish2() {
      const { canvas } = this.$refs.cropper2.getResult();
      canvas.toBlob(blob => {
        this.preImg2 = blob;
      });
      this.image2.src = canvas.toDataURL();
      this.result2.img_cover = null;
    },

    //  แปลงไฟล์
    loadImage2(event) {
      const { files } = event.target;
      if (files && files[0]) {
        if (this.image2.src) {
          URL.revokeObjectURL(this.image2.src);
      }
        const blob = URL.createObjectURL(files[0]);
        const reader2 = new FileReader();
        reader2.onload = e => {
          this.image2 = {
            src: blob
          };
        };
        this.preImg2 = files[0];
        reader2.readAsArrayBuffer(files[0]);
      }
    },
// รูป
    photo(item) {
      this.result2.img = null;
      this.image2.src = `${$nuxt.context.env.config.IMG_URL}${item.img_cover}`;
      this.bankitem = { img: item.img_cover };
      this.dialogPhoto = true;
    },
    addItem() {
      this.image.src = null;
      this.result.img = null;
      this.image2.src = null;
      this.result2.img_cover = null;
      this.type = "add";
      this.bankitem = {
        bank_name: "",
        bank_number: "",
        img: "",
        img_cover: ""
      };
      this.dialog = true;
    },
    editItem(item) {
      this.type = "edit";
      this.result.img = null;
      this.result2.img_cover = null;
      this.image.src = `${$nuxt.context.env.config.IMG_URL}${item.img}`;
      this.image2.src = `${$nuxt.context.env.config.IMG_URL}${item.img_cover}`;
      this.bankitem = {
        _id: item._id,
        bank_name: item.bank_name,
        bank_number: item.bank_number,
        img: item.img,
        img_cover: item.img_cover
      };
      this.dialog = true;
    },

    deleteItem(item) {
      this.deleteId = item._id;
      this.editedIndex = this.bank.indexOf(item);
      this.bankitem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    // ปุมdeleteItemConfirm sweetalert2
    deleteItemConfirm() {
      this.bank.splice(this.editedIndex, 1);
      this.$axios
        .$delete("/bank/" + this.deleteId)
        .then((res) => {
          this.$swal({
            type: "success",
            text: res.message
          });
          this.closeDelete();
        })
        .catch(e => {
          this.$swal({
            text: e,   
          });
        });

      this.closeDelete();
      console.log();
    },

    Detail(item) {
      this.bank_number = item.bank_number;
      this.itemBy = item;
      this.detailArr = [
        {
          name: "บัญชีธนาคาร",
          value: item.bank_name
        },

        {
          name: "เลขบัญชีธนาคาร",
          value: item.bank_number
        },
        {
          name: "QRCODE",
          value: item.image
        }
      ];

      this.dialogView = true;
      //console.log(item);
    },
    closeviev() {
      this.dialogView = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },

    close() {
      this.result.img = null;
      this.result2.img_cover = null;
      this.image.src;
      this.image2.src;
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },
    save() {
      if (this.type === "add") {
         this.$refs.form.validate();
        this.loading = true;
        let formdata = new FormData();
        formdata.append("bank_name", this.bankitem.bank_name);
        formdata.append("bank_number", this.bankitem.bank_number);
        //formdata.append("stock", this.productsItem.stock);
        formdata.append("img", this.preImg);
        formdata.append("img_cover", this.preImg2);
        //console.log(this.productsItem);
        //this.$emit("addProduct", formdata);
        this.$axios
          .$post("/bank", formdata)
          .then(res => {
            this.$emit("refresh");
            this.bankitem = {
              bank_name: "",
              bank_number: "",
              img: " ",
              img_cover: ""
            };
            this.image.src = null;
            this.result.img = null;
            this.image2.src = null;
            this.result2.img_cover = null
            this.close();
            this.preImg = null;
            this.preImg2 = null;
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
        // edti
        this.loading = true;
        let formdata = new FormData();
        formdata.append("bank_name", this.bankitem.bank_name);
        formdata.append("bank_number", this.bankitem.bank_number);
        if (this.preImg !== null) {
          formdata.append("img", this.preImg);
        }
        if (this.preImg2 !== null) {
          formdata.append("img_cover", this.preImg2);
        }
        console.log(formdata);
        this.$axios
          .$put("/bank/" + this.bankitem._id, formdata)
          .then((res) => {
            this.$emit("refresh");
            //this.$nuxt.refresh()
            this.close();
            this.bankitem = {
              bank_name: "",
              bank_number: "",
              img: " ",
              img_cover: ""
            };
            this.image.src = null;
            this.result.img = null;
             this.image2.src = null;
            this.result2.img_cover = null;
            this.preImg = null;
            this.preImg2 = null;
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

  props: ["bank"]
};
</script>

</script>
<style scoped lang="scss">
.cropper {
  height: 300px;
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
