const router = require("express").Router()
const login = require("../controller/auth/login")

router.route("/login")
.post(login.login);

//Export Module
module.exports = router;