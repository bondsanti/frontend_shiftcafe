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
            <p style="font-size:14px" class="mx-8">จำนวน : 154</p>
            <p style="font-size:14px">รวมยอด : ฿ 10,895.00 บาท</p>
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
                  <tr v-for="(item, i) in desserts" :key="item.name">
                    <td>{{ i + 1 }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.calories }}</td>
                    <td>{{ item.count }}</td>
                    <td>{{ item.total }}</td>
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
import pdfFonts from "pdfmake/build/vfs_fonts";
export default {
  props: ["dialogRe"],

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
      ]
    };
  },
  methods: {
    formatDate(date) {
      this.$moment().format("LLLL");
      let strdate = this.$moment(date).add(543, "years");
      return this.$moment(strdate).format("DD MMMM YYYY ");
    },
    async open() {
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
            text:
              "  ยอดขายวันที่ : 24 สิงหาคม 2564 08:00 น. - 24 สิงหาคม 2564 20:00 น.",
            alignment: "center",
            fontSize: 15
            //bold: true
          },
          {
            layout: "lightHorizontalLines", // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [100, "*", 100, "*", "*"],

              body: [
                ["ลำดับ", "รายการ", "จำนวน", "ต่อหน่วย", "รวม"],
                ["Value 1", "Value 2", "Value 3", "Value 4", "val5"],
                [
                  { text: "Bold value", bold: true },
                  "Val 2",
                  "Val 3",
                  "Val 4",
                  "val5"
                ]
              ]
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
  }
};
</script>
