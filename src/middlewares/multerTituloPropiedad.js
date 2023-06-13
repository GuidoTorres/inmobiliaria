const multer = require("multer");
const path = require("path");
const uploadFile = () => {
  const storage = multer.diskStorage({
    destination: "./upload/titulosPropiedad",

    filename: function (req, res, cb) {
        //poner nombres diferentes a cada imagen
        cb(null, Date.now() + path.extname(res.originalname));
      },
  });

  const upload = multer({ storage: storage }).single("tituloPropiedad");
  return upload;
};
module.exports = uploadFile;
