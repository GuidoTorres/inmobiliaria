const router = require("express").Router();
const { checkAuth, checkRoleAuth } = require("../controllers/auth");
const usuario = require("../controllers/usuario");

// router.get("/",checkAuth, checkRoleAuth([1,2]), usuario.get);
// router.post("/",checkAuth, checkRoleAuth([1,2]), usuario.post);
// router.put("/:id",checkAuth, checkRoleAuth([1,2]), usuario.update);
// router.delete("/:id",checkAuth, checkRoleAuth([1,2]), usuario.delte);

router.get("/", usuario.get);
router.get("/recuperar/codigo/:id", usuario.compararCodRecuperacion);
router.post("/", usuario.post);
router.post("/recuperar", usuario.codigoRecuperacion);
router.post("/cambiar/contrasenia", usuario.actualizarPassword);
router.put("/:id", usuario.update);
router.delete("/:id", usuario.delte);

module.exports = router;