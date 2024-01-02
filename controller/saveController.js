const {fields,uploads} = require("../utils/constants")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const codes = require("../utils/resonsecode")
const {saveFields,getUser, saveUploads} = require("../services/userdbService")
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

    let serviceResponse = {
        "datas" : true
  };

    _response.status(codes.success)
    .json(serviceResponse);
})

//SAVE UPLODS
exports.saveUploads = asyncErrorHandler(async (_request,_response,next)=>{

    const body = _request.body;
    const _id = body._id;
    const ufields = body.uploads;

    if(!_id && !ufields)
    {
        next(err)
    }
    // console.log()
    await saveUploads(_id,ufields)
    let serviceResponse = {
        "datas" : true
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