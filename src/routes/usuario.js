const router = require("express").Router();
const { checkAuth, checkRoleAuth } = require("../controllers/auth");
const usuario = require("../controllers/usuario");

// router.get("/",checkAuth, checkRoleAuth([1,2]), usuario.get);
// router.post("/",checkAuth, checkRoleAuth([1,2]), usuario.post);
// router.put("/:id",checkAuth, checkRoleAuth([1,2]), usuario.update);
// router.delete("/:id",checkAuth, checkRoleAuth([1,2]), usuario.delte);

router.get("/",checkAuth,  usuario.get);
router.get("/recuperar/codigo/:id", usuario.compararCodRecuperacion);
router.post("/",checkAuth,  usuario.post);
router.post("/recuperar", usuario.codigoRecuperacion);
router.post("/cambiar/contrasenia",checkAuth,  usuario.actualizarPassword);
router.put("/:id",checkAuth, usuario.update);
router.delete("/:id",checkAuth,  usuario.delte);

module.exports = router;