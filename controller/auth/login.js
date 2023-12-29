const codes = require("../../utils/resonsecode")
const asyncErrorHandler = require("../../utils/asyncErrorHandler")
const authModal = require("../.././modal/authModal")
const {getUser} = require("../../services/userdbService")
const {comparePassword} = require("../../utils/bcryptPass")

// GET LOGIN
exports.login = asyncErrorHandler(async (_request,_response,next)=>{
    let body = _request.body;
    let mail = body.mail;
    let otp =  body.otp;

    if(!mail && !otp)
    {next(err)}

    let datas = await authModal.findOne({mail});
    let logins = await comparePassword(otp,datas.password)
    let serviceResponse = {};

if((datas??false))
{
    serviceResponse = {
        status : datas
    };
}  

       if(!logins)
       {
        serviceResponse = {
            status : {
                "msg" : "Invalid Password",
                "value" : true
            }
        };
       }

    _response.status(codes.success)
    .json(serviceResponse);
})