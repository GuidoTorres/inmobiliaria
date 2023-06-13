const router = require("express").Router();
const propiedad = require("../controllers/propiedad");
const { checkAuth, checkRoleAuth } = require("../controllers/auth");
const multer = require("../middlewares/multer")

router.get("/",  propiedad.get);
router.post("/", multer.uploadFile(), propiedad.post);
router.put("/:id", multer.uploadFile(), propiedad.update);
router.delete("/:id", propiedad.delte);

module.exports = router;
