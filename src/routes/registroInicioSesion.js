const router = require("express").Router();
const reporte = require("../controllers/registroInicioSesion");

router.get("/", reporte.get);
// router.post("/", rol.post);
// router.post("/:id", rol.postRolPermisos);
// router.put("/:id", rol.update);
// router.put("/permiso/:id", rol.updateRolPermisos);
// router.delete("/:id", rol.delte);

module.exports = router;
