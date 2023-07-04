const router = require("express").Router();
const propietario = require("../controllers/propietario");
const { checkAuth, checkRoleAuth } = require("../controllers/auth");
const multerTitulo = require("../middlewares/multerTituloPropiedad")

router.get("/",checkAuth,  propietario.get);
router.get("/descargar",checkAuth,  propietario.descargarPropietarios);
router.post("/",checkAuth, multerTitulo(),  propietario.post);
router.put("/:id",checkAuth,  multerTitulo(), propietario.update);
router.delete("/:id",checkAuth, propietario.delte);

module.exports = router;
