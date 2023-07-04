const router = require("express").Router();
const agente = require("../controllers/agente");
const { checkAuth, checkRoleAuth } = require("../controllers/auth");

router.get("/",checkAuth, agente.get);
router.post("/",checkAuth, agente.post);
router.put("/:id",checkAuth, agente.update);
router.delete("/:id",checkAuth, agente.delte);

module.exports = router;
