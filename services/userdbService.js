const userModal = require("../modal/userModal")
const {fields,uploads} = require("../utils/constants")

exports.addUser = async(username,usermail,status,password)=>{
    let data = {
        "_id" : username+"idocs",
        username,
        password,
        usermail,
        fields,
        uploads,
         status
      }
    await userModal.insertMany(data)
}

exports.getUser = async(_id)=>{
    let datas = await userModal.findOne({_id});
    return datas;
}

exports.delUser = async(username)=>{
    let _id = username.toLowerCase()+"idocs";
    await userModal.findByIdAndDelete(_id)
}

exports.saveFields = async(_id,fields)=>{
    await userModal.findByIdAndUpdate({_id},{fields})
}
