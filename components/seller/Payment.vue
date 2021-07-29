<template>
  <div class="" style="height: 100%">
    <v-card class="py-5 px-5" style="height: 100%;" color="secondary">
      <!-- view -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-form>
            <v-card-title>
              <span class="text-h">
                <v-icon left> mdi-note-text-outline </v-icon> หมายเลขออเดอร์ :
                {{ itemBy.order_no }}<br />พนักงานที่รับออเดอร์ :
                {{ itemBy.length !== 0 ? itemBy.ref_emp_id.fname : "" }}
                {{ itemBy.length !== 0 ? itemBy.ref_emp_id.lname : "" }}
              </span>
            </v-card-title>
            <v-divider class="mb-3"></v-divider>
            <v-card-text>
              <v-row>
                <v-col cols="4" class="flex-grow-0 flex-shrink-0 text-center">
                  <h4>รายการ</h4>
                </v-col>
                <v-col cols="4" class="flex-grow-0 flex-shrink-0 text-center">
                  <h4>จำนวน</h4>
                </v-col>
                <v-col cols="4" class="flex-grow-0 flex-shrink-0 text-center">
                  <h4>ราคา</h4>
                </v-col>
              </v-row>
              <v-row
                no-gutters
                style="flex-wrap: nowrap"
                v-for="item in this.itemBy.list_product"
                :key="item.name"
              >
                <v-col cols="4" class="flex-grow-0 flex-shrink-0 text-left">
                  {{ item.name }}
                </v-col>
                <v-col cols="4" class="flex-grow-0 flex-shrink-0 text-center">
                  {{ item.qty }}
                </v-col>
                <v-col cols="4" class="flex-grow-0 flex-shrink-0 text-right">
                  {{ formatPrice(item.price) }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="flex-grow-0 flex-shrink-0 text-center">
                  <h3>ยอดสุทธิ {{ formatPrice(from.total_price) }}</h3>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider class="mt-n3"></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="error" @click="close">
                <v-icon left> mdi-close </v-icon>ปิด
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <!-- del -->
      <v-dialog v-model="dialogDelete" max-width="270px">
        <v-card>
          <v-card-title>
            แน่ใจแล้วใช่มั้ยที่จะลบ
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="info" class="ma-2" @click="closeDelete">
              <v-icon aria-hidden="false" class="mx-2"> mdi-close-box </v-icon
              >ยกเลิก</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              class="ma-2"
              @click="
                deleteItemConfirm();
                showAlert();
              "
            >
              <v-icon aria-hidden="false" class="mx-4">
                mdi-delete-forever </v-icon
              >ลบ</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- edit -->
      <v-row>
        <v-col xs="12" sm="12" md="12" class="">
          <v-card class="px-6 py-5 mb-6">
            <v-card-title>
              <h2 class="text-center">Payment</h2>
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
              :items="orderTableData"
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
                    <v-card class="primary" width="400">
                      <v-img height="150px" src="/scb.png"> </v-img>
                      <!-- <v-card-text>
                        <div class="font-weight-bold ml-2">
                          <p class=" text-center white--text">
                            {{ item.bill_name }}
                          </p>
                        </div>
                      </v-card-text> -->
                      <v-card-actions>
                        <v-row
                          align="center"
                          justify="space-around"
                          class="mb-1 mt-2"
                        >
                          <v-btn
                            text
                            color="primary accent-4"
                            @click="Detail(item.actions)"
                          >
                            <span class="white--text">ดูข้อมูล</span>
                          </v-btn>
                          <v-btn text color="primary accent-4">
                            <span class="white--text">แก้ไข</span>
                          </v-btn>
                          <v-btn
                            text
                            color="primary accent-4"
                            @click="deleteItem(item)"
                          >
                            <span class="white--text">ลบ</span>
                          </v-btn>
                        </v-row>
                      </v-card-actions>
                    </v-card>
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
      from: {
        total_price: ""
      },
      itemBy: [],
      headers: [
        { text: "ภาพ", sortable: false, value: "img" },
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
      ]
      //historyOrder: []
    };
  },
  computed: {
    orderTableData() {
      return this.historyOrder.map(item => {
        return {
          datetime: this.formatDate(item.datetime),
          bill_name: item.bill_name,
          status: item.status === 0 ? "รอชำระเงิน" : "ชำระเงินแล้ว",
          total_price: item.total_price,
          actions: item
        };
      });
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
  methods: {
    //ต้องเปลียนอันนี้ก๊อปมากจาก level
    deleteItem(item) {
      this.deleteId = item._id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
     //ต้องเปลียนอันนี้ก๊อปมากจาก level
    deleteItemConfirm() {
      this.levelmember.splice(this.editedIndex, 1);
      this.$axios.$delete("/level-member/" + this.deleteId).then(() => {});
      this.closeDelete();
    },
    formatPrice(total_price) {
      const value = parseInt(total_price);
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getColor(status) {
      if (status === "รอชำระเงิน") return "#757575";
      else return "green";
    },

    Detail(item) {
      this.from = item;
      this.itemBy = item;
      //console.log("aa" + JSON.stringify(this.itemBy));

      this.dialog = true;
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
    formatDate(date) {
      this.$moment().format("LLLL");
      let strdate = this.$moment(date).add(543, "years");
      return this.$moment(strdate).format("D MMMM YYYY H:mm");
    }
  },

  props: ["historyOrder"]
};
</script>

<style>
.theme--light.v-list {
  color: rgba(0, 0, 0, 0.87);
}
</style>
