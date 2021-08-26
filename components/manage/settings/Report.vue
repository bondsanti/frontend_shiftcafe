<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialogRe"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="$emit('closeRe')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="open">
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-sheet
          elevation="18"
          class="ma-auto pa-5"
          height="296mm"
          width="210mm"
          id="print"
        >
          <v-row class="justify-center align-center">
            <h2>{{ $store.getters["setting"][0].restaurant }}</h2>
          </v-row>
          <v-row class="justify-center align-center">
            <h3>รายงานยอดขายตามชนิดสินค้า</h3>
          </v-row>
          <v-row class="justify-center align-center mt-6">
            <p style="font-size:14px">
              ยอดขายประจำวันที่ {{ formatDate(Date.now()) }} 08:00 -
              {{ formatDate(Date.now()) }} 20:00
            </p>
            <p style="font-size:14px" class="mx-8">จำนวน : {{ count }}</p>
            <p style="font-size:14px">
              รวมยอด : ฿ {{ formatPrice(total) }} บาท
            </p>
          </v-row>
          <v-row class="mx-auto">
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
                  <tr v-for="(item, i) in list" :key="i">
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
  props: ["dialogRe", "payments"],

  data() {
    return {
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          count: "$ 30",
          total: "$30,000"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          count: "$ 30",
          total: "$30,000"
        },
        {
          name: "Eclair",
          calories: 262,
          count: "$ 30",
          total: "$30,000"
        },
        {
          name: "Cupcake",
          calories: 305,
          count: "$ 30",
          total: "$30,000"
        },
        {
          name: "Gingerbread",
          calories: 356,
          count: "$ 30",
          total: "$30,000"
        },
        {
          name: "Jelly bean",
          calories: 375,
          count: "$ 30",
          total: "$30,000"
        },
        {
          name: "Lollipop",
          calories: 392,
          count: "$ 30",
          total: "$30,000"
        },
        {
          name: "Honeycomb",
          calories: 408,
          count: "$ 30",
          total: "$30,000"
        },
        {
          name: "Donut",
          calories: 452,
          count: "$ 30",
          total: "$30,000"
        },
        {
          name: "KitKat",
          calories: 518,
          count: "$ 30",
          total: "$30,000"
        }
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
      return this.$moment(strdate).format("DD MMMM YYYY ");
    },
    test() {
      const res = [];
      this.payments.map(p => {
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
              // setTimeout(this.totalPrice, 300);
              return;
            }
          }
        }
      }
      this.list.push(newObj);

      //setTimeout(this.totalPrice, 300);
    },
    formatPrice(value2) {
      const value = parseInt(value2);
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async open() {
      const res = [];
      //แปลงข้อมูลให้ตรงฟอแมตกับตางรางของพีดีเอฟเมค
      this.list.map((l, i) => {
        res.push([
          i + 1,
          l.topping.length !== 0
            ? l.name + " - " + l.topping.map(t => t.name)
            : l.name,
          l.qty,
          l.price,
          l.total
        ]);
      });

      //เรียง ยอดจำนวนที่ขายจากมากไปน้อย
      const res2 = res.sort((a, b) => b[2] - a[2]);
      //นำผลที่ได้จากการเรียงมาจัดลำดับใหม่
      const res3 = [];
      res2.map((r, i) => {
        res3.push([i + 1, r[1], r[2], r[3], r[4]]);
      });
      console.log(res2);
      //alert(this.$refs.print.$el);
      //createPdfFromHtml(this.$refs.print.$el);
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
        header: {
          text: this.$store.getters["setting"][0].restaurant,
          fontSize: 22,
          alignment: "center",
          bold: true
        },
        content: [
          {
            text: `ยอดขายวันที่ : ${this.formatDate(
              Date.now()
            )} 08:00 น. - ${this.formatDate(Date.now())} 20:00 น.  จำนวน : ${
              this.count
            } รายการ  รวมยอด : ฿ ${this.formatPrice(this.total)} บาท`,
            alignment: "start",
            fontSize: 14

            //bold: true
          },
          // text:{
          //       "  ยอดขายวันที่ : 24 สิงหาคม 2564 08:00 น. - 24 สิงหาคม 2564 20:00 น.",
          //     alignment: "center",
          //     fontSize: 15
          //     }

          {
            layout: "lightHorizontalLines", // optional
            table: {
              fontSize: 18,
              headerRows: 1,
              widths: [30, "*", 80, 80, 80],

              body: [["ลำดับ", "รายการ", "จำนวน", "ต่อหน่วย", "รวม"], ...res3]
            }
          }
        ],
        // styles: {
        //   header: {
        //     fontSize: 22,
        //     bold: true
        //   },
        //   anotherStyle: {
        //     italics: true,
        //     alignment: "right"
        //   }
        // },

        defaultStyle: {
          font: "THSarabunNew"
        }
      };
      pdfMake.createPdf(documentDefinitions).open();
    }
  },
  created() {
    this.test();
    //console.log(this.payments);
  }
};
</script>
