const bcrypt = require('bcrypt');
const config = require('config'); 

const saltRounds = config.get('app.bcrypt.rounds');

exports.hashPassword = async (plainPassword) =>{
    let pass = plainPassword;
    try {
        pass = await bcrypt.hash(plainPassword, saltRounds)
    }
   catch(e)
   {
    console.log(e)
   }
   return pass;
}

exports.comparePassword = async(userInputPassword, hashedPasswordFromDB) =>{
    let status = false;
    try {
         status = bcrypt.compare(userInputPassword, hashedPasswordFromDB)
    }
    catch(e)
    {
        console.log(e)
    }

    return status;
}   
