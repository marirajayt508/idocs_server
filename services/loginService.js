const authModal = require(".././modal/authModal")

exports.addAuthUser = async(dataauth) => {
    await authModal.insertMany(dataauth)
    let jdata = {
un : mail,
otp,
role : 'user'
}
}