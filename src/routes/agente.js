const router = require("express").Router();
const agente = require("../controllers/agente");
const { checkAuth, checkRoleAuth } = require("../controllers/auth");

router.get("/", agente.get);
router.post("/", agente.post);
router.put("/:id", agente.update);
router.delete("/:id", agente.delte);

module.exports = router;
