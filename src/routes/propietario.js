const router = require("express").Router();
const propietario = require("../controllers/propietario");
const { checkAuth, checkRoleAuth } = require("../controllers/auth");
const multerTitulo = require("../middlewares/multerTituloPropiedad")

router.get("/",  propietario.get);
router.post("/", multerTitulo(),  propietario.post);
router.put("/:id",  multerTitulo(), propietario.update);
router.delete("/:id", propietario.delte);

module.exports = router;
