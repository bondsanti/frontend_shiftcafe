<template>
  <div class="ma-3">
    <v-card class="mx-auto mt-6  py-3" elevaation="5" justify-centaer>
      <v-card-title>
        <v-dialog v-model="dialogadd" max-width="800px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mr-5" v-bind="attrs" v-on="on">
              <v-icon left> mdi-notebook-edit-outline </v-icon> เมนูจัดการสินค้า
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5"
                ><v-icon left> mdi-notebook-edit-outline </v-icon>
                เพิ่มสิ้นค้า</span
              >
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12"> </v-col>

                  <v-col cols="12" md="6" class="mt-n7">
                    <v-text-field
                      outlined
                      label="ชื่อสิ้นค้า"
                      required
                      color="#1D1D1D"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="mt-n7">
                    <v-select
                      outlined
                      label="หน่วย"
                      required
                      color="#1D1D1D"
                      :items="items"
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12" md="6" class="mt-n7">
                    <v-select
                      outlined
                      label="ประเภท"
                      required
                      color="#1D1D1D"
                      :items="items"
                    >
                    </v-select>
                  </v-col>

                  <v-col cols="12" md="6" class="mt-n7">
                    <v-text-field
                      outlined
                      label="ราคาต้นทุน"
                      required
                      color="#1D1D1D"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" class="mt-n7">
                    <v-text-field
                      outlined
                      label="ราคาสิ้นค้า"
                      required
                      color="#1D1D1D"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" class="mt-n7">
                    <v-text-field
                      outlined
                      label="สต็อก"
                      required
                      color="#1D1D1D"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n7">
                    <v-file-input
                      prepend-icon="mdi-camera"
                      outlined
                      label="รูปภาพ"
                      required
                      color="#1D1D1D"
                    >
                    </v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-btn class="ma-1" color="primary" dark @click="close">
                <v-icon aria-hidden="false" class="mx-2">
                  mdi-notebook-edit-outline
                </v-icon>
                ยกเลิก
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="ma-1" color="info" @click="save">
                <v-icon aria-hidden="false" class="mx-2">
                  mdi-notebook-edit-outline
                </v-icon>
                เพิ่มข้อมูล
              </v-btn>
            </v-card-actions>
          </v-card>
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

      <v-data-table :headers="headers" :items="desserts" :search="search">
        <template v-slot:[`item.img`]="{}">
          <img
            src="@/assets/img/photo-1.jpg"
            class="mt-2 mb-2 rounded-xl"
            aspect-ratio="1"
            style="width: 150px; height: 150px"
          />
        </template>
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="800px">
            <v-card>
              <v-card-title>
                <span class="text-h5"
                  ><v-icon left> mdi-notebook-edit-outline </v-icon>
                  {{ formTitle }}</span
                >
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12"> </v-col>

                    <v-col cols="12" md="6" class="mt-n7">
                      <v-text-field
                        outlined
                        label="ชื่อสิ้นค้า"
                        v-model="editedItem.product_name"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="mt-n7">
                      <v-select
                        outlined
                        label="หน่วย"
                        v-model="editedItem.ref_uid"
                        required
                        color="#1D1D1D"
                        :items="items"
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12" md="6" class="mt-n7">
                      <v-select
                        outlined
                        label="ประเภท"
                        v-model="editedItem.ref_cate_id"
                        required
                        color="#1D1D1D"
                        :items="items"
                      >
                      </v-select>
                    </v-col>

                    <v-col cols="12" md="6" class="mt-n7">
                      <v-text-field
                        outlined
                        label="ราคาต้นทุน"
                        v-model="editedItem.price_cost"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" class="mt-n7">
                      <v-text-field
                        outlined
                        label="ราคา"
                        v-model="editedItem.price"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" class="mt-n7">
                      <v-text-field
                        outlined
                        label="สต็อก"
                        v-model="editedItem.stock"
                        required
                        color="#1D1D1D"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="mt-n7">
                      <v-file-input
                        prepend-icon="mdi-camera"
                        outlined
                        label="รูปภาพ"
                        required
                        color="#1D1D1D"
                      >
                      </v-file-input>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-btn class="ma-1" color="primary" dark @click="close">
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-notebook-edit-outline
                  </v-icon>
                  ยกเลิก
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="ma-1" color="info" @click="save">
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-notebook-edit-outline
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
                    mdi-notebook-edit-outline </v-icon
                  >ยกเลิก</v-btn
                >
                <v-btn color="primary" class="ma-2" @click="deleteItemConfirm">
                  <v-icon aria-hidden="false" class="mx-4">
                    mdi-notebook-edit-outline </v-icon
                  >ลบ</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn  class="mr2" color="warning" @click="editItem(item)">
            <v-icon aria-hidden="false" class="mx-2">
              mdi-notebook-edit-outline
            </v-icon>
            แก้ไข
          </v-btn>
          <v-btn
            rounded-lx
            class="mr-2 "
            color="error"
            @click="deleteItem(item)"
          >
            <v-icon dark class="mx-2">
              mdi-notebook-edit-outline
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
    headers: [
      { text: "ภาพ", sortable: false, value: "img" },
      { text: "ชื่อสิ้นค้า", sortable: false, value: "product_name" },
      { text: "หน่วย", sortable: false, value: "ref_uid" },
      { text: "ประเภท", sortable: false, value: "ref_cate_id" },
      { text: "ราคาต้นทุน", sortable: false, value: "price_cost" },
      { text: "ราคา", sortable: false, value: "price" },
      { text: "สต็อก", sortable: false, value: "stock" },
      { text: "วันที่เพิ่มหน่วย", value: "data", sortable: false },
      { text: "ดำเนินการ", value: "actions", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      product_name: "",
      ref_uid: "",
      ref_cate_id: " ",
      price_cost: " ",
      price: "",
      stock: "",
      img: ""
    },
    defaultItem: {
      product_name: "",
      ref_uid: "",
      ref_cate_id: " ",
      price_cost: " ",
      price: "",
      stock: "",
      img: "",
      data: " "
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "แก้ไขสิ้นค้า";
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
  methods: {
    initialize() {
      this.desserts = [
        {
          product_name: "Frozen Yogurt",
          ref_uid: "ขวด",
          ref_cate_id: "เครื่องดืม",
          price_cost: "42",
          price: "60",
          stock: "100",
          data: "11 กรกฏาคม 2564"
        },
        {
          product_name: "Ice cream sandwich",
          ref_uid: "ขวด",
          ref_cate_id: "เครื่องดืม",
          price_cost: "42",
          price: "60",
          stock: "100",
          data: "12 กรกฏาคม 2564"
        },
        {
          product_name: "Eclair",
          ref_uid: "ขวด",
          ref_cate_id: "เครื่องดืม",
          price_cost: "42",
          price: "60",
          stock: "100",
          data: "13 กรกฏาคม 2564"
        },
        {
          product_name: "Cupcake",
          ref_uid: "ขวด",
          ref_cate_id: "เครื่องดืม",
          price_cost: "42",
          price: "60",
          stock: "100",
          data: "11 กรกฏาคม 2564"
        }
      ];
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
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
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
