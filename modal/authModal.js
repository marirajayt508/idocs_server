const mongoose = require("mongoose");
const config = require('config'); 

//Verify Connection
const connection = mongoose.connection;

// connection.on("connected",()=>{
// console.log("USER MODAL CONNECTED")
//   });

// connection.on("error",()=>{
// console.log("PRODUCT MODAL CONNECTION ERROR")
// });

const authSchema =  new mongoose.Schema({
  "_id": {
    "type" : String,
  },
"mail": {
    "type" : String,
  },
  'role' : {
 "type" : String,
  },
  "password":{
    "type" : String,
  },
});

const authModal = mongoose.model(config.get("app.db.collections.auth"),authSchema);

module.exports = authModal; 