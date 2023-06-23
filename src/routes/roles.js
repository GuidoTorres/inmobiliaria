const router = require("express").Router();
const rol = require("../controllers/roles");

router.get("/", rol.get);
router.get("/:id", rol.getById);
router.post("/", rol.post);
router.post("/:id", rol.postRolPermisos);
router.put("/:id", rol.update);
router.put("/permiso/:id", rol.updateRolPermisos);
router.delete("/:id", rol.delte);

module.exports = router;
