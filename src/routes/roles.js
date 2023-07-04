const router = require("express").Router();
const { checkAuth, checkRoleAuth } = require("../controllers/auth");
const rol = require("../controllers/roles");

router.get("/", checkAuth, rol.get);
router.get("/:id",checkAuth, rol.getById);
router.post("/",checkAuth, rol.post);
router.post("/:id",checkAuth, rol.postRolPermisos);
router.put("/:id",checkAuth, rol.update);
router.put("/permiso/:id",checkAuth, rol.updateRolPermisos);
router.delete("/:id",checkAuth, rol.delte);

module.exports = router;
