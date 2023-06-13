const multer = require("multer");
const path = require("path");

const uploadFile = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: "./upload/imagenesVideos",

    filename: function (req, res, cb) {
      //poner nombres diferentes a cada imagen
      cb(null, Date.now() + path.extname(res.originalname));
    },
  });
  const upload = multer({
    storage: storage
  }).fields([
    { name: 'imagen', maxCount: 10 },
    { name: 'video', maxCount: 2 }
  ]);
  return upload;
};

module.exports = {uploadFile};
