<template>
  <div class="" style="height: 100%">
    <v-card class="py-5 px-5" style="height: 100%;" color="secondary">
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-form>
            <v-card-title>
              <span class="text-h"
                ><v-icon left> mdi-note-text-outline </v-icon> หมายเลขออเดอร์ :
                {{ itemBy.order_no }}<br />พนักงานที่รับออเดอร์ :
                {{ itemBy.length !== 0 ? itemBy.ref_emp_id.fname : "" }}
                {{ itemBy.length !== 0 ? itemBy.ref_emp_id.lname : "" }}</span
              >
            </v-card-title>
            <v-divider class="mb-3"></v-divider>
            <v-card-text>
              <v-row>
                <v-col cols="4" class="flex-grow-0 flex-shrink-0 text-center"
                  ><h4>รายการ</h4></v-col
                >
                <v-col cols="4" class="flex-grow-0 flex-shrink-0 text-center"
                  ><h4>จำนวน</h4></v-col
                >
                <v-col cols="4" class="flex-grow-0 flex-shrink-0 text-center"
                  ><h4>ราคา</h4></v-col
                >
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
                <v-col cols="12" class="flex-grow-0 flex-shrink-0 text-center"
                  ><h3>ยอดสุทธิ {{ formatPrice(from.total_price) }}</h3>
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
      <v-row>
        <v-col xs="12" sm="12" md="12" class="">
          <v-card class="px-6 py-5 mb-5">
            <v-card-title>
              <h2 class="text-center">ข้อมูลการสั่งซื้อ</h2>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="historyOrder"
              :search="search"
              :items-per-page="10"
              :sort-by="['datetime']"
              :sort-desc="[true, false]"
              class="mb-n5"
            >
              <template v-slot:[`item.datetime`]="{ item }">
                <span>{{ formatDate(item.datetime) }}</span>
              </template>
              <template v-slot:[`item.status`]="{ item }">
                <v-chip :color="getColor(item.status)" dark small>
                  {{ getTxt(item.status) }}
                </v-chip>
              </template>
              <template v-slot:[`item.total_price`]="{ item }">
                <span class="">{{ formatPrice(item.total_price) }}</span>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn class="mr2" color="warning" @click="Detail(item)" small>
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
export default {
  data() {
    return {
      search: "",
      dialog: false,
      from: {
        total_price: ""
      },
      itemBy: [],
      headers: [
        {
          text: "วัน เวลา",
          align: "start",
          sortable: true,
          value: "datetime"
        },
        { text: "ชื่อบิล", value: "bill_name" },
        { text: "สถานะ", value: "status" },
        { text: "ยอดสั่งซื้อ", value: "total_price" },
        { text: "Actions", value: "actions", sortable: false }
      ]
      //historyOrder: []
    };
  },
  methods: {
    formatPrice(total_price) {
      const value = parseInt(total_price);
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getColor(status) {
      if (status === 0) return "#757575";
      else return "green";
    },
    getTxt(status) {
      if (status === 0) return "รอชำระเงิน";
      else return "ชำระเงินแล้ว";
    },
    Detail(item) {
      this.from = item;
      this.itemBy = item;
      // console.log("aa" + JSON.stringify(this.itemBy));

      for (let i in this.itemBy.list_product) {
        //console.log(this.itemBy.list_product[i].name);
      }
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

  props: ["historyOrder"]
};
</script>
