const pdfMake = require("pdfmake");

const generarPDF = async (html) => {
  return new Promise((resolve, reject) => {
    try {
      
      const fonts={
        Roboto: {
          normal: 'fonts/Roboto-Regular.ttf',
          bold: 'fonts/Roboto-Medium.ttf',
          italics: 'fonts/Roboto-Italic.ttf',
          bolditalics: 'fonts/Roboto-MediumItalic.ttf'
        }
      }
      const printer = new pdfMake(fonts);

      const docDefinition = {
        content: [
          { text: `${html}`, style: "content" }
        ],
        styles: {
          header: { fontSize: 18 },
          content: { fontSize: 12,htmlToText: true  },
        },
        
      };

      const pdfDoc = printer.createPdfKitDocument(docDefinition);
      const chunks = [];

      pdfDoc.on("data", (chunk) => {
        chunks.push(chunk);
      });

      pdfDoc.on("end", () => {
        const buffer = Buffer.concat(chunks);
        resolve(buffer);
      });

      pdfDoc.on("error", (err) => {
        reject(err);
      });

      pdfDoc.end();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = generarPDF;
