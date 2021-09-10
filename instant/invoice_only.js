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

export const printInvoiceOnly = (pay, show, setting) => {
  var WinPrint = window.open(
    "",
    "",
    "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
  );

  WinPrint.document.write("<table>");

  WinPrint.document.write(
    `<tr><th>${setting.head_title}</th><th style='padding-left:60px'><img width='70px' height='70px' src='${show}'></th></tr>`
  );
  WinPrint.document.write("</table>");
  WinPrint.document.write("<table style='width: 100%;font-size: 0.4em;'>");
  WinPrint.document.write(
    `<tr><th align='left'>${setting.restaurant}</th></tr>`
  );
  WinPrint.document.write(
    `<tr><th align='left'>ที่อยู่ : ${setting.address}</th></tr>`
  );

  WinPrint.document.write(
    `<tr><th align='left'>เบอร์มือถือ : ${setting.tel}</th></tr>`
  );
  WinPrint.document.write(
    `<tr><th align='left'>พนักงานรับเงิน : ${pay.ref_emp_id.fname} ${pay.ref_emp_id.fname}</th></tr>`
  );
  if (pay.ref_cus_id.fname !== "guest") {
    WinPrint.document.write(
      `<tr><th align='left'>ลูกค้า : คุณ ${pay.ref_cus_id.fname} ${pay.ref_cus_id.lname}</th></tr>`
    );
  }
  WinPrint.document.write(
    `<tr><th align='center'  >ใบเสร็จรับเงินเลขที่ : ${pay.invoice}</th></tr>`
  );
  WinPrint.document.write(
    `<tr><th align='center'>วันที่ ${formatDate(pay.datetime)}</th></tr>`
  );
  WinPrint.document.write("</table>");
  //WinPrint.document.write("<img src='" + __dirname + "25.png'>");
  WinPrint.document.write("<table   style='width: 100%;font-size: 0.5em;'>");
  WinPrint.document.write(
    "<tr ><th style='border-bottom: thin dotted;border-top: thin dotted' width=18% >ลำดับที่</th><th style='border-bottom: thin dotted;border-top: thin dotted' width='1000px' style='padding-right:60px'>รายการ</th><th style='border-bottom: thin dotted;border-top: thin dotted' width='100px' style='padding-right:30px'>จำนวน</th><th style='border-bottom: thin dotted;border-top: thin dotted' colspan='2' width='100px'>ราคา</th></tr>"
  );
  pay.ref_order_id.list_product.map((l, i) => {
    WinPrint.document.write("<tr style='border-bottom: thin solid'>");
    WinPrint.document.write(
      `<td style='padding-left:20px;'>${parseInt(i) + 1}</td><td >${
        l.discount ? "" : "**"
      }${l.name} ${l.normal_price} บาท</td><td style='padding-left:20px;'>${
        l.qty
      }</td><td style='padding-left:20px;'>${formatPrice(
        l.price
      )} </td><td style='padding-right:20px;'>฿</td>`
    );
    WinPrint.document.write("</tr>");
    for (let j in l.topping) {
      WinPrint.document.write(
        `<tr><td></td><td > - ${l.topping[j].name}${
          l.topping[j].price !== 0 ? "เพิ่ม " + l.topping[j].price + " บาท" : ""
        }</td></td></tr>`
      );
    }
  });
  //   for (let i in pay.ref_order_id.list_product) {

  //   }
  WinPrint.document.write(
    "<tr><td style='border-bottom: thin dotted'></td><td style='border-bottom: thin dotted'></td><td style='border-bottom: thin dotted'></td><td style='border-bottom: thin dotted'></td><td style='border-bottom: thin dotted'></td></tr>"
  );
  WinPrint.document.write("</table>");
  WinPrint.document.write("<table  style='margin-top:20px;font-size: 0.6em;'>");
  WinPrint.document.write(
    `<tr><th width='1000px' align=left style='padding-right:60px;'>รวมเงิน</th><th width='100px'>${formatPrice(
      pay.total_price
    )} </th><th>บาท</th></tr>`
  );
  if (pay.discount_price > 0) {
    WinPrint.document.write(
      `<tr><th width='1000px' align=left style='padding-right:60px;'>ส่วนลด</th><th width='100px'>${formatPrice(
        pay.discount_price
      )}</th><th>บาท</th></tr>`
    );
  }
  if (pay.vat_price > 0) {
    WinPrint.document.write(
      `<tr><th width='1000px' align=left style='padding-right:60px;'>ภาษี</th><th width='100px'>${formatPrice(
        pay.vat_price
      )}</th><th>บาท</th></tr>`
    );
  }
  WinPrint.document.write(
    `<tr><th width='1000px' align=left style='padding-right:60px'>ยอดสุทธิ</th><th width='100px'>${formatPrice(
      pay.net_price
    )} </th><th>บาท</th></tr>`
  );
  WinPrint.document.write(
    `<tr><th width='1000px' align=left style='padding-right:60px'>เงินสด</th><th width='100px'>${formatPrice(
      pay.receive_money
    )} </th><th>บาท</th></tr>`
  );
  WinPrint.document.write(
    `<tr><th width='1000px' align=left style='padding-right:60px'>เงินทอน</th><th width='100px'>${formatPrice(
      pay.withdraw_money
    )} </th><th>บาท</th></tr>`
  );

  WinPrint.document.write(
    `<tr><th  align=center style='padding-left:60px' >**ขอบคุณที่ใช้บริการ**</th></tr>
    <tr ><th align=start colspan=2>หมายเหตุ ** สินค้าไม่สามารถใช้กับส่วนลดได้</th><th></th></tr>
        `
  );
  WinPrint.document.write("</table>");

  WinPrint.document.close();
  WinPrint.focus();
  // var ua = navigator.userAgent.toLowerCase();
  // var isAndroid = ua.indexOf("android") > -1;
  setTimeout(() => {
    WinPrint.print();
    //WinPrint.close();
  }, 500);
};
