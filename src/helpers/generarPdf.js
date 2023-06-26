const pdf = require("html-pdf");

const generarPDF = async (html) => {
  return new Promise((resolve, reject) => {
    const options = {
      format: "A4",
      border: {
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    };

    pdf.create(html, options).toBuffer((err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer);
      }
    });
  });
};

  module.exports= generarPDF