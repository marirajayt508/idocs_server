const codes = require("../utils/resonsecode")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const productModal = require("../modal/productModal")

//ADD PRODUCT
exports.addproduct = asyncErrorHandler(async (_request,_response,next)=>{
let body = _request.body;
let productname = body.productname.toLowerCase();
let intialstock = body.quantity;
if(!(productname && intialstock)) 
{
    next(err)
}
  let data = {
    "_id" : productname+"retail",
    "productname" : productname,
    "intialstock" : intialstock,
    "availablestock" : intialstock
  }
await productModal.insertMany(data)
let prddata = await productModal.find({"_id" : productname+"retail"})
let serviceResponse = {
    "message" : `${productname.toUpperCase()} SUCESSFULLY ADDED !`,
    "stockDetails" : prddata
};
    _response.status(codes.success)
    .json(serviceResponse);
})

//GET ALL PRODUCT
exports.getallproduct = asyncErrorHandler(async (_request,_response,next)=>{
    let name = _request.body.name;
    let query = name? {"_id" : name+"retail"} : {};
    let data = await productModal.find(query)
    const serviceResponse = {}
    if(name && !data.length)
    {
     serviceResponse["stockDetails"] = `${name} Not Found`;
    }
    else if(!data.length)
    {
        serviceResponse["stockDetails"] = `No Products Found`;
    }
    else
    {
        serviceResponse["stockDetails"] = data;
    }
    _response.status(codes.success)
    .json(serviceResponse);
})

//DELETE PRODUCT
exports.deleteproduct = asyncErrorHandler(async (_request,_response,next)=>{
    let name = _request.body.productname;
    if(!name)
    {
        next(err)
    }
    let _id = name.toLowerCase()+"retail";
    await productModal.findByIdAndDelete(_id)
    let data = await productModal.find()
    let serviceResponse = {
        "message" : `${name.toUpperCase()} SUCCESSFULLY DELETED`,
        "productDetails" : !data.length ? "No Products Found" : data
  };

    _response.status(codes.success)
    .json(serviceResponse);
})

//UPDATE PRODUCT
exports.updateproduct = asyncErrorHandler(async (_request,_response,next)=>{
    let name = _request.body.productname;
    let _id = name+"retail";
    let intialstock = _request.body.quantity;
    if(!(name && intialstock))
    {
        next(err)
    }
    let fetchData = await productModal.findById(_id)
    let availablestock = intialstock - fetchData.orderedstock; 
    let data = await productModal.findByIdAndUpdate(_id,{"intialstock" : intialstock, "availablestock" : availablestock},{new: true})
    let serviceResponse = {
        "message" : `${name.toUpperCase()} SUCCESSFULLY UPDATED`,
        "productDetails" : data
  };

    _response.status(codes.success)
    .json(serviceResponse);
})