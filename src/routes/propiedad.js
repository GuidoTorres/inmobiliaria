const router = require("express").Router();
const propiedad = require("../controllers/propiedad");
const { checkAuth, checkRoleAuth } = require("../controllers/auth");
const multer = require("../middlewares/multer")

router.get("/",checkAuth,  propiedad.get);
router.get("/descargar/:id",checkAuth,  propiedad.descargarPropiedad);
router.get("/cliente",  propiedad.getPropiedadCliente);
router.get("/usuario/:id",checkAuth,  propiedad.getPropiedadByUser);
router.get("/cliente/:id",checkAuth,  propiedad.getPropiedadClienteById);
router.get("/habilitado/:id",checkAuth, propiedad.updateHabilitado);
router.post("/",checkAuth, multer.uploadFile(), propiedad.post);
router.put("/:id",checkAuth, multer.uploadFile(), propiedad.update);
router.put("/estado/:id",checkAuth, propiedad.updateEstado);
router.delete("/:id",checkAuth, propiedad.delte);

module.exports = router;
