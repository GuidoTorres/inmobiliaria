const router = require("express").Router();
const { checkAuth, checkRoleAuth } = require("../controllers/auth");
const cliente = require("../controllers/cliente");
// const { crearCliente, actualizarCliente } = require("../middlewares/schemes/cliente.scheme");
// const validate = require("../middlewares/validate");

// router.get("/", checkAuth, checkRoleAuth([1,2]), cliente.get);
// router.post("/",checkAuth, checkRoleAuth([1,2]), validate(crearCliente), cliente.post);
// router.put("/:id",checkAuth, checkRoleAuth([1,2]), validate(actualizarCliente), cliente.update);
// router.delete("/:id",checkAuth, checkRoleAuth([1,2]), cliente.delte);
router.get("/",checkAuth, cliente.get);
router.get("/todos",checkAuth, cliente.getAllClients);
router.get("/trabajado", checkAuth, cliente.getClienteTrabajado);
router.get("/posible",checkAuth, cliente.getPosibleCliente);
router.post("/",checkAuth, cliente.post);
router.post("/trabajado",checkAuth, cliente.postClienteTrabajado);
router.post("/posible",checkAuth,cliente.postPosibleCliente);
router.put("/:id",checkAuth, cliente.update);
router.put("/trabajado/:cod_cliente/:cod_venta", checkAuth, cliente.updateClienteTrabajado);
router.put("/posible/:id", checkAuth, cliente.updatePosibleCliente);
router.put("/posible/trabajado/:id",checkAuth, cliente.updatePosibleClienteaTrabajado);
router.delete("/:id",checkAuth, cliente.delte);
router.delete("/trabajado/:cod_cliente/:cod_venta",checkAuth, cliente.delteClienteTrabajado);


module.exports = router;
