const codes = require("../utils/resonsecode")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const {mailer} = require("../utils/mailer")
const authModal = require(".././modal/authModal")
const config = require('config');
const { genpass } = require("../utils/otp")

const appname = config.get("app.name");
const phone = config.get("app.phone");

//ADD ADMIN
exports.addadmin = asyncErrorHandler(async (_request,_response,next)=>{

    let mail = _request.body.email.trim();
    let name = _request.body.name.trim();
    let username = name.trim().toLowerCase();
    let otp = genpass(10)
    let serviceResponse = {
        status : false
    }; 
    if((!username&&!mail))
    {
next(err)
    }

    let dataauth = {
        _id : username+"idocs",
        mail,
        'role': 'admin',
        password : otp
    }
    await authModal.insertMany(dataauth)
        serviceResponse = {
           status : true
       };


       let datas = `Dear ${username.toUpperCase()},<br/> <br/>Your admin accout activated.<br/><br/>
       <div style="padding : '3px'; border : '1px';">
        <strong>Email:</strong> ${name.toUpperCase()}<br/>
        <strong>Password:</strong> <i><code style="color : 'green'">${otp}</code></i>
        </div>
       <br/>
       <a href=${config.get("app.ui.link")}>Click here</a> to login. For loging use the above unique credentials.
       <br/><br/>If you encounter any issues or have any questions regarding the document upload process, please feel free to reach out to ${phone} for assistance.
       <br/><br/>Thanks & Regards<br/>iDocs Team.`
       let sub = `${appname} - Documents Upload`
       mailer(mail,sub,datas)
    
    _response.status(codes.success)
    .json(serviceResponse);
    })


//DELETE ADMIN
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

