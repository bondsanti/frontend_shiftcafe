<template>
  <div class="" style="height: 100%">
    <v-card class="py-5 px-5" style="height: 100%;" color="secondary">
      <!-- add -->
      <v-dialog v-model="dialog" max-width="700px">
        <v-card>
          <v-card-title>
            <span class="text-h5">
              <v-icon left> mdi-ticket-percent-outline </v-icon>
              {{ type === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล" }}
            </span>
          </v-card-title>

          <v-card-text>
            <div>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    outlined
                    label="ราคาต้นทุน"
                    v-model="bankitem.bank_name"
                    required
                    color="#1D1D1D"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    outlined
                    label="ราคาขาย"
                    v-model="bankitem.bank_number"
                    required
                    color="#1D1D1D"
                  ></v-text-field>
                </v-col>

                <v-row>
                  <v-col cols="12" sm="6">
                     <h3 class="text-center ml-12 mb-6">รูปปก</h3>
                    <v-img
                      v-if="imageURL"
                      :src="imageURL"
                      contain
                      max-height="300px"
                      max-width="300px"
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
                   
                    <h3 class="text-center ml-12 mb-6">รูปคิวอาร์โค้ด</h3>
                    <v-img
                      v-if="imageURL2"
                      :src="imageURL2"
                      contain
                      max-height="300px"
                      max-width="300px"
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
      <!-- add -->

      <!-- dialogDelete -->
      <v-dialog v-model="dialogDelete" max-width="270px">
        <v-card>
          <v-card-title>
            แน่ใจแล้วใช่มั้ยที่จะลบ
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="info" class="ma-2" @click="closeDelete">
              <v-icon aria-hidden="false" class="mx-2"> mdi-close-box </v-icon
              >ยกเลิก
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="ma-2" @click="deleteItemConfirm()">
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
          <v-card color="blue-grey lighten-5" class="px-6 py-5 mb-6">
            <v-card-title>
              <v-btn color="primary" dark class="mr-5" @click="addItem">
                <v-icon>mdi-credit-card-plus-outline</v-icon>
                <h2 class="text-center mr-6 ml-2">เพิ่ม</h2>
              </v-btn>

              <v-spacer></v-spacer>
              <v-text-field
                class="mb-6"
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>

            <v-data-iterator
              :headers="headers"
              :items="bank"
              :search="search"
              :items-per-page="15"
              :footer-props="{
                'items-per-page-options': [15, 20, 30, 40, 50, -1],
                prevIcon: 'mdi-chevron-left',
                nextIcon: 'mdi-chevron-right',
                'items-per-page-text': 'ข้อมูลหน้าต่อไป'
              }"
              :sort-by="['datetime']"
              :sort-desc="[true, false]"
              class="mb-n5"
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
                    <v-hover v-slot="{ hover }" open-delay="300">
                      <v-card
                        :elevation="hover ? 15 : 2"
                        class="rounded-bl-xl rounded-tr-xl"
                        width="400"
                      >
                        <v-img
                          height="200px"
                          max-width="100%"
                          :src="
                            `${$nuxt.context.env.config.IMG_URL}${item.img}`
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
                        <v-card-actions class="primary">
                          <v-row
                            align="center"
                            justify="space-around"
                            class="mb-1 mt-1"
                          >
                            <v-btn
                              text
                              depressed
                              color="primary accent-4"
                              @click="Detail(item.actions)"
                            >
                              <span class="white--text">
                                <v-icon>mdi-eye-settings-outline</v-icon>
                              </span>
                              <v-icon></v-icon>
                            </v-btn>
                            <v-btn
                              text
                              color="primary accent-4"
                              @click="editItem(item)"
                            >
                              <span class="white--text">
                                <v-icon>mdi-pencil</v-icon>
                              </span>
                            </v-btn>
                            <v-btn
                              text
                              color="primary accent-4"
                              @click="deleteItem(item)"
                            >
                              <span class="white--text">
                                <v-icon>mdi-delete</v-icon>
                              </span>
                            </v-btn>
                          </v-row>
                        </v-card-actions>
                      </v-card>
                    </v-hover>
                  </v-col>
                </v-row>
              </template>
            </v-data-iterator>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      dialog: false,
      dialogDelete: false,
      itemBy: [],
      img: [],
      deleteId: null,
      type: null,
      bankitem: {
        bank_name: "",
        bank_numbe: "",
        img: "",
        img_cover: ""
      },
      headers: [
        {
          text: "ภาพ",
          sortable: false,
          value: "img"
        },
        {
          text: "วัน เวลา",
          align: "start",
          sortable: true,
          value: "datetime"
        },
        {
          text: "ชื่อบิล",
          value: "bill_name"
        },
        {
          text: "สถานะ",
          value: "status"
        },
        {
          text: "ยอดสั่งซื้อ",
          value: "total_price"
        }
      ],

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
       preImg2: null,
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },
  // computed: {
  //   formTitle() {
  //     return this.editedIndex === -1 ? "จัดการสินค้า " : "จัดการสินค้า";
  //   }
  // },

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
      this.imageURL = `${$nuxt.context.env.config.IMG_URL}${item.img}`;
      this.imageURL2 = `${$nuxt.context.env.config.IMG_URL}${item.img_cover}`;
      this.type = "edit";
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
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          swal.error({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            type: "error",
            text: error.response.data.message,
            text: "ไม่สำเร็จ"
          });
        });

      this.closeDelete();
      console.log();
    },

    Detail(item) {
      // this.bank_name = item.bank_name;
      // this.itemBy = item;
      // this.dialog = true;
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
            this.productsItem = {
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
        this.loading = true;
        let formdata = new FormData();
        formdata.append("bank_name", this.bankitem.bank_name);
        formdata.append("bank_number", this.bankitem.bank_number);

        //formdata.append("stock", this.productsItem.stock);
        if (this.preImg !== null) {
          formdata.append("img", this.preImg);
          formdata.append("img_cover", this.preImg);
        }
        console.log(this.productsItem);
        this.$axios
          .$put("/product/" + this.bankitem._id, formdata)
          .then(() => {
            this.$emit("refresh");
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

<style>
.theme--light.v-list {
  color: rgba(0, 0, 0, 0.87);
}
</style>
