<template>
  <div>
    <v-row class="justify-center">
      <v-dialog v-model="orderDl" max-width="500px" persistent>
        <v-card>
          <v-form v-model="valid" ref="form">
            <v-card-title>
              โปรดกรอกชื่อลูกค้า
            </v-card-title>
            <v-card-text>
              <v-text-field
                :rules="rules"
                autofocus
                v-model="bill_name"
                @keypress.enter="addOrderToDatabase"
              ></v-text-field>
            </v-card-text>
          </v-form>
          <v-card-actions>
            <v-btn
              color="primary"
              @click="addOrderToDatabase"
              :disabled="!valid"
            >
              บันทึกคำสั่งซื้อ
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="closeOrderDl">ปิด</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row class="justify-center">
      <v-dialog
        transition="dialog-bottom-transition"
        v-model="holdDl"
        max-width="100%"
      >
        <v-card>
          <v-toolbar color="primary" dark
            ><h3>พักการขาย/ออเดอร์</h3>
            <v-spacer></v-spacer
            ><v-btn outlined @click="$emit('closeHold')">ปิด</v-btn></v-toolbar
          >
          <div class="d-flex flex-row mb-3 ">
            <v-col cols="3" md="3"><h3>ชื่อบิล</h3></v-col>
            <v-col cols="4" md="3" class="hidden-sm-and-down"
              ><h3>เวลา</h3></v-col
            >
            <v-col cols="4" md="1" class="hidden-sm-and-down"
              ><h3>รายการ</h3></v-col
            >
            <v-col cols="3" md="1"><h3>รวมเงิน</h3></v-col>
            <v-col cols="3" md="2"><h3>สถานะ</h3></v-col>
            <v-col cols="3" md="2"><h3>จัดการ</h3></v-col>
          </div>
          <div
            class="d-flex flex-row m-2"
            v-for="(order2, i) in orderOnDatabase"
            :key="i"
          >
            <v-col cols="3" md="3">{{ order2.bill_name }}</v-col>
            <v-col cols="4" md="3" class="hidden-sm-and-down">{{
              formatDate(order2.datetime)
            }}</v-col>
            <v-col cols="4" md="1" class="hidden-sm-and-down">{{
              order2.list_product.length
            }}</v-col>
            <v-col cols="3" md="1">{{ order2.total_price }} ฿</v-col>
            <v-col cols="3" md="2"
              ><v-chip
                width="100%"
                outlined
                :color="orderOnDatabase[i].status_cook === 0 ? 'red' : 'green'"
                ><span class="text-truncate">
                  {{
                    orderOnDatabase[i].status_cook === 0
                      ? "ยังไม่ได้สั่งทำ"
                      : "สั่งทำแล้ว"
                  }}
                </span></v-chip
              ></v-col
            >
            <v-col cols="3" md="2" class="hidden-xs-only">
              <div class="d-flex flex-row  flex-wrap justify-center">
                <v-tooltip top>
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn
                      v-on="on"
                      v-bind="attrs"
                      small
                      fab
                      class="ma-1"
                      v-show="orderOnDatabase[i].status_cook === 0"
                      ><v-icon color="indigo accent-4" @click="checkCook(i)"
                        >mdi-format-list-checks</v-icon
                      ></v-btn
                    >
                  </template>
                  <span>ตรวจสอบการสั่งทำ</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn v-bind="attrs" v-on="on" small fab class="ma-1"
                      ><v-icon color="info" @click="viewOrderChild(i)"
                        >mdi-eye</v-icon
                      ></v-btn
                    >
                  </template>
                  <span>ดูรายการหรือแก้ไข</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn
                      v-on="on"
                      v-bind="attrs"
                      v-show="orderOnDatabase[i].status_cook !== 0"
                      small
                      fab
                      class="ma-1"
                      @click="printorder(i)"
                      ><v-icon color="teal">mdi-printer</v-icon></v-btn
                    >
                  </template>
                  <span>สำหรับเรียกเก็บเงินลูกค้า</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn
                      v-on="on"
                      v-bind="attrs"
                      small
                      fab
                      class="ma-1"
                      @click="deleteOrderOnDatabase(i)"
                      v-show="orderOnDatabase[i].status_cook === 0"
                      ><v-icon color="red">mdi-delete</v-icon></v-btn
                    >
                  </template>
                  <span>ลบรายการสั่งซื้อ</span>
                </v-tooltip>
              </div>
            </v-col>
            <v-col cols="3" md="2" class="hidden-sm-and-up">
              <v-expansion-panels focusable small>
                <v-expansion-panel>
                  <v-expansion-panel-header
                    ><v-icon class="hidden-xs-only"
                      >mdi-menu</v-icon
                    ></v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-row class="justify-center my-1">
                      <v-btn small fab
                        ><v-icon color="info" @click="viewOrder(i)"
                          >mdi-eye</v-icon
                        ></v-btn
                      >
                    </v-row>
                    <v-row class="justify-center my-2 ">
                      <v-btn small fab @click="printorder(i)"
                        ><v-icon color="teal">mdi-printer</v-icon></v-btn
                      >
                    </v-row>
                    <v-row class="justify-center mt-1">
                      <v-btn small fab @click="deleteOrderOnDatabase(i)"
                        ><v-icon color="red">mdi-delete</v-icon></v-btn
                      >
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
    <v-dialog v-model="cook" max-width="500px">
      <v-card>
        <v-form>
          <v-card-title>
            <span class="text-h"
              ><v-icon left> mdi-note-text-outline </v-icon> หมายเลขออเดอร์ :
              {{ itemBy ? itemBy.order_no : "" }}<br /><v-icon left>
                mdi-clipboard-account </v-icon
              >พนักงานที่รับออเดอร์ :
              {{ itemBy ? itemBy.ref_emp_id.fname : "" }}
              {{ itemBy ? itemBy.ref_emp_id.lname : "" }}
              <br /><v-icon left> mdi-card-account-details-outline </v-icon
              >ชื่อบิล : {{ itemBy ? itemBy.bill_name : "" }}
            </span>
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
              v-for="item in itemBy ? itemBy.list_product : []"
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
                ><h3>
                  ยอดสุทธิ
                  {{ formatPrice(itemBy ? itemBy.total_price : 0) }} บาท
                </h3>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class="mt-n3"></v-divider>
          <v-card-actions>
            <v-btn color="green" @click="checkCook2(itemBy._id)" dark>
              <v-icon left> mdi-check-bold </v-icon>ตรวจสอบและทำใบสั่งทำ
            </v-btn>
            <v-spacer></v-spacer>

            <v-btn color="error" @click="cook = false">
              <v-icon left> mdi-close </v-icon>ปิด
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  created() {
    this.$axios.$get("/order-hold").then(order => {
      this.orderOnDatabase = order;
    });
  },

  props: ["holdDl"],
  data: () => ({
    valid: true,
    rules: [value => !!value || "โปรดกรอกชื่อบิล"],
    bill_name: null,
    orderDl: false,
    orderOnDatabase: [],
    cook: false,
    itemBy: null
  }),
  methods: {
    async addOrderToDatabase() {
      const preOrder = {
        list_product: this.orders,
        type_order: this.type_order,
        total_price: this.subTotal,
        bill_name: this.bill_name
      };
      //console.log(preOrder);
      const res = await this.$axios.post("/order", preOrder);
      if (res.status === 200) {
        //this.refreshUser();
        this.orderOnDatabase = await this.$axios.$get("/order-hold");
        this.orders = [];
        this.subTotal = 0;
        this.bill_name = null;
        this.orderDl = false;
      } else {
        alert(res.data.message);
      }
    },
    closeOrderDl() {
      this.bill_name = null;
      this.orderDl = false;
    },
    formatPrice(value2) {
      const value = parseInt(value2);
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    formatDate(date) {
      this.$moment().format("LLLL");
      let strdate = this.$moment(date).add(543, "years");
      return this.$moment(strdate).format("D MMMM YYYY H:mm");
    },
    viewOrderChild(i) {
      this.$emit("viewOrderparent", this.orderOnDatabase[i]);
    },
    printorder(i) {
      this.bill_name = this.orderOnDatabase[i].bill_name;
      //const today = new Date(this.orderOnDatabase[i].datetime);
      var WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
      );
      WinPrint.document.write("<table>");
      WinPrint.document.write(
        "<tr><th>SHIFT restaurant</th><th style='padding-left:60px'><img width='70px' height='70px' src='https://api.shift-cafe.com/logo.png'></th></tr>"
      );
      WinPrint.document.write("</table>");
      WinPrint.document.write("<table style='width: 100%;font-size: 0.4em;'>");
      WinPrint.document.write(
        "<tr><th align='left'>บริษัท ชิฟท์ เรสเตอรองต์ จำกัด</th></tr>"
      );
      WinPrint.document.write(
        "<tr><th align='left'>ที่อยู่ : 89/1 ถนนสุขสวัสดิ์ 4 ตำบลพระบาท</th></tr>"
      );
      WinPrint.document.write(
        "<tr><th align='left'>อำเภอเมือง จังหวัดลำปาง 52000</th></tr>"
      );
      WinPrint.document.write(
        "<tr><th align='left'>เบอร์มือถือ : 0917961816</th></tr>"
      );
      WinPrint.document.write(
        `<tr><th align='left'>ชื่อบิล : ${this.bill_name}</th></tr>`
      );
      WinPrint.document.write(
        `<tr><th align='center'>วันที่ ${this.formatDate(
          this.orderOnDatabase[i].datetime
        )} </th></tr>`
      );
      WinPrint.document.write(
        "<tr><th align='center'>***สำหรับเรียกเก็บเงินลูกค้า***</th></tr>"
      );
      WinPrint.document.write("</table>");
      WinPrint.document.write(
        "<table   style='width: 100%;font-size: 0.5em;'>"
      );
      WinPrint.document.write(
        "<tr ><th style='border-bottom: thin dotted;border-top: thin dotted' width=18% >ลำดับที่</th><th style='border-bottom: thin dotted;border-top: thin dotted' width='1000px' style='padding-right:60px'>รายการ</th><th style='border-bottom: thin dotted;border-top: thin dotted' width='100px' style='padding-right:30px'>จำนวน</th><th style='border-bottom: thin dotted;border-top: thin dotted' colspan='2' width='100px'>ราคา</th></tr>"
      );
      let subTotal = 0;
      let list = this.orderOnDatabase[i].list_product;
      for (let j in list) {
        subTotal = subTotal + parseInt(list[j].price);
        WinPrint.document.write("<tr style='border-bottom: thin solid'>");
        WinPrint.document.write(
          `<td style='padding-left:20px;'>${parseInt(j) + 1}</td><td >${
            list[j].name
          }</td><td style='padding-left:20px;'>${
            list[j].qty
          }</td><td style='padding-left:20px;'>${this.formatPrice(
            list[j].price
          )} </td><td style='padding-right:20px;'>฿</td>`
        );
        WinPrint.document.write("</tr>");
      }
      WinPrint.document.write(
        "<tr><td style='border-bottom: thin dotted'></td><td style='border-bottom: thin dotted'></td><td style='border-bottom: thin dotted'></td><td style='border-bottom: thin dotted'></td><td style='border-bottom: thin dotted'></td></tr>"
      );
      WinPrint.document.write("</table>");
      WinPrint.document.write(
        "<table  style='margin-top:20px;font-size: 0.6em;'>"
      );
      WinPrint.document.write(
        `<tr><th width='1000px' align=left style='padding-right:60px;'>อาหารเครื่องดื่ม</th><th width='100px'>${this.formatPrice(
          subTotal
        )} </th><th>บาท</th></tr>`
      );
      WinPrint.document.write("</table>");
      WinPrint.document.close();
      WinPrint.focus();
      setTimeout(WinPrint.print(), 3000);
    }
  }
};
</script>
