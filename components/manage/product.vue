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
              <v-icon left> mdi-ticket-percent-outline</v-icon> จัดหมวดหมู่
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

      <v-data-table :headers="headers" :items="product" :search="search" :items-per-page="15">
        <template v-slot:[`item.img`]="{ item }">
          <img
            :src="'https://api.shift-cafe.com/' + item.img"
            class="mt-2 mb-2 rounded-xl"
            aspect-ratio="1"
            style="width: 150px; height: 150px"
          />
        </template>
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="700px">
            <v-card>
              <v-card-title>
                <span class="text-h5"
                  ><v-icon left> mdi-ticket-percent-outline </v-icon> {{ formTitle }}</span
                >
              </v-card-title>

              <v-card-text>
                <v-container>
            
                   <v-row>
                    <v-col cols="12"> </v-col>

                    <v-col cols="12" class="mt-n7">
                      <v-text-field
                        outlined
                        label="ชื่อสิ้นค้า"
                        v-model="products.product_name"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" class="mt-n7">
                       
                       <v-select 
                      label="ประเภท"
                      outlined
                      color="#1D1D1D"
                        item-text="name"        
                       item-value="_id"
                      :items="categoryname.flat()"
                      v-model="products.ref_cate_id"
                    ></v-select>
                  </v-col>
                      <v-col cols="12" md="6" class="mt-n7">
                       
                    <v-select 
                      label="หน่วย"
                      outlined
                      color="#1D1D1D"
                        item-text="name"        
                       item-value="_id"
                      :items="unitname.flat()"
                       v-model="products.ref_uid"
                    ></v-select>
                  </v-col>
                    <v-col cols="12" md="4" class="mt-n7">
                      <v-text-field
                        outlined
                        label="ราคาต้นทุน"
                         v-model="products.price_cost"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4" class="mt-n7">
                      <v-text-field
                        outlined
                        label="ราคาขาย"
                        v-model="products.price"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>
                       <v-col cols="12" md="4" class="mt-n7">
                      <v-text-field
                        outlined
                        label="จำนวนStock"
                        v-model="products.stock"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>

                      <v-col cols="12"  class="mt-n7">
                       <v-file-input
                          v-model="products.img"
                          label="รูป"
                          outlined
                          show-size
                           dense
                          required                         
                          any
                          accept="image/*"
                          color="#1D1D1D"
                          type="file" @change="saveImage($event)"
                          ref="file"
                        ></v-file-input>
                    </v-col>
                  </v-row>
                </v-container>
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
                    mdi-ticket-percent-outline </v-icon
                  >ยกเลิก</v-btn
                >
                <v-btn color="primary" class="ma-2" @click="deleteItemConfirm">
                  <v-icon aria-hidden="false" class="mx-4"> mdi-ticket-percent-outline</v-icon
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
            mdi-ticket-percent-outline
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
              mdi-ticket-percent-outline
            </v-icon>
            ลบ
          </v-btn>
        </template>
        <template v-slot:[`item.exp`]="{ item }">
          <span>{{ item.exp | moment }}</span>
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
    search: "",
    unitname:[],
    categoryname:[],
 
    headers: [
      { text: "ภาพ", sortable: false, value: "img" },
      { text: "ชื่อสิ้นค้า", sortable: false, value: "product_name" },
      { text: "หน่วย", sortable: false, value: "ref_uid.u_name" },
      { text: "ประเภท", sortable: false, value: "ref_cate_id.cate_name" },
      { text: "ราคาต้นทุน", sortable: false, value: "price_cost" },
      { text: "ราคา", sortable: false, value: "price" },
      { text: "สต็อก", sortable: false, value: "stock" },
      { text: "วันที่เพิ่มหน่วย", value: "data", sortable: false },
      { text: "Actions", value: "actions", sortable: false }
    ],
    product: [],
    editedIndex: -1,
     products: {
      product_name: "",
      ref_uid: "",
      ref_cate_id: " ",
      price_cost: " ",
      price: "",
      stock: "",
      img: " "
    },
    type: null,
    deleteId: null,
     uploadState: false,
      img: [],
      error: {
        state: false,
        msg: ''
      },
       responseType: 'success',
      fileType: 'image/*',
      fileSize: '524288'
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "จัดหมวดหมู่ " : "จัดหมวดหมู่ ";
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
  created() {
    this.initialize();
  },
  async saveImage(e) {
            const imageData = new FormData()
            imageData.append('file', e.target.files[0])
            imageData.append('upload_preset', 'insta-clone')
            imageData.append('cloud', 'coderesource')
            try {
                const result = await this.$axios.post(`/product`, imageData);
                this.menuItem.img = result.data.url
            }catch(error) {
                console.log(error.response);
            }
        },
  methods: {
    selectFile(){
      this.file =this.$refs.file.files[0];


    },

    initialize() {
      // this.loading = true;
      //  this.$axios.$get("/authen/user").then(user => {
      //   this.user = user;
      // });
      // this.user = [];

     },
    editItem(item) {
      this.type = "edit";
      this.products = item;
      this.dialog = true;
      file:this.file
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
      const {product_name, ref_uid, ref_cate_id, price_cost, price,stock,img} = this.products
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

      if (this.type === "add") {
        this.loading = true;
     
        this.$emit("addProduct", { ...this.products});
        this.close();
      } else {
        this.loading = true;
        this.$axios
          .$put("/product/" + this.products._id, this.products)
          .then(() => {
            this.close();
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
  
  props:['product','unit','category'],
   created() {
    this.improveUn();
    this.improveCatename();
   }
};
</script>
