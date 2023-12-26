//Declaring App
const app = require("./app")

//Declaring Port
const PORT = process.env.PORT || 7000;

//Listening Port
app.listen(PORT,(_request,_response)=>{
    console.log(`SERVER STRATED IN PORT: ${PORT}`)
})