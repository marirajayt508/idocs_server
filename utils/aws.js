const aws = require('aws-sdk')
const config = require('config'); 

exports.BUCKET = config.get("app.aws.BUCKET")

exports.awsConfig = ()=>{aws.config.update({
    secretAccessKey: config.get("app.aws.ACCESS_SECRET"),
    accessKeyId: config.get("app.aws.ACCESS_KEY"),
    region: config.get("app.aws.REGION"), 

});}