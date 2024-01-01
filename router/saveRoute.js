const router = require("express").Router()
const saver = require("../controller/saveController")

router.route("/get")
.post(saver.getDatas);

router.route("/setfield")
.put(saver.saveFields);

router.route("/setuplod")
.put(saver.saveUploads);

router.route("/submit")
.put(saver.submitDatas);

//Export Module
module.exports = router;