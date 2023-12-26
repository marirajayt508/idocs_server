const { gtoken } = require("./services/jwtService")

console.log("UD",gtoken({
    "role" : "user"
}))