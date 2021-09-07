import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "@/instant/vfs_fonts";
import moment from "moment";

const formatPrice = total_price => {
  const value = parseInt(total_price);
  let val = (value / 1).toFixed(2).replace(",", ".");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatDate = date => {
  moment().format("LLLL");
  let strdate = moment(date).add(543, "years");
  return moment(strdate).format("D MMMM YYYY H:mm");
};

export const printInvoicePdf = (pay, show, setting) => {
  const { pname, fname, lname, tel, address } = pay.ref_cus_id;
  const clientName = () => {
    if (fname !== "guest" || lname !== "guest") {
      return pname + " " + fname + " " + lname;
    } else {
      return "-";
    }
  };
  const clientTel = fname !== "guest" || lname !== "guest" ? tel : "-";
  const clientAddress = fname !== "guest" || lname !== "guest" ? address : "-";

  //console.log(this.itemBy);

  const dataForTable = [];
  pay.ref_order_id.list_product.map((o, i) => {
    const nameList = `${o.discount ? "" : "**"} ${
      o.topping.length === 0 ? o.name : o.name + " " + o.normal_price + " บาท\n"
    }${o.topping.map(t =>
      t.price !== 0 ? t.name + " " + t.price + " บาท" : t.name
    )}`;
    dataForTable.push([
      {
        text: i + 1,
        border: [false, false, false, true],
        margin: [0, 2, 0, 2],
        alignment: "left"
      },
      {
        text: nameList,
        border: [false, false, false, true],
        margin: [0, 2, 0, 2],
        alignment: "left"
      },
      {
        text: o.qty,
        border: [false, false, false, true],
        margin: [0, 2, 0, 2],
        alignment: "left"
      },
      {
        border: [false, false, false, true],
        text: formatPrice(o.price) + " บาท",
        fillColor: "#f5f5f5",
        alignment: "right",
        margin: [0, 2, 0, 2]
      }
    ]);
  });

  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  pdfMake.fonts = {
    THSarabunNew: {
      normal: "THSarabunNew.ttf",
      bold: "THSarabunNew-Bold.ttf",
      italics: "THSarabunNew-Italic.ttf",
      bolditalics: "THSarabunNew-BoldItalic.ttf"
    }
  };
  const documentDefinitions = {
    info: {
      title: "ใบเสร็จรับเงินเลขที่ " + pay.invoice,
      author: setting.restaurant
    },
    content: [
      {
        columns: [
          {
            image: show,
            width: 100
          },
          [
            {
              text: "ใบเสร็จรับเงิน",
              color: "#333333",
              width: "*",
              fontSize: 28,
              bold: true,
              alignment: "right",
              margin: [0, 0, 0, 1]
            },
            {
              stack: [
                {
                  columns: [
                    {
                      text: "เลขที่คำสั่งซื้อ",
                      color: "#aaaaab",
                      bold: true,
                      width: "*",
                      fontSize: 12,
                      alignment: "right"
                    },
                    {
                      text: pay.ref_order_id.order_no,
                      bold: true,
                      color: "#333333",
                      fontSize: 12,
                      alignment: "right",
                      width: 100
                    }
                  ]
                },
                {
                  columns: [
                    {
                      text: "วันที่สั่งซื้อ",
                      color: "#aaaaab",
                      bold: true,
                      width: "*",
                      fontSize: 12,
                      alignment: "right"
                    },
                    {
                      text: formatDate(pay.ref_order_id.datetime),
                      bold: true,
                      color: "#333333",
                      fontSize: 12,
                      alignment: "right",
                      width: 100
                    }
                  ]
                },
                {
                  columns: [
                    {
                      text: "สถานะ",
                      color: "#aaaaab",
                      bold: true,
                      fontSize: 12,
                      alignment: "right",
                      width: "*"
                    },
                    {
                      text: `จ่ายเงินแล้ว\n( ${
                        pay.type_payment === "cash" ? "เงินสด" : "โอนผ่านธนาคาร"
                      } )`,
                      bold: true,
                      fontSize: 14,
                      alignment: "right",
                      color: "green",
                      width: 100
                    }
                  ]
                }
              ]
            }
          ]
        ]
      },
      {
        columns: [
          {
            text: "จาก",
            color: "#aaaaab",
            bold: true,
            fontSize: 14,
            alignment: "left",
            margin: [0, 20, 0, 5]
          },
          {
            text: "ถึง",
            color: "#aaaaab",
            bold: true,
            fontSize: 14,
            alignment: "left",
            margin: [0, 20, 0, 5]
          }
        ]
      },
      {
        columns: [
          {
            text: setting.restaurant,
            bold: true,
            color: "#333333",
            alignment: "left"
          },
          {
            text: clientName(),
            bold: true,
            color: "#333333",
            alignment: "left"
          }
        ]
      },
      {
        columns: [
          {
            text: "หมายเลขโทรศัพท์",
            color: "#aaaaab",
            bold: true,
            margin: [0, 7, 0, 3]
          },

          {
            text: "หมายเลขโทรศัพท์",
            color: "#aaaaab",
            bold: true,
            margin: [0, 7, 0, 3]
          }
        ]
      },
      {
        columns: [
          {
            text: setting.tel,
            style: "invoiceBillingAddress"
          },
          {
            text: clientTel,
            style: "invoiceBillingAddress"
          }
        ]
      },
      {
        columns: [
          {
            text: "ที่อยู่",
            color: "#aaaaab",
            bold: true,
            margin: [0, 7, 0, 3]
          },

          {
            text: "ที่อยู่",
            color: "#aaaaab",
            bold: true,
            margin: [0, 7, 0, 3]
          }
        ]
      },
      {
        columns: [
          {
            text: setting.address + " \n   ประเทศไทย",
            style: "invoiceBillingAddress"
          },
          {
            text: clientAddress,
            style: "invoiceBillingAddress"
          }
        ]
      },
      "\n\n",
      {
        width: "100%",
        alignment: "center",
        text: `ใบเสร็จรับเงินเลขที่ ${pay.invoice}`,
        bold: true,
        margin: [0, 10, 0, 10],
        fontSize: 15
      },
      {
        layout: {
          defaultBorder: false,
          hLineWidth: function(i, node) {
            return 1;
          },
          vLineWidth: function(i, node) {
            return 1;
          },
          hLineColor: function(i, node) {
            if (i === 1 || i === 0) {
              return "#bfdde8";
            }
            return "#eaeaea";
          },
          vLineColor: function(i, node) {
            return "#eaeaea";
          },
          hLineStyle: function(i, node) {
            // if (i === 0 || i === node.table.body.length) {
            return null;
            //}
          },
          // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
          paddingLeft: function(i, node) {
            return 10;
          },
          paddingRight: function(i, node) {
            return 10;
          },
          paddingTop: function(i, node) {
            return 2;
          },
          paddingBottom: function(i, node) {
            return 2;
          },
          fillColor: function(rowIndex, node, columnIndex) {
            return "#fff";
          }
        },
        table: {
          headerRows: 1,
          widths: [80, "*", 80, 80],
          body: [
            [
              {
                text: "ลำดับที่",
                fillColor: "#eaf2f5",
                border: [false, true, false, true],
                margin: [0, 5, 0, 5]
              },
              {
                text: "รายการ",
                fillColor: "#eaf2f5",
                border: [false, true, false, true],
                margin: [0, 5, 0, 5]
              },
              {
                text: "จำนวน",
                fillColor: "#eaf2f5",
                border: [false, true, false, true],
                margin: [0, 5, 0, 5]
              },
              {
                text: "ราคา",
                border: [false, true, false, true],
                alignment: "right",
                fillColor: "#eaf2f5",
                margin: [0, 5, 0, 5]
              }
            ],
            ...dataForTable
          ]
        }
      },
      "\n",

      {
        layout: {
          defaultBorder: false,
          hLineWidth: function(i, node) {
            return 1;
          },
          vLineWidth: function(i, node) {
            return 1;
          },
          hLineColor: function(i, node) {
            return "#eaeaea";
          },
          vLineColor: function(i, node) {
            return "#eaeaea";
          },
          hLineStyle: function(i, node) {
            // if (i === 0 || i === node.table.body.length) {
            return null;
            //}
          },
          // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
          paddingLeft: function(i, node) {
            return 10;
          },
          paddingRight: function(i, node) {
            return 10;
          },
          paddingTop: function(i, node) {
            return 3;
          },
          paddingBottom: function(i, node) {
            return 1;
          },
          fillColor: function(rowIndex, node, columnIndex) {
            return "#fff";
          }
        },
        table: {
          headerRows: 1,
          widths: ["*", "auto"],
          body: [
            [
              {
                text: "อาหารเครื่องดื่ม",
                border: [false, true, false, true],
                alignment: "right",
                margin: [0, 1, 0, 1]
              },
              {
                border: [false, true, false, true],
                text: formatPrice(pay.total_price) + " บาท",
                alignment: "right",
                fillColor: "#f5f5f5",
                margin: [0, 1, 0, 1]
              }
            ],
            [
              {
                text: "ส่วนลด",
                border: [false, false, false, true],
                alignment: "right",
                margin: [0, 1, 0, 1]
              },
              {
                text: formatPrice(pay.discount_price) + " บาท",
                border: [false, false, false, true],
                fillColor: "#f5f5f5",
                alignment: "right",
                margin: [0, 1, 0, 1]
              }
            ],
            [
              {
                text: "ภาษี",
                border: [false, false, false, true],
                alignment: "right",
                margin: [0, 1, 0, 1]
              },
              {
                text: formatPrice(pay.vat_price) + " บาท",
                border: [false, false, false, true],
                fillColor: "#f5f5f5",
                alignment: "right",
                margin: [0, 1, 0, 1]
              }
            ],
            [
              {
                text: "ยอดรวมสุทธิ",
                bold: true,
                fontSize: 20,
                alignment: "right",
                border: [false, false, false, true],
                margin: [0, 1, 0, 1]
              },
              {
                text: formatPrice(pay.net_price) + " บาท",
                bold: true,
                fontSize: 20,
                alignment: "right",
                border: [false, false, false, true],
                fillColor: "#f5f5f5",
                margin: [0, 1, 0, 1]
              }
            ],
            [
              {
                text: "หมายเหตุ ** สินค้าไม่สามารถใช้กับส่วนลดได้",
                bold: true,
                fontSize: 14,
                alignment: "left",
                border: [false, false, false, false],
                margin: [0, 5, 0, 5]
              },
              {
                text: "",
                bold: true,
                fontSize: 20,
                alignment: "right",
                border: [false, false, false, false],

                margin: [0, 5, 0, 5]
              }
            ]
          ]
        }
      }
    ],
    footer: function(currentPage, pageCount) {
      return {
        text: "หน้า " + currentPage.toString() + " จาก " + pageCount,
        alignment: "center",
        columns: [
          {
            text: "หน้า " + currentPage.toString() + " จาก " + pageCount,
            color: "#aaaaab",
            bold: true,
            fontSize: 14,
            alignment: "left",
            margin: [10, 0, 0, 0]
          },
          {
            text: "Powered by DEV FONG",
            color: "#aaaaab",
            bold: true,
            fontSize: 14,
            alignment: "right",
            margin: [0, 0, 10, 0]
          }
        ]
      };
    },
    styles: {
      notesTitle: {
        fontSize: 10,
        bold: true,
        margin: [0, 50, 0, 3]
      },
      notesText: {
        fontSize: 10
      }
    },
    defaultStyle: {
      columnGap: 20,
      font: "THSarabunNew"
    }
  };
  pdfMake.createPdf(documentDefinitions).open();
  // pdfMake
  //   .createPdf(documentDefinitions)
  //   .download(
  //     this.reportType === "ประจำวัน"
  //       ? "รายงานยอดขายประจำวันที่ " + this.formatDate(this.daytime)
  //       : "รายงานยอดขายประจำเดือน " + this.formatDate2(this.daytime)
  //   );
};
