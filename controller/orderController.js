const codes = require("../utils/resonsecode")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
// const productModal = require("../modal/productModal")

//PLACE ORDER
exports.placeorder = asyncErrorHandler(async (_request,_response,next)=>{
    let body = _request.body;
    let productname = body.productname;
    let _id = productname.toLowerCase()+"retail";
    let quantity = body.quantity;
    if(!(productname && quantity))
    {
        next(err)
    }
    let datas = await productModal.findOne({"_id" : productname+"retail"});
    let orderedstock = Number(datas.orderedstock) + Number(quantity)
    let newstock = orderedstock<=datas.intialstock?orderedstock:datas.orderedstock;
    let availablestock = datas.availablestock?datas.intialstock-newstock:0;
    let data = await productModal.findByIdAndUpdate(_id,{"orderedstock" : newstock,"availablestock" : availablestock},{new: true})
    let res = availablestock? (quantity <= availablestock+1 ) ?data : `HUGE QUANTITY!, ONLY ${availablestock} STOCKS LEFT` : `${productname.toUpperCase()} OUT OF STOCK`
    let serviceResponse = {
        "message" : "ORDER PLACED",
        "stockdetails" : res
  };

    _response.status(codes.success)
    .json(serviceResponse);
})

//DELETE ORDER
exports.deleteorder = asyncErrorHandler(async (_request,_response,next)=>{
    let body = _request.body;
    let productname = body.productname;
    let _id = productname.toLowerCase()+"retail";
    let datas = await productModal.findOne({"_id" : productname+"retail"});
    let intialstock = datas.intialstock;
    let availablestock = intialstock;
    let orderedstock = 0;
    let data = await productModal.findByIdAndUpdate(_id,{"orderedstock" : orderedstock,"availablestock" : availablestock},{new: true})
    let serviceResponse = {
        "message" : `${productname.toUpperCase()} ORDER CANCELED`,
        "stockdetails" : data
  };

    _response.status(codes.success)
    .json(serviceResponse);
})