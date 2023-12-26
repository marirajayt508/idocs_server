const mongoose = require("mongoose");
const config = require('config');

const uri = config.get("app.db.uri")

async function dbConnection()
{ 
    try{
        await mongoose.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // Example: Setting server selection timeout to 30 seconds
            socketTimeoutMS: 45000, 
        }) 
    }
    catch(error)
    {
        throw error
    }
}

dbConnection()



module.exports = dbConnection