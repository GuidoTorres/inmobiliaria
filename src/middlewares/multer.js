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
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // Límite de tamaño de archivo en bytes (10 MB en este caso)
    },
    fileFilter: (req, file, cb) => {
      if (file.size > 5 * 1024 * 1024) {
        // Si el archivo excede el límite de tamaño
        cb(new Error("El tamaño de la imagen excede el límite permitido."));
      } else {
        cb(null, true);
      }
    },

  }).fields([
    { name: 'imagen', maxCount: 10 }  ]);
  return upload;
};

module.exports = {uploadFile};
