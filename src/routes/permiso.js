const router = require("express").Router();
const { checkAuth } = require("../controllers/auth");
const permiso = require("../controllers/permiso");

router.get("/",checkAuth, permiso.get);
router.post("/",checkAuth, permiso.post);
router.put("/:id",checkAuth, permiso.update);
router.delete("/:id",checkAuth, permiso.delte);

module.exports = router;
