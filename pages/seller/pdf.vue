<template>
  <v-btn @click="generatePDF">generate pdf</v-btn>
</template>
<script>
import jsPDF from "jspdf";
import pdfMake from "pdfmake";
export default {
  data() {
    return {
      heading: "ร้านอาหาร"
    };
  },
  methods: {
    generatePDF() {
      const columns = [
        { title: "Title", dataKey: "title" },
        { title: "Body", dataKey: "body" }
      ];
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "letter"
      });
      // text is placed using x, y coordinates
      doc.addFont("supermarket.ttf", "supermarket", "normal");

      doc.setFont("supermarket");
      doc.text(15, 15, "สวัสดี ยินดีที่ได้รู้จักคุณ");
      // create a line under heading
      doc
        .setLineWidth(0.01)
        .line(0.5, 1.1, 8.0, 1.1)

        .save(`${this.heading}.pdf`);
    },
    export2() {
      const docDefinition = {
        content: ["English", "ไทย"]
      };
      pdfMake.fonts = {
        // download default Roboto font from cdnjs.com
        Roboto: {
          normal:
            "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
          bold:
            "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
          italics:
            "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
          bolditalics:
            "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf"
        }
      };
      pdfMake.createPdf(docDefinition).open({}, window);
    }
  }
};
</script>
