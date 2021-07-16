<template>
  <div>
    <p>Not printed.</p>

    <v-row id="print">
      <div class="d-flex flex-row  ma-1 mx-16" v-for="i in 12" :key="i">
        <h3>ทดสอบ</h3>

        <h3>ทดสอบ</h3>

        <h3>ทดสอบ ฿.</h3>
      </div>
    </v-row>

    <button @click="print">done</button>
  </div>
</template>
<script>
export default {
  data: () => ({
    items: [1, 2, 3, 4, 5, 2, 5]
  }),
  methods: {
    print() {
      //var prtContent = document.getElementById("print");
      var WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
      );
      WinPrint.document.write("<h3>SHIFT restaurant</h3>");
      WinPrint.document.write(
        "<table border=0 style='width: 100%;font-size: 0.5em;'>"
      );
      WinPrint.document.write(
        "<tr><th width='1000px' style='padding-right:60px'>รายการ</th><th width='100px' style='padding-right:30px'>จำนวน</th><th width='100px'>ราคา</th></tr>"
      );

      for (let i in this.items) {
        WinPrint.document.write("<tr>");
        WinPrint.document.write(
          `<td>ข้าวผัดกระเพราไข่เยี่ยวม้า</td><td style='padding-left:20px'>${i}</td><td>320 ฿</td>`
        );
        WinPrint.document.write("</tr>");
      }

      WinPrint.document.write("</table>");
      WinPrint.document.write(
        "<table style='margin-top:20px;font-size: 0.6em;'>"
      );
      WinPrint.document.write(
        "<tr><th width='1000px' style='padding-right:60px'>อาหารเครื่องดื่ม</th><th width='100px'>350.00</th></tr>"
      );
      WinPrint.document.write(
        "<tr><th width='1000px' style='padding-right:60px'>ยอดรวมสุทธิ</th><th width='100px'>350.00</th></tr>"
      );
      WinPrint.document.write(
        "<tr><th width='1000px' style='padding-right:60px'>เงินสดรับมา</th><th width='100px'>350.00</th></tr>"
      );
      WinPrint.document.write(
        "<tr><th width='1000px' style='padding-right:60px'>เงินทอน</th><th width='100px'>350.00</th></tr>"
      );
      WinPrint.document.write("</table>");

      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    }
  }
};
</script>
