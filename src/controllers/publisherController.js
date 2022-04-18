const publisherModel = require("../models/publisherModel")
const AuthorModel= require("../models/publisherModel")

const createPublisher= async function (req,res){
    let data= req.body
    let allData = await publisherModel.create(data)
    res.send({msg:allData})
}


module.exports.createPublisher=createPublisher