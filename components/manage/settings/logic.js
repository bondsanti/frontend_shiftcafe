import html2canvas from "html2canvas";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
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
// 72dpi 時の mm => px 換算比
// 計算式は 1/(25.4mm / 72dpi)
const RATE = 2.83464566929;

// A3 297mm x 419mm
const PAGE_WIDTH = 297 * RATE;
const PAGE_HEIGHT = 419 * RATE;

// TODO: 仮置き。後でページ設計に合わせて修正
const CONTENT_WIDTH = 297 * RATE;
const CONTENT_HEIGHT = 419 * RATE;
const PAGE_MARGINS = [0 * RATE, 0 * RATE];

/* for ts
interface PdfProps {
  dataUrl: string;
  pageSize?: {
    width: number;
    height: number;
  };
  pageOrientation?: string;
  contentSize?: {
    width: number;
    height: number;
  };
  pageMargins?: [number, number];
}
*/

/**
 * HTMLからPDFを生成
 * @param {HTMLElement} element
 */
export async function createPdfFromHtml(element) {
  const pdfProps = await createPdfProps(element);
  createPdf(pdfProps);
}

/**
 * PDF出力用のPdfPropsを作成
 * @param {HTMLElement} element
 * @param {boolean} isOnlyQrCode
 * @returns {Promise<PdfProps>}
 */
async function createPdfProps(element) {
  // html2canvas実行
  const options = {
    // HACK: Scale is a fixed value so that the canvas size does not change depending on the browser. I made it large enough to prevent blurring in IE
    scale: 2
  };
  const canvas = await html2canvas(element, options);

  const dataUrl = canvas.toDataURL();

  const pdfProps = {
    dataUrl,
    pageSize: {
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT
    },
    pageOrientation: "PORTRAIT",
    contentSize: {
      width: CONTENT_WIDTH,
      height: CONTENT_HEIGHT
    },
    pageMargins: PAGE_MARGINS
  };

  return pdfProps;
}

/**
 * Output a PDF with the encoded image URL pasted
 * @param {PdfProps} pdfProps
 */
function createPdf(pdfProps) {
  const { dataUrl, contentSize, pageMargins } = pdfProps;
  // Temporarily any to avoid ts errors
  const pageSize = pdfProps.pageSize;
  const pageOrientation = pdfProps.pageOrientation;
  const documentDefinitions = {
    pageSize,
    pageOrientation,
    content: {
      image: dataUrl,
      ...contentSize
    },
    // content: [
    //   {
    //     text:
    //       "  ยอดขายวันที่ : 24 สิงหาคม 2564 08:00 น. - 24 สิงหาคม 2564 20:00 น.",
    //     fontSize: 15
    //   }

    // ],
    defaultStyle: {
      font: "THSarabunNew"
    },
    pageMargins
  };
  pdfMake.createPdf(documentDefinitions).download();
}
