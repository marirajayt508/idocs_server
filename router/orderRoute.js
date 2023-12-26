const router = require("express").Router()
const order = require("../controller/orderController")

router.route("/placeorder")
.post(order.placeorder);

router.route("/deleteorder")
.delete(order.deleteorder);

//Export Module
module.exports = router;