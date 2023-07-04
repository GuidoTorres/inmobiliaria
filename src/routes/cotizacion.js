const router = require("express").Router();
const cotizacion = require("../controllers/cotizacion");
const { checkAuth, checkRoleAuth } = require("../controllers/auth");

router.get("/",checkAuth, cotizacion.get);
router.get("/descargar/:id",checkAuth, cotizacion.descargarCotizacion);
router.get("/correo/:id",checkAuth, cotizacion.cotizacionPorCorreo);
router.post("/",checkAuth, cotizacion.post);
router.put("/:id",checkAuth, cotizacion.update);
router.delete("/:id",checkAuth, cotizacion.delte);
module.exports = router;