const emailValidator=require("email-validator")
const authorModel=require("../models/authorModel");
const blogModel=require('../models/blogModel')

//1.
const createAuthor=async function(req,res){
    try{
    let data=req.body;
    if(!(emailValidator.validate(data.email)))
    return res.status(400).send({msg:"Enter valid email id"})
    const authorCreated=await authorModel.create(data);
    res.status(200).send({msg:authorCreated})
    }
    catch(error){
        res.status(400).send({msg:error.message})
    }
}











//3.
const getBlog=async function(req,res){
    try{
    let getData=await blogModel.find();
    }
    catch(error){
        res.status(400).send({msg:error.message})
    }
}

module.exports.createAuthor=createAuthor;
module.exports.getBlog=getBlog;