const router = require("express").Router();
const propiedad = require("../controllers/propiedad");
const { checkAuth, checkRoleAuth } = require("../controllers/auth");
const multer = require("../middlewares/multer")

router.get("/",  propiedad.get);
router.get("/habilitado/:id", propiedad.updateHabilitado);
router.post("/", multer.uploadFile(), propiedad.post);
router.put("/:id", multer.uploadFile(), propiedad.update);
router.put("/estado/:id", propiedad.updateEstado);
router.delete("/:id", propiedad.delte);

module.exports = router;
