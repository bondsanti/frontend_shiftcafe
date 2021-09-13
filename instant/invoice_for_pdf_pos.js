import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "@/components/manage/settings/vfs_fonts";
import moment from "moment";

const formatPrice = total_price => {
  const value = parseInt(total_price);
  let val = (value / 1).toFixed(2).replace(",", ".");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatPrice2 = total_price => {
  const value = parseInt(total_price);
  let val = (value / 1).toFixed(0).replace(",", ".");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatDate = date => {
  moment().format("LLLL");
  let strdate = moment(date).add(543, "years");
  return moment(strdate).format("D MMMM YYYY H:mm");
};

const checkIsMember = pay => {
  let data = {
    column: null,
    table: []
  };
  if (pay.ref_cus_id.fname !== "guest" && pay.ref_cus_id.lname !== "guest") {
    data.column = {
      columns: [
        {
          text: "ลูกค้า : ",
          bold: true,
          width: 48,
          fontSize: 10,
          alignment: "left"
        },
        {
          text: pay.ref_cus_id.fname + " " + pay.ref_cus_id.lname,
          width: "*",
          bold: true,
          fontSize: 10,
          alignment: "left"
        }
      ]
    };
    data.table = [
      [
        {
          text: "แต้มคงเหลือล่าสุด",
          border: [false, false, false, false],
          fontSize: 14,
          bold: true,
          alignment: "left"
        },
        {
          text: formatPrice2(pay.ref_cus_id.point) + " แต้ม",
          border: [false, false, false, false],
          fontSize: 14,
          bold: true,
          alignment: "right"
        }
      ],
      [
        {
          text: "แต้มที่ได้รับ",
          bold: true,
          fontSize: 14,
          border: [false, false, false, true],
          margin: [0, 0, 0, 0]
        },
        {
          text: formatPrice2(pay.ref_point_pay_id.point) + " แต้ม",
          bold: true,
          fontSize: 14,
          border: [false, false, false, true],
          margin: [0, 0, 0, 0],
          alignment: "right"
        }
      ]
    ];
  }
  return data;
};

export const printInvoicePdfPos = (pay, show, setting) => {
  const dataForTable = [];
  pay.ref_order_id.list_product.map((o, i) => {
    const nameList = `${o.discount ? "" : "**"} ${
      o.topping.length === 0 ? o.name : o.name + " " + o.normal_price + " บาท\n"
    }${o.topping.map(t =>
      t.price !== 0 ? t.name + " " + t.price + " ฿" : t.name
    )}`;
    dataForTable.push([
      {
        text: i + 1,
        border: [false, false, false, false],
        margin: [0, 2, 0, 2],
        alignment: "left",
        bold: true
      },
      {
        text: nameList,
        border: [false, false, false, false],
        margin: [0, 2, 0, 2],
        alignment: "left",
        bold: true
      },
      {
        text: o.qty,
        border: [false, false, false, false],
        margin: [0, 2, 0, 2],
        alignment: "left",
        bold: true
      },
      {
        border: [false, false, false, false],
        text: formatPrice(o.price) + " ฿",
        bold: true,
        alignment: "right",
        margin: [0, 2, 0, 2]
      }
    ]);
  });

  const discount = () => {
    const obj = {
      columns: [
        {
          text: "ส่วนลด",
          width: "*",
          fontSize: 14,
          bold: true,
          alignment: "left"
        },
        {
          text: formatPrice(pay.discount_price) + " บาท",
          width: "*",
          fontSize: 14,
          bold: true,
          alignment: "right"
        }
      ]
    };
    if (pay.discount_price !== 0) {
      return obj;
    }
  };

  const vat = () => {
    const obj = {
      columns: [
        {
          text: "ภาษี",
          width: "*",
          fontSize: 14,
          bold: true,
          alignment: "left"
        },
        {
          text: formatPrice(pay.vat_price) + " บาท",
          width: "*",
          fontSize: 14,
          bold: true,
          alignment: "right"
        }
      ]
    };
    if (pay.vat_price !== 0) {
      return obj;
    }
  };

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
    pageSize: {
      width: 320,
      height: "auto"
    },

    content: [
      {
        columns: [
          {
            text: setting.restaurant,

            width: "*",
            fontSize: 14,
            bold: true,
            alignment: "left",
            margin: [0, 10, 0, 0]
          },
          {
            image: show,
            width: 30,
            margin: [0, 0, 0, 10]
          }
        ]
      },
      {
        columns: [
          {
            text: "ที่อยู่ :",
            width: 48,
            bold: true,
            fontSize: 10,
            alignment: "left"
          },
          {
            text: setting.address,
            width: "*",
            bold: true,
            fontSize: 10,
            alignment: "left"
          }
        ]
      },
      {
        columns: [
          {
            text: "เบอร์มือถือ :",
            width: 48,
            bold: true,
            fontSize: 10,
            alignment: "left"
          },
          {
            text: setting.tel,
            width: "*",
            bold: true,
            fontSize: 10,
            alignment: "left"
          }
        ]
      },
      {
        columns: [
          {
            text: "พนักงานรับเงิน :",
            bold: true,
            width: 48,
            fontSize: 10,
            alignment: "left"
          },
          {
            text: pay.ref_emp_id.fname + " " + pay.ref_emp_id.lname,
            width: "*",
            bold: true,
            fontSize: 10,
            alignment: "left"
          }
        ]
      },

      checkIsMember(pay).column,
      {
        text: "ใบเสร็จรับเงินเลขที่ : " + pay.invoice,
        bold: true,
        fontSize: 10,
        alignment: "center"
      },
      {
        text: "วันที่ " + formatDate(pay.datetime),
        bold: true,
        fontSize: 10,
        alignment: "center"
      },
      {
        table: {
          headerRows: 1,
          widths: [20, "*", 25, "*"],
          body: [
            [
              {
                text: "ลำดับ",
                bold: true,
                border: [false, true, false, true],
                margin: [0, 5, 0, 5]
              },
              {
                text: "รายการ",
                bold: true,
                border: [false, true, false, true],
                margin: [0, 5, 0, 5]
              },
              {
                text: "จำนวน",
                bold: true,
                border: [false, true, false, true],
                margin: [0, 5, 0, 5]
              },
              {
                text: "ราคา",
                border: [false, true, false, true],
                alignment: "right",
                bold: true,
                margin: [0, 5, 0, 5]
              }
            ],
            ...dataForTable,
            [
              {
                text: "",
                border: [false, true, false, false],

                alignment: "left"
              },
              {
                text: "",
                border: [false, true, false, false],

                alignment: "left"
              },
              {
                text: "",
                border: [false, true, false, false],

                alignment: "left"
              },
              {
                border: [false, true, false, false],
                text: "",
                alignment: "right"
              }
            ]
          ]
        }
      },

      discount(),
      vat(),

      {
        table: {
          headerRows: 1,
          widths: ["*", "*"],
          body: [
            [
              {
                text: "อาหารเครื่องดื่ม",
                border: [false, false, false, false],
                fontSize: 14,
                bold: true,
                alignment: "left"
              },
              {
                text: formatPrice(pay.total_price) + " บาท",
                border: [false, false, false, false],
                fontSize: 14,
                bold: true,
                alignment: "right"
              }
            ],
            [
              {
                text: "ราคาสุทธิ",
                bold: true,
                fontSize: 16,
                border: [false, false, false, true],
                margin: [0, 5, 0, 5]
              },
              {
                text: formatPrice(pay.net_price) + " บาท",
                bold: true,
                fontSize: 16,
                border: [false, false, false, true],
                margin: [0, 5, 0, 5],
                alignment: "right"
              }
            ],
            ...checkIsMember(pay).table
            // [
            //   {
            //     text: "แต้มคงเหลือล่าสุด",
            //     border: [false, false, false, false],
            //     fontSize: 14,
            //     bold: true,
            //     alignment: "left"
            //   },
            //   {
            //     text: formatPrice2(pay.ref_cus_id.point) + " แต้ม",
            //     border: [false, false, false, false],
            //     fontSize: 14,
            //     bold: true,
            //     alignment: "right"
            //   }
            // ],
            // [
            //   {
            //     text: "แต้มที่ได้รับ",
            //     bold: true,
            //     fontSize: 14,
            //     border: [false, false, false, true],
            //     margin: [0, 0, 0, 0]
            //   },
            //   {
            //     text: formatPrice2(pay.ref_point_pay_id.point) + " แต้ม",
            //     bold: true,
            //     fontSize: 14,
            //     border: [false, false, false, true],
            //     margin: [0, 0, 0, 0],
            //     alignment: "right"
            //   }
            // ]
          ]
        }
      },
      {
        text: "ขอบคุณที่ใช้บริการครับ/ค่ะ",
        bold: true,
        fontSize: 14,
        alignment: "center",
        margin: [0, 10, 0, 0]
      },
      {
        text: "หมายเหตุ ** สินค้าไม่สามารถใช้กับส่วนลดได้",
        bold: true,
        fontSize: 10,
        alignment: "left",
        margin: [0, 5, 0, 0]
      }
    ],
    styles: {
      notesTitle: {
        fontSize: 10,
        bold: true
      },
      notesText: {
        fontSize: 10
      }
    },
    defaultStyle: {
      columnGap: 5,
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
