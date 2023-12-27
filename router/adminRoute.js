const router = require("express").Router()
const admin = require("../controller/adminController")

router.route("/addadmin")
.post(admin.addadmin);

//Export Module
module.exports = router;