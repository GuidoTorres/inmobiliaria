const puppeteer = require("puppeteer");

const generarPDF = async (html) => {
    try {
      const browser = await puppeteer.launch({ headless: "new" });
      const page = await browser.newPage();
  
      await page.setContent(html, { waitUntil: "networkidle0" });
  
      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
      });
  
      await browser.close();
      return pdf;
    } catch (error) {
      console.error(error);
    }
  };

  module.exports= generarPDF