const {fields,uploads} = require("../utils/constants")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const codes = require("../utils/resonsecode")
const {saveFields,getUser} = require("../services/userdbService")
const {mailer} = require("../utils/mailer")
const config = require('config');

const phone = config.get("app.phone");

//GET FIELDS AND UPLODS
exports.getDatas = asyncErrorHandler(async (_request,_response,next)=>{

    const body = _request.body;
    const _id = body._id;

    if(!_id)
    {
        next(err)
    }
    const db_datas = await getUser(_id);
    let fields = db_datas.fields
    let uploads = db_datas.uploads
    let serviceResponse = {
        "datas" : {fields,uploads}
  };

    _response.status(codes.success)
    .json(serviceResponse);
})

//SAVE FIELDS
exports.saveFields = asyncErrorHandler(async (_request,_response,next)=>{
    const body = _request.body;
    const _id = body._id;
    const ufields = body.fields;

    if(!_id && !ufields)
    {
        next(err)
    }
    const db_datas = await getUser(_id);
    const mail = db_datas.usermail;
    await saveFields(_id,ufields)
    let datas = `Dear ${_id.slice(0,-5).toUpperCase()},<br/> <br/>Your <b>Details Saved</b> to our server.<br/><br/>
   
To continue filling out your form, please log in to your portal using the credentials that were sent to you in the initial email.
    <br/>
    <br/>
    <a href=${config.get("app.ui.link")}>Login Link</a>
    <br/>
    <br/><br/>If you encounter any issues or have any questions regarding the document upload process, please feel free to reach out to ${phone} for assistance.
    <br/><br/>Thanks & Regards<br/>iDocs Team.`
    let sub = `${_id.slice(0,-5).toUpperCase()} - Basic Details Saved`
    mailer(mail,sub,datas)
    let serviceResponse = {
        "datas" : true
  };

    _response.status(codes.success)
    .json(serviceResponse);
})

//SAVE UPLODS
exports.saveUploads = asyncErrorHandler(async (_request,_response,next)=>{

    let serviceResponse = {
        "datas" : {fields,uploads}
  };

    _response.status(codes.success)
    .json(serviceResponse);
})

//SUBMIT DATAS
exports.submitDatas = asyncErrorHandler(async (_request,_response,next)=>{

    let serviceResponse = {
        "datas" : {fields,uploads}
  };

    _response.status(codes.success)
    .json(serviceResponse);
})