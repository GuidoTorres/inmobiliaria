const pdfMake = require("pdfmake");
const htmlToPdfMake = require('html-to-pdfmake');

const generarPDF = async (html) => {
  return new Promise((resolve, reject) => {
    try {
      const fonts = {
        Roboto: {
          normal: 'fonts/Roboto-Regular.ttf',
          bold: 'fonts/Roboto-Medium.ttf',
          italics: 'fonts/Roboto-Italic.ttf',
          bolditalics: 'fonts/Roboto-MediumItalic.ttf'
        }
      };

      const pdfContent = htmlToPdfMake(html);
      
      const docDefinition = {
        content: pdfContent
      };

      pdfMake.createPdf(docDefinition).getBuffer((buffer) => {
        resolve(buffer); // buffer es el buffer del PDF
      });
    } catch (error) {
      reject(error);
    }
  });
};




module.exports = generarPDF;
