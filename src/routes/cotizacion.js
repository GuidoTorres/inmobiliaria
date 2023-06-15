const router = require("express").Router();
const cotizacion = require("../controllers/cotizacion");
const { checkAuth, checkRoleAuth } = require("../controllers/auth");

router.get("/", cotizacion.get);
router.post("/", cotizacion.post);
router.put("/:id", cotizacion.update);
router.delete("/:id", cotizacion.delte);
module.exports = router;