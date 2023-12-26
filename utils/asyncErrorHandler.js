const codes = require("./resonsecode")

module.exports = (func)=>{
  return (req,res,next)=>{
    func(req,res,next).catch(err => {
        res.status(codes.notfond)
        .json({
            "message" : "An Error Occured",
            "Error" : err
        })
      })
  }
}