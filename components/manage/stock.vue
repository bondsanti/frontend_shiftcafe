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
              <v-icon left> mdi-barley </v-icon> จัดการหน่วยนับ
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

      <v-data-table
        :headers="headers"
        :items="stock"
        :search="search"
        :items-per-page="15"
      >
      <template v-slot:[`item.img`]="{ item }">
          <img
            :src="'https://api.shift-cafe.com/' + item.img"
            class="mt-2 mb-2 rounded-xl"
            aspect-ratio="1"
            style="width: 150px; height: 150px"
          />
        </template>
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5"
                  ><v-icon left> mdi-barley </v-icon> {{ formTitle }}</span
                >
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12"> </v-col>
                    <v-col cols="12" class="mt-n7">
                      <v-select
                        label="ประเภท"
                        outlined
                        color="#1D1D1D"
                        item-text="name"
                        item-value="_id"
                        :items="productitme.flat()"
                        v-model="stockitme.ref_pro_id"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6" class="mt-n7">
                      <v-text-field
                        outlined
                        label="จำนวลอาหารที่พร้อมขาย"
                        v-model="stockitme.qty_max"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="mt-n7">
                      <v-text-field
                        outlined
                        label="ให้แจ้งเตื่อนเมื่่อใกล้หมด"
                        v-model="stockitme.qty_min"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-btn class="ma-1" color="primary" dark @click="close">
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-barley-off
                  </v-icon>
                  ยกเลิก
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="ma-1" color="info" @click="save">
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-barley
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
                    mdi-barley-off </v-icon
                  >ยกเลิก</v-btn
                >
                <v-btn color="primary" class="ma-2" @click="deleteItemConfirm">
                  <v-icon aria-hidden="false" class="mx-4"> mdi-barley </v-icon
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
              mdi-barley
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
              mdi-barley-off
            </v-icon>
            ลบ
          </v-btn>
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
    productitme: [],
    headers: [
      { text: "ชื่อสิ้นค้า", align: "start", value: "ref_pro_id" },
      { text: "ให้แจ้งเตื่อนเมื่่อใกล้หมด", align: "start", value: "qty_min" },
      { text: "จำนวลอาหารที่พร้อมขาย", align: "start", value: "qty_max" },
      { text: "พนักงานที่แก้ไข", align: "start", value: "ref_emp_id" },
      { text: "วันที่", align: "start", value: "datetime" },
      { text: "หมายเหตุ", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    stockitme: {
      _id: " ",
      ref_pro_id: " ",
      qty_min: "",
      qty_max: "",
      ref_emp_id: ""
    },
    type: null,
    deleteId: null
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "จัดการstock " : "จัดการstock ";
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
    this.improveproduct();
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      this.$axios
        .get(`/product/`)
        .then(res => {
          this.categories = res.data.data;
          console.log(get);
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    editItem(item) {
      this.type = "edit";
      this.stockitme = item;
      this.dialog = true;
    },
    addItem() {
      this.type = "add";
      this.stockitme = {
        _id: " ",
        ref_pro_id: " ",
        qty_min: "",
        qty_max: "",
        ref_emp_id: ""
      };
      this.dialog = true;
    },
    deleteItem(item) {
      this.deleteId = item._id;
      this.editedIndex = this.stock.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.stock.splice(this.editedIndex, 1);
      this.$axios.$delete("/stock/" + this.deleteId).then(() => {});
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
    improveproduct() {
      for (let i in this.product) {
        let prod = {
          _id: this.product[i]._id,
          name: this.product[i].product_name
        };
        this.productitme.push(prod);
      }
    },
    save() {
      
      if (this.type === "add") {
        this.loading = true;
        
        this.$emit("addStock", { ...this.stockitme });
        this.close();
      } else {
        this.loading = true;
        this.$axios
          .$put("/stock/" + this.stockitme._id, this.stockitme)
          .then(() => {
            this.close();
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  },
  props: ["stock", "product"]
};
</script>
