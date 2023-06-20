const router = require("express").Router();
const reporte = require("../controllers/registroInicioSesion");
const ofertas = require("../controllers/reporteOfertas");


router.get("/", reporte.get);
router.get("/ofertas", ofertas.get);

// router.post("/", rol.post);
// router.post("/:id", rol.postRolPermisos);
// router.put("/:id", rol.update);
// router.put("/permiso/:id", rol.updateRolPermisos);
// router.delete("/:id", rol.delte);

module.exports = router;
