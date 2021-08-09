<template>
  <div class="ma-3" style="height: 100%">
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
                      `${$nuxt.context.env.config.IMG_URL}${itemBy.img_cover}`
                    "
                    class="mt-1 mb-1 rounded-xl"
                    aspect-ratio="1"
                    width="200px"
                    height="200px"
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
    <v-dialog v-model="dialog" max-width="700px" persistent>
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
          <div>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  outlined
                  label="ชื่อบัญชี"
                  v-model="bankitem.bank_name"
                  required
                  append-icon="mdi-credit-card"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  outlined
                  label="เลขบัญชี"
                  v-model="bankitem.bank_number"
                  required
                  append-icon="mdi-credit-card-plus-outline"
                ></v-text-field>
              </v-col>

              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <h3 class="text-center  ml-12 mb-6">
                    <v-icon class="ma-2">mdi-credit-card-scan-outline</v-icon
                    >รูปคิวอาร์โค้ด
                  </h3>
                  <v-img
                    v-if="imageURL"
                    :src="imageURL"
                    contain
                    max-height="300px"
                    max-width="250px"
                    class="mb-3"
                  >
                  </v-img>
                  <input
                    accept="image/*"
                    type="file"
                    @change="onFileSelected"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <h3 class="text-center ml-12 mb-6 ">
                    <v-icon class="ma-2">mdi-qrcode</v-icon>รูปปก
                  </h3>
                  <v-img
                    v-if="imageURL2"
                    :src="imageURL2"
                    contain
                    max-height="300px"
                    max-width="250px"
                    class="mb-3"
                  ></v-img>
                  <input
                    accept="image/*"
                    type="file"
                    @change="onFileSelected2"
                  />
                </v-col>
              </v-row>
            </v-row>
          </div>
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
            color="info2"
            @click="
              save();
              overlay = false;
            "
            style="color: #fff;border-radius: 0.25rem; padding: 0.5rem 1rem; border: none; outline: none;"
          >
            <v-icon aria-hidden="false" class="mx-2">
              mdi-ticket-percent-outline
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
            color="info2"
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
            <v-text-field
              class="mb-3 mt-3 "
              v-model="search"
              append-icon="mdi-magnify"
              label="ค้นหาข้อมูล"
              single-line
              dense
              hide-details
            ></v-text-field>
          </v-card-title>
          <!-- card main -->
          <v-data-iterator
            :headers="headers"
            :items="bank"
            :search="search"
            :items-per-page="15"
            :footer-props="{
              'items-per-page-options': [15, 20, 30, 40, 50, -1],
              'items-per-page-text': 'ข้อมูลหน้าต่อไป'
            }"
            :sort-by="['datetime']"
            :sort-desc="[true, false]"
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
                  lg="2"
                >
                  <v-card elevation="15" class="rounded-xl " width="400">
                    <v-img
                      height="200px"
                      contain
                      :aspect-ratio="16 / 9"
                      :src="
                        `${$nuxt.context.env.config.IMG_URL}${item.img_cover}`
                      "
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
          </v-data-iterator>
          <!-- card main -->
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          text: "ตั้งค่า",
          disabled: false,
          to: "/manage/settings"
        },
        {
          text: "เพิ่มธนาคาร",
          disabled: true,
          href: "Bank"
        }
      ],
      absolute: true,
      opacity: 0.95,
      overlay: false,
      search: "",
      dialog: false,
      dialogDelete: false,
      dialogView: false,
      img: [],
      deleteId: null,
      type: null,
      bankitem: {
        _id: " ",
        bank_name: "",
        bank_numbe: "",
        img: "",
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

      img: [],
      error: {
        state: false,
        msg: ""
      },
      imageURL: null,
      preImg: null,
      //
      imageURL2: null,
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
    onFileSelected2(event) {
      const reader = new FileReader();
      reader.onload = event => {
        this.imageURL2 = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.preImg2 = event.target.files[0];
      //console.log(this.preImg);
    },
    getProductImage(item) {
      if (this.bankitem.img.length > 0) {
        return this.bankitem.img;
      } else {
        return `${$nuxt.context.env.config.IMG_URL}${item.img}`;
      }
    },
    getProductImage2(item) {
      if (this.bankitem.img_cover.length > 0) {
        return this.bankitem.img_cover;
      } else {
        return `${$nuxt.context.env.config.IMG_URL}${item.img_cover}`;
      }
    },
    addItem() {
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
      this.imageURL = `${$nuxt.context.env.config.IMG_URL}${item.img}`;
      this.imageURL2 = `${$nuxt.context.env.config.IMG_URL}${item.img_cover}`;
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
        .then(() => {
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            type: "success",
            text: "ดำเนินการสำเร็จ"
          });
          this.closeDelete();
        })
        .catch(e => {
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            type: "error",
            text: e,
            text: "ไม่สำเร็จ"
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
          value: item.img
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
            this.imageURL = null;
            this.imageURL2 = null;
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
          .then(() => {
            this.$emit("refresh");
            //this.$nuxt.refresh()
            this.close();
            this.bankitem = {
              bank_name: "",
              bank_number: "",
              img: " ",
              img_cover: ""
            };
            this.imageURL = null;
            this.imageURL2 = null;
            this.preImg = null;
            this.preImg2 = null;
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  },

  props: ["bank"]
};
</script>

<style scoped>
/* .theme--light.v-list {
  color: rgba(0, 0, 0, 0.87);
}
.theme--light.v-input input,
.theme--light.v-input textarea {
  color: rgb(255 255 255 / 100%);
}
.theme--light.v-select .v-select__selections {
  color: rgb(255 255 255 / 100%);
  min-height: 10px;
}
.v-input__icon--append .v-icon {
  color: rgb(255 255 255 / 100%);
}
.v-list__group__header__prepend-icon .v-icon {
  color: rgb(255, 255, 255);
}
.theme--light.v-label {
    color: rgb(255 255 255 / 100%);
}

.theme--light.v-input input, .theme--light.v-input textarea {
    color: rgba(255, 255, 255, 0.87);
}
.theme--light.v-card > .v-card__text, .theme--light.v-card > .v-card__subtitle {
    color: rgb(0 0 0);
}
.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
    border-color: rgb(255 255 255 / 100%);
}
.theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state) > .v-input__control > .v-input__slot fieldset {
    color: rgb(255 255 255 / 80%);
}
.theme--light.v-btn.v-btn--disabled .v-icon, .theme--light.v-btn.v-btn--disabled .v-btn__loading {
    color: rgb(255 255 255 / 80%) !important;
}

.theme--light.v-btn.v-btn--disabled .v-icon, .theme--light.v-btn.v-btn--disabled .v-btn__loading {
    color: rgb(255 255 255 / 100%) !important;

} */
</style>
