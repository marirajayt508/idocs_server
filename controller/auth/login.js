const codes = require("../../utils/resonsecode")
const asyncErrorHandler = require("../../utils/asyncErrorHandler")
const authModal = require("../.././modal/authModal")
const {getUser} = require("../../services/userdbService")

// GET LOGIN
exports.login = asyncErrorHandler(async (_request,_response,next)=>{
    let body = _request.body;
    let serviceResponse = {
        status : await authModal.findById(body.mail+'idocs')
    };
    _response.status(codes.success)
    .json(serviceResponse);
})