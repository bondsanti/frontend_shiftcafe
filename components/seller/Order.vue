<template>
  <div class="" style="height: 100%">
    <v-card class="py-5 px-5" style="height: 100%;" color="secondary">
      <v-dialog v-model="dialog" max-width="500px">
        <v-card class="rounded-xl">
          <v-form>
            <v-card-title class="primary rounded-t-xl">
              <span class="text-h  shades--text">
                <span class="text-h"
                  ><v-icon left color="shades"> mdi-note-text-outline </v-icon>
                  หมายเลขออเดอร์ : {{ itemBy ? itemBy.order_no : ""
                  }}<br /><v-icon left color="shades">
                    mdi-clipboard-account </v-icon
                  >พนักงานที่รับออเดอร์ :
                  {{ itemBy ? itemBy.ref_emp_id.fname : "" }}
                  {{ itemBy ? itemBy.ref_emp_id.lname : "" }}
                  <br /><v-icon left color="shades">
                    mdi-card-account-details-outline </v-icon
                  >ชื่อบิล : {{ itemBy ? itemBy.bill_name : "" }}
                </span>
              </span>
            </v-card-title>
            <v-divider class="mb-3"></v-divider>
            <v-card-text>
              <v-row>
                <v-col
                  cols="4"
                  class="flex-grow-0 flex-shrink-0 text-center mb-3"
                  ><h4>รายการ</h4></v-col
                >
                <v-col cols="4" class="flex-grow-0 flex-shrink-0 text-center"
                  ><h4>จำนวน</h4></v-col
                >
                <v-col cols="4" class="flex-grow-0 flex-shrink-0 text-center"
                  ><h4>ราคา</h4></v-col
                >
              </v-row>
              <div
                v-for="(item, i) in itemBy ? itemBy.list_product : []"
                :key="i"
              >
                <v-row no-gutters style="flex-wrap: nowrap" class="my-3">
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
                <v-row no-gutters v-if="item.topping.length !== 0">
                  - {{ convertArrayToString(item.topping) }}</v-row
                >
                <v-row no-gutters v-if="item.detail.length !== 0">
                  ** {{ item.detail }} **</v-row
                >
              </div>
              <v-row>
                <v-col cols="12" class="flex-grow-0 flex-shrink-0 text-center"
                  ><h3>ยอดสุทธิ {{ formatPrice(from.total_price) }}</h3>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider class="mt-n3"></v-divider>
            <v-card-actions>
              <v-btn color="success " class="rounded-xl" @click="for_cook" text>
                <v-icon left> mdi-printer-pos </v-icon>พิมพ์ใบสั่งทำ
              </v-btn>
              <v-spacer></v-spacer>

              <v-btn color="error" text @click="close">
                <v-icon left> mdi-close </v-icon>ปิด
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <v-row>
        <v-col xs="12" sm="12" md="12" class="">
          <v-card class="px-6 py-5 mb-5 rounded-xl">
            <v-card-title>
              <h2 class="text-center">ข้อมูลการสั่งซื้อ</h2>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                solo
                append-icon="mdi-magnify"
                label="ค้นหา"
                class="rounded-xl"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="orderTableData"
              :search="search"
              multi-sort
              :items-per-page="25"
              :footer-props="{
                'items-per-page-options': [30, 40, 50, -1],
                prevIcon: 'mdi-chevron-left',
                nextIcon: 'mdi-chevron-right',
                'items-per-page-text': 'ข้อมูลหน้าต่อไป'
              }"
              class="mb-n5"
            >
              <template v-slot:[`item.No`]="{ index }">
                {{ index + 1 }}
              </template>
              <template v-slot:[`item.status_cook`]="{ item }">
                <v-chip :color="getColor2(item.status_cook)" dark small>
                  {{ item.status_cook }}
                </v-chip>
              </template>

              <template v-slot:[`item.status`]="{ item }">
                <v-chip :color="getColor(item.status)" dark small>
                  {{ item.status }}
                </v-chip>
              </template>
              <template v-slot:[`item.total_price`]="{ item }">
                <span class="">{{ formatPrice(item.total_price) }}</span>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn
                  class="mr2 rounded-xl"
                  color="warning"
                  elevation="2"
                  @click="Detail(item.actions)"
                  small
                >
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-eye-settings
                  </v-icon>
                  ดูรายละเอียด
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import printOrder from "@/instant/print_order.js";
export default {
  data() {
    return {
      search: "",
      dialog: false,
      from: {
        total_price: ""
      },
      itemBy: null,
      headers: [
        { text: "ลำดับ", sortable: false, value: "No" },
        {
          text: "วัน เวลา",
          align: "start",
          sortable: false,
          value: "datetime"
        },
        { text: "ชื่อบิล", value: "bill_name", sortable: false },
        { text: "สถานะสั่งทำ", value: "status_cook", sortable: false },
        { text: "สถานะ", value: "status", sortable: false },
        { text: "ยอดสั่งซื้อ", value: "total_price", sortable: false },
        { text: "หมายเหตุ", value: "actions", sortable: false }
      ]
      //historyOrder: []
    };
  },
  computed: {
    orderTableData() {
      //console.log(this.historyOrder.reverse());
      return this.historyOrder.reverse().map(item => {
        return {
          datetime: this.formatDate(item.datetime),
          bill_name: item.bill_name,
          status_cook:
            item.status_cook === 0 ? "ยังไม่ได้สั่งทำ" : "สั่งทำแล้ว",
          status: item.status === 0 ? "รอชำระเงิน" : "ชำระเงินแล้ว",
          total_price: item.total_price,
          actions: item
        };
      });
    }
  },
  methods: {
    formatPrice(total_price) {
      const value = parseInt(total_price);
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getColor(status) {
      if (status === "รอชำระเงิน") return "#757575";
      else return "green";
    },
    getColor2(status) {
      if (status === "สั่งทำแล้ว") return "#2196F3";
      else if (status === "ยังไม่ได้สั่งทำ") return "#F44336";
      return "primary";
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
        this.editedIndex = -1;
      });
    },
    formatDate(date) {
      this.$moment().format("LLLL");
      let strdate = this.$moment(date).add(543, "years");
      return this.$moment(strdate).format("D MMMM YYYY H:mm");
    },
    convertArrayToString(topping) {
      let string = "";
      topping.map(t => {
        string = `${string === "" ? "" : string + ","}  ${t.name}`;
      });
      return string;
    },
    async for_cook() {
      const products = await this.$axios.$get("/product");
      const unit = await this.$axios.$get("/unit");
      printOrder(this.itemBy, products, unit);
    }
  },

  props: ["historyOrder"]
};
</script>
