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

export default (order, products, unit) => {
  let list = order.list_product;
  //ใน list ไม่มี unit เลยต้องหาจากโปรดัก จะได้แยกหมวดหมู่ใหญ่ได้
  const compareFood = id => {
    const res = products.find(p => p._id === id);
    return res;
  };
  list.map(l => {
    l.unit = compareFood(l.ref_pro_id).ref_uid._id;
  });

  const filterByUnit = id => {
    const Arr = list.filter(l => l.unit === id);
    return Arr;
  };
  // console.log(foodArr);
  // console.log(drinkArr);
  var WinPrint = window.open(
    "",
    "",
    "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
  );
  unit.map(u => {
    const resArr = filterByUnit(u._id);
    if (resArr.length !== 0) {
      //for drink **************************************************************************************

      WinPrint.document.write("<table style='width: 100%;font-size: 0.4em;'>");

      WinPrint.document.write(
        `<tr><th align='left'>พนักงานที่รับออเดอร์ : ${order.ref_emp_id.fname} ${order.ref_emp_id.lname}</th></tr>`
      );
      WinPrint.document.write(
        `<tr><th align='left'>ชื่อบิล : ${order.bill_name}</th></tr>`
      );
      WinPrint.document.write(
        `<tr><th align='center'>วันที่ ${formatDate(order.datetime)} </th></tr>`
      );
      WinPrint.document.write(
        `<tr><th align='center'>***สำหรับจัดทำ${u.u_name}***</th></tr>`
      );
      WinPrint.document.write("</table>");
      WinPrint.document.write(
        "<table   style='width: 100%;font-size: 0.5em;margin-bottom:30px;'>"
      );
      WinPrint.document.write(
        "<tr ><th style='border-bottom: thin dotted;border-top: thin dotted' width=18% >ลำดับที่</th><th style='border-bottom: thin dotted;border-top: thin dotted' width='1000px' style='padding-right:60px'>รายการ</th><th style='border-bottom: thin dotted;border-top: thin dotted' width='100px' style='padding-right:30px'>จำนวน</th></tr>"
      );
      //let subTotal = 0;

      resArr.map((r, j) => {
        WinPrint.document.write("<tr style='border-bottom: thin solid'>");
        WinPrint.document.write(
          `<td style='padding-left:20px;'>${parseInt(j) + 1}</td><td >${
            r.name
          }</td><td style='padding-left:20px;'>${r.qty}</td>`
        );
        WinPrint.document.write("</tr>");
        for (let k in r.topping) {
          WinPrint.document.write(
            `<tr><td></td><td > - ${r.topping[k].name} </td></td></tr>`
          );
        }
        if (r.detail.length !== 0) {
          WinPrint.document.write(
            `<tr><td></td><td > ** ${r.detail} **</td></td></tr>`
          );
        }
      });
      WinPrint.document.write("</table><hr style='break-after:page'>");
    }
  });

  WinPrint.document.close();
  WinPrint.focus();
  WinPrint.print();
};
