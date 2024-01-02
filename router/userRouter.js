const router = require("express").Router()
const user = require("../controller/userController")
const multer = require('multer')
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const {BUCKET,awsConfig} = require('../utils/aws')
awsConfig()
const s3 = new aws.S3();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//       console.log(req.params.filename)
//       console.log(req.body.username)
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })
  
const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: BUCKET,
        key: function (req, file, cb) {
            console.log("DATAS",req.body.username);
            cb(null, `${req.body.username.slice(0,-5)}/${file.originalname=req.body.filename.toUpperCase()+"_"+req.body.username.toUpperCase().slice(0,-5)}`)
        }
    })
})

router.route("/adduser/")
.post(user.adduser);

router.route("/getallusers")
.get(user.getallusers);

router.route("/get")
.post(user.getuser);

router.route("/deleteuser/:username")
.delete(user.deleteuser);

router.route("/access")
.post(upload.single('file'),user.accessuser);

//Export Module
module.exports = router;