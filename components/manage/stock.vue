<template>
  <div class="ma-3">
    <v-card class="mx-auto mt-6  py-3" elevaation="5" justify-centaer>
      <v-card-title>
        <v-dialog v-model="dialogadd" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mr-5" v-bind="attrs" v-on="on">
              <v-icon left> mdi-fridge-industrial-outline  </v-icon> จัดการstock
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5"
                ><v-icon left> mdi-fridge-industrial-outline  </v-icon> เพิ่มการstock</span
              >
            </v-card-title>

            <v-card-text>
              <v-container>
                 <v-row>
                  <v-col cols="12">
                    <v-select
                      label="รายการอาหาร"
                      outlined
                      color="#1D1D1D"
                      :items="items"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6" class="mt-n7">
                    <v-text-field
                      outlined
                      label="จำนวลอาหารที่พร้อมขาย"
                      required
                      color="#1D1D1D"
                    ></v-text-field>
                    
                  </v-col>
                   
                  <v-col cols="12" md="6" class="mt-n7">
                    <v-text-field
                      outlined
                      label="ให้แจ้งเตื่อนเมื่่อใกล้หมด"
                      required
                      color="#1D1D1D"
                    ></v-text-field>
                  </v-col>
                    <v-col cols="12" class="mt-n7">
                      <v-select
                      outlined
                      label="หน่วย"
                      required
                      color="#1D1D1D"
                      :items="items"
                    >  </v-select>
                    
                  </v-col>
                  <v-col cols="12" class="mt-n7">
                    <v-text-field
                      outlined
                      label="วันที่ลงข้อมูล"
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
                 mdi-fridge-industrial-off-outline  
                </v-icon>
                ยกเลิก
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="ma-1" color="info" @click="save">
                <v-icon aria-hidden="false" class="mx-2">
                  mdi-fridge-industrial-alert-outline  
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

      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
       
      >
        <template v-slot:top>
          
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>

                     <span class="text-h5"
                ><v-icon left>  mdi-fridge-industrial-outline </v-icon> {{ formTitle }}</span
              >
                  
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <!-- <v-row>
                       <v-col cols="12">
                    
                  </v-col>
                      <v-col cols="12" class="mt-n7">
                        <v-text-field
                        
                         outlined
                          v-model="editedItem.name"
                          label="หน่วย"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" class="mt-n7">
                        <v-text-field
                         outlined
                          v-model="editedItem.data"
                          label="วันที่แก้ไข"
                        ></v-text-field>
                      </v-col>
                    
                    </v-row> -->
                   <v-row>
                  <v-col cols="12">
                    <v-select
                      label="รายการอาหาร"
                        v-model="editedItem.name"
                      outlined
                      color="#1D1D1D"
                      :items="items"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6" class="mt-n7">
                    <v-text-field
                      outlined
                      label="จำนวลอาหารที่พร้อมขาย"
                      required
                      color="#1D1D1D"
                    ></v-text-field>
                    
                  </v-col>
            
                  <v-col cols="12" md="6" class="mt-n7">
                    <v-text-field
                      outlined
                      label="ให้แจ้งเตื่อนเมื่่อใกล้หมด"
                      required
                      color="#1D1D1D"
                    ></v-text-field>
                  </v-col>
                    <v-col cols="12" class="mt-n7">
                      <v-select
                      outlined
                      label="หน่วย"
                      required
                      color="#1D1D1D"
                      :items="items"
                    >  </v-select>
                    
                  </v-col>
                  <v-col cols="12" class="mt-n7">
                    <v-text-field
                      outlined
                      label="วันที่ลงข้อมูล"
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
                    mdi-fridge-industrial-off-outline 
                </v-icon>
                ยกเลิก
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="ma-1" color="info" @click="save">
                <v-icon aria-hidden="false" class="mx-2">
                   mdi-fridge-industrial-alert -outline
                </v-icon>
                เพิ่มข้อมูล
              </v-btn>
            </v-card-actions>


                
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="270px">
              <v-card>
                <v-card-title class="text-h5 white--text  primary"
                  >
                  
                  แน่ใจแล้วใช่มั้ยที่จะลบ
                  
                  </v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="info" class="ma-2" @click="closeDelete"
                    > <v-icon aria-hidden="false" class="mx-2">
                  mdi-fridge-industrial-alert-outline
                </v-icon>ยกเลิก</v-btn
                  >
                  <v-btn color="primary"  class="ma-2"  @click="deleteItemConfirm"
                    > <v-icon aria-hidden="false" class="mx-4">
                   mdi-fridge-industrial-off-outline
                </v-icon>ลบ</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          
        </template>
         
             <template v-slot:[`item.actions`]="{ item }">
                  <v-btn class="mr-2" color="warning" @click="editItem(item)">
                    <v-icon aria-hidden="false" class="mx-2">
                        mdi-fridge-industrial-outline
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
                       mdi-fridge-industrial-off-outline 
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
   </div >
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    
    dialogDelete: false,
    search: '',
    headers: [
      {
        text: "รายการสิ้นค้า",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "จำนวลที่พร้อมขาย", value: "calories", sortable: false  },
        { text: "ให้แจ้งเตื่อนเมื่อใกล้หมด", value: "fat" , sortable: false },
        { text: "หน่วยนับ", value: "units", sortable: false  },
      { text: "วันที่เพิ่มหน่วย", value: "data", sortable: false  },
      { text: "ดำเนินการ", value: "actions", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      data:""
    
    },
    defaultItem: {
      name: "",
       data:""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "แก้หนวยนับ";
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
          name: "โยเกริตแช่แข็ง",
          calories: 159,
          fat: "10",
          units: "ชิ้น"
          ,
          data:"13 กรกฏาคม 2564"
        },
        {
          name: "แซนวิชไอศกรีม",
          calories: 237,
          fat: "10",
          units: "ชิ้น"
          ,
          data:"13 กรกฏาคม 2564"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: "10",
          units: "ชิ้น"
          ,
          data:"13 กรกฏาคม 2564"
        },
        {
          name: "คัพเค้ก",
          calories: 305,
          fat: "10",
          units: "ขิ้น"
          ,
          data:"13 กรกฏาคม 2564"
        },
        {
          name: "ขนมปังปิง",
          calories: 356,
          fat: "10",
          units: "ชิ้น"
          ,
          data:"13 กรกฏาคม 2564"
        },
        {
          name: "เนยถั่วและเยลลี่",
          calories: 175,
          fat: "10",
          units: "ชุด"
          ,
          data:"13 กรกฏาคม 2564"
        },
        {
          name: "อมยิ้ม",
          calories: 192,
        fat: "10",
          units: "อัน"
          ,
          data:"13 กรกฏาคม 2564"
        },
        {
          name: "รังฝึ้งสด",
          calories: 408,
          fat: "10",
          units: "อัน",
          data:"13 กรกฏาคม 2564"

        },
        {
          name: "โดนัท",
          calories: 452,
          fat: "10",
         units: "ชิ้น"
          ,
          data:"13 กรกฏาคม 2564"
        },
        {
          name: "คิทแคท",
          calories: 518,
         fat: "10",
          units: "ชิ้น"
          ,
          data:"13 กรกฏาคม 2564"
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
