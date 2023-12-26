const jwt = require('jsonwebtoken');
const config = require('config'); 

const secretKey = config.get("app.jwt")
exports.gtoken = (datas)=>{
    let token = jwt.sign(datas, secretKey, { expiresIn: '1h' });
    return token;
}
 
exports.vtoken = (token)=>{
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return false;
        }
        return true;
      });
}


