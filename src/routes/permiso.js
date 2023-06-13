const router = require("express").Router();
const permiso = require("../controllers/permiso");

router.get("/", permiso.get);
router.post("/", permiso.post);
router.put("/:id", permiso.update);
router.delete("/:id", permiso.delte);

module.exports = router;
