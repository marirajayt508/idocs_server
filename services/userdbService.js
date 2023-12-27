const userModal = require("../modal/userModal")

exports.addUser = async(username,usermail,uploades,status,password)=>{
    let data = {
        "_id" : username+"idocs",
        username,
        uploades,
        password,
        usermail,
         status
      }
    await userModal.insertMany(data)
}

exports.getUser = async(username)=>{
    let datas = await userModal.findOne({"_id" : username+"idocs"});
    return datas;
}

exports.delUser = async(username)=>{
    let _id = username.toLowerCase()+"idocs";
    await userModal.findByIdAndDelete(_id)
}
