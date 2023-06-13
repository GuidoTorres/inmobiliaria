const router = require("express").Router();
const login = require("../controllers/login");

router.post("/", login.authLogin);
router.post("/refresh-token", login.refreshToken);


module.exports = router;
