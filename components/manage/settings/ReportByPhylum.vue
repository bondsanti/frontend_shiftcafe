<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialogPhylum"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="$emit('closeRe')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title
            >รายงานยอดขายประจำเดือน {{ formatDate(daytime) }}</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="open">
              บันทึกเป็น PDF
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-sheet
          elevation="18"
          class="ma-auto pa-5 "
          height="auto"
          width="210mm"
          id="print"
        >
          <v-row class="justify-center align-center">
            <h2>{{ $store.getters["setting"][0].restaurant }}</h2>
          </v-row>
          <v-row class="justify-center align-center">
            <h3>รายงานยอดขายประจำเดือน {{ formatDate(daytime) }}</h3>
          </v-row>
          <v-row class="justify-center align-center">
            <h3>แยกตามประเภทสินค้า</h3>
          </v-row>
          <v-row class="justify-center align-center mt-6">
            <p style="font-size:14px">
              ยอดขายประจำเดือน {{ formatDate(daytime) }}
            </p>
            <p style="font-size:14px" class="mx-8">จำนวน : {{ count }}</p>
            <p style="font-size:14px">
              รวมยอด : ฿ {{ formatPrice(total) }} บาท
            </p>
          </v-row>
          <v-row class="mx-auto">
            <h4>อาหารที่ขายดีสามอันดับแรก</h4>
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left" width="60px">
                      ลำดับ
                    </th>
                    <th class="text-left" width="300px">
                      รายการ
                    </th>
                    <th class="text-left" width="100px">
                      จำนวน
                    </th>
                    <th class="text-left" width="200px">
                      ต่อหน่วย
                    </th>
                    <th class="text-left" width="200px">
                      รวม
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in listSort" :key="i">
                    <td>{{ i + 1 }}</td>
                    <td>
                      {{
                        item.topping.length !== 0
                          ? item.name + " - " + item.topping.map(t => t.name)
                          : item.name
                      }}
                    </td>
                    <td>{{ item.qty }}</td>
                    <td>฿ {{ formatPrice(item.price) }}</td>
                    <td>฿ {{ formatPrice(item.total) }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-row>
          <v-row class="mx-auto my-10">
            <h4>เครื่องดื่มที่ขายดีสามอันดับแรก</h4>
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left" width="60px">
                      ลำดับ
                    </th>
                    <th class="text-left" width="300px">
                      รายการ
                    </th>
                    <th class="text-left" width="100px">
                      จำนวน
                    </th>
                    <th class="text-left" width="200px">
                      ต่อหน่วย
                    </th>
                    <th class="text-left" width="200px">
                      รวม
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in listSort" :key="i">
                    <td>{{ i + 1 }}</td>
                    <td>
                      {{
                        item.topping.length !== 0
                          ? item.name + " - " + item.topping.map(t => t.name)
                          : item.name
                      }}
                    </td>
                    <td>{{ item.qty }}</td>
                    <td>฿ {{ formatPrice(item.price) }}</td>
                    <td>฿ {{ formatPrice(item.total) }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-row>
        </v-sheet>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "./vfs_fonts";
export default {
  props: ["dialogPhylum", "daytime"],

  data() {
    return {
      listSort: [
        { name: "test", qty: 1, price: 10, total: 10, topping: [] },
        { name: "test", qty: 1, price: 10, total: 10, topping: [] },
        { name: "test", qty: 1, price: 10, total: 10, topping: [] }
      ],
      list: [],
      count: 0,
      total: 0
    };
  },
  methods: {
    formatDate(date) {
      this.$moment().format("LLLL");
      let strdate = this.$moment(date).add(543, "years");
      return this.$moment(strdate).format("MMMM YYYY ");
    },
    makeReport(payments) {
      this.count = 0;
      this.total = 0;
      this.list = [];
      const res = [];
      payments.map(p => {
        res.push(...p.ref_order_id.list_product);
      });
      res.map(r => {
        this.replace(r);
      });
      //console.log(this.list);
      this.list.map(l => {
        this.count += parseInt(l.qty);
        this.total += parseInt(l.total);
      });
      //console.log(this.list);
      this.listSort = this.list.sort((a, b) => b.qty - a.qty);
    },
    replace(obj) {
      let toppingPrice = 0;
      obj.topping.map(t => (toppingPrice += t.price));
      const newObj = {
        name: obj.name,
        qty: obj.qty,
        price: parseInt(obj.normal_price) + parseInt(toppingPrice),
        total: obj.price,
        topping: obj.topping
      };
      for (let i in this.list) {
        let newTopping = newObj.topping.map(t => t._id);
        let oldTopping = this.list[i].topping.map(t => t._id);
        const res = newTopping.map(t => oldTopping.includes(t));
        let check = value => value === true;

        if (this.list[i].name === newObj.name) {
          if (this.list[i].topping.length === newObj.topping.length) {
            if (res.every(check)) {
              this.list[i].qty += newObj.qty;
              this.list[i].total =
                parseInt(this.list[i].total) + parseInt(newObj.total);
              this.list[i].price = this.list[i].total / this.list[i].qty;
              // setTimeout(this.totalPrice, 300);
              return;
            }
          }
        }
      }
      this.list.push(newObj);
    },
    formatPrice(value2) {
      const value = parseInt(value2);
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async open() {
      const res = [];
      //แปลงข้อมูลให้ตรงฟอแมตกับตางรางของพีดีเอฟเมค
      this.listSort.map((l, i) => {
        res.push([
          i + 1,
          l.topping.length !== 0
            ? l.name + " - " + l.topping.map(t => t.name)
            : l.name,
          l.qty,
          "฿ " + this.formatPrice(l.price),
          "฿ " + this.formatPrice(l.total)
        ]);
      });

      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.fonts = {
        THSarabunNew: {
          normal: "THSarabunNew.ttf",
          bold: "THSarabunNew-Bold.ttf",
          italics: "THSarabunNew-Italic.ttf",
          bolditalics: "THSarabunNew-BoldItalic.ttf"
        },
        Roboto: {
          normal: "Roboto-Regular.ttf",
          bold: "Roboto-Medium.ttf",
          italics: "Roboto-Italic.ttf",
          bolditalics: "Roboto-MediumItalic.ttf"
        }
      };
      const documentDefinitions = {
        info: {
          title: `รายงานประจำเดือน ${this.formatDate(this.daytime)}`,
          author: this.$store.getters["setting"][0].restaurant
        },
        header: {
          ul: [
            {
              text: this.$store.getters["setting"][0].restaurant,
              fontSize: 20,
              bold: true,
              alignment: "center",
              listType: "none"
            },
            {
              text: `รายงานยอดขายประจำเดือน ${this.formatDate(this.daytime)}`,
              fontSize: 16,
              bold: true,
              alignment: "center",
              listType: "none"
            },
            {
              text: `แยกตามประเภทสินค้า`,
              fontSize: 16,
              bold: true,
              alignment: "center",
              listType: "none"
            },
            {
              text: `ยอดขายประจำเดือน ${this.formatDate(
                this.daytime
              )}  จำนวน : ${this.count} รายการ  รวมยอด : ฿ ${this.formatPrice(
                this.total
              )} บาท`,
              fontSize: 16,

              alignment: "center",
              listType: "none"
            }
          ]
        },
        pageMargins: [40, 100, 40, 60],
        content: [
          {
            text: `อาหาร`,
            fontSize: 16,
            bold: true,
            alignment: "start",
            listType: "none"
          },
          {
            layout: "lightHorizontalLines", // optional
            table: {
              fontSize: 18,
              headerRows: 1,
              widths: [30, "*", 80, 80, 80],

              body: [["ลำดับ", "รายการ", "จำนวน", "ต่อหน่วย", "รวม"], ...res]
            }
          },
          {
            text: `เครื่องดื่ม`,
            fontSize: 16,
            bold: true,
            alignment: "start",
            listType: "none"
          },
          {
            layout: "lightHorizontalLines", // optional
            table: {
              fontSize: 18,
              headerRows: 1,
              widths: [30, "*", 80, 80, 80],

              body: [["ลำดับ", "รายการ", "จำนวน", "ต่อหน่วย", "รวม"], ...res]
            }
          }
        ],
        footer: function(currentPage, pageCount) {
          return {
            text: "หน้า " + currentPage.toString() + " จาก " + pageCount,
            alignment: "center"
          };
        },

        defaultStyle: {
          font: "THSarabunNew"
        }
      };
      pdfMake.createPdf(documentDefinitions).open();
      //   pdfMake
      //     .createPdf(documentDefinitions)
      //     .download(`รายงาน:${this.formatDate(this.daytime)}.pdf`);
    }
  },
  created() {}
};
</script>
