const codes = require("../utils/resonsecode")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const {add,view,get,del} = require('../services/awsService')
const {addUser,delUser,getUser} = require("../services/userdbService")
const {mailer} = require("../utils/mailer")
const authModal = require(".././modal/authModal")
const config = require('config');
const { gtoken, vtoken } = require("../services/jwtService")
const { genpass } = require("../utils/otp")
const {hashPassword} = require("../utils/bcryptPass")

//ADD USER
const appname = config.get("app.name");
const phone = config.get("app.phone");

exports.adduser = asyncErrorHandler(async (_request,_response,next)=>{

    let mail = _request.body.email.trim();
    let name = _request.body.name.trim();
    let uploades = _request.body.uploades;
    let username = name.trim().toLowerCase();
    let otp = genpass(10)
    let password = await hashPassword(otp)
    let serviceResponse = { 
        status : false
    }; 
    if((!username&&!mail))
    {
next(err)
    }
    const datas = await view();
    if(datas.indexOf(`${username}/`)==-1)
    {
        let dataauth = {
            _id : username+"idocs",
            mail,
            'role': 'user',
            password
        }

        addUser(username,mail,uploades,"initated",otp)
        await authModal.insertMany(dataauth)
                let jdata = {
            un : mail,
            otp,
            role : 'user'
        }
        serviceResponse = {
           status : await add(`${name.toLowerCase()}/`)
       };
       let token =  gtoken(jdata)
       let datas = `Dear ${username.toUpperCase()},<br/> <br/>I hope this message finds you well.<br/><br/>
       As part of our ongoing process, we kindly request that you upload the necessary documents by clicking the link
       <br/><br/>
       <div style="padding : '3px'; border : '1px';">
        <strong>Email: </strong> ${mail}<br/>
        <strong>Password:</strong> <i><code style="color : 'green'">${otp}</code></i>
        </div>
       <br/>
       <a href=${config.get("app.ui.link")+'?ut='+token}>Click here</a> to login and upload your documents. For loging use the above unique credentials.
       <br/><br/>If you encounter any issues or have any questions regarding the document upload process, please feel free to reach out to ${phone} for assistance.
       <br/><br/>Thanks & Regards<br/>iDocs Team.`
       let sub = `${appname} - Documents Upload`
       mailer(mail,sub,datas)
    }
    _response.status(codes.success)
    .json(serviceResponse);
    })

// GET ALL USERS
exports.getallusers = asyncErrorHandler(async (_request,_response,next)=>{
    let serviceResponse = {
        datas : await view()
    };
    _response.status(codes.success)
    .json(serviceResponse);
})

//DELETE USERS
exports.deleteuser = asyncErrorHandler(async (_request,_response,next)=>{
    let username = _request.body.username.trim().toLowerCase();

    if(!username)
    {
        next(err)
    }
    let serviceResponse = {status : await del(`${username}/`)};
    if(await view())
  {  delUser(username)
await authModal.findByIdAndDelete(username+'idocs')
}
    _response.status(codes.success)
    .json(serviceResponse);
})

// GET ALL USERS
exports.getuser = asyncErrorHandler(async (_request,_response,next)=>{
    let username = _request.body.username.trim().toLowerCase();
    let token = _request.headers.authorization.substring(7);
    if(!username&&!vtoken(token))
    {
        next(err)
    }
    let serviceResponse = {
        datas : await getUser(username)
    };
    _response.status(codes.success)
    .json(serviceResponse);
})

// GET ALL USERS
exports.accessuser = asyncErrorHandler(async (_request,_response,next)=>{
    let body = _request.body;
    console.log(body)
    let serviceResponse = {
        datas : true
    };
    _response.status(codes.success)
    .json(serviceResponse);
})

// GET UPLOADES
exports.upload = asyncErrorHandler(async (_request,_response,next)=>{
    // let body = _request.body;
    let serviceResponse = {
        status : true
    };
    _response.status(codes.success)
    .json(serviceResponse);
})