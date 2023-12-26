const codes = require("../utils/resonsecode")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const {add,view,get,del} = require('../services/awsService')
const {addUser,delUser,getUser} = require("../services/userdbService")
const {mailer} = require("../utils/mailer")
const config = require('config');
const { gtoken, vtoken } = require("../services/jwtService")
//ADD USER
const appname = config.get("app.name");
const phone = config.get("app.phone");

exports.adduser = asyncErrorHandler(async (_request,_response,next)=>{

    let mail = _request.body.email.trim();
    let name = _request.body.name.trim();
    let fields = _request.body.fields;
    let uploades = _request.body.uploades;
    let username = name.trim().toLowerCase();
    let serviceResponse = {
        status : false
    }; 
    if((!username&&!mail))
    {
next(err)
    }
    if(fields.length==0)
    {
        next(err)
    }
    const datas = await view();
    if(datas.indexOf(`${username}/`)==-1)
    {
        addUser(username,mail,fields,uploades,"initated")
        let udatas = await getUser(username);
        let jdata = {
            "_id" : udatas._id,
            "role" : udatas.role,
        }
        serviceResponse = {
           status : await add(`${name.toLowerCase()}/`)
       };
       let token =  gtoken(jdata)
       let datas = `Dear ${username.toUpperCase()},<br/> <br/>I hope this message finds you well.<br/><br/>
       As part of our ongoing process, we kindly request that you upload the necessary documents by clicking the link
       <br/><br/>
       <a href=${config.get("app.ui.link")+"?ut="+token}>Click here</a> to upload your documents.
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
    delUser(username)
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