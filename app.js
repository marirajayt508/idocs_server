//Package Decleration
const express = require("express");
const app = express();
const userRouter = require('./router/userRouter')
const authRouter = require('./router/authRouter')
const adminRouter = require('./router/adminRoute')
const dotenv = require("dotenv");
const db_connection = require("./db_connection/connection")
const {awsConfig} = require('./utils/aws')
const cors = require('cors')

//Defiened Middleware
app.use(express.json())
app.use(cors())

//Environment Config
dotenv.config()
awsConfig()

//Custome Functions for DB Connection
db_connection()

//Router Middleware
app.use("/auth",authRouter)
app.use("/users",userRouter)
app.use("/admin",adminRouter)

//Export Module
module.exports = app;