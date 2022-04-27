const emailValidator = require("email-validator");
const authorModel = require("../models/authorModel");
const blogModel = require('../models/blogModel')


//1. 
const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        if (!(emailValidator.validate(data.email)))
            return res.status(400).send({ status:false, msg: "Enter valid email id" })
        const authorCreated = await authorModel.create(data);
        res.status(200).send({ status:true,msg: authorCreated })
    }
    catch (error) {
        res.status(400).send({ status:false, msg: error.message })
    }
}

//2.
const createBlog = async function (req, res) {
    try {
        let data = req.body
        let authorData=await authorModel.findById(data.authorId)
        if (!authorData)
            return res.status(400).send({  status:false,msg: "Enter valid author ID" })
        if(data.isPublished)
        data["publishedAt"]=new Date();
        const createdBlog = await blogModel.create(data)
        res.status(200).send({status:true, msg: createdBlog })
    }
    catch (error) {
        res.status(400).send({ status:false, msg: error.message })
    }
}


//3.
const getBlog = async function (req, res) {
    try {
        let getData = await blogModel.find({isDeleted:false , isPublished:true});
        if(getData==[])
        return res.status(404).send({status:false,msg:"Blogs not present"})
        res.status(200).send({status:true,msg:getData})
    }
    catch (error) {
        res.status(400).send({ status:false,msg: error.message })
    }
}



//5.
const deleteBlog = async function (req, res) {
    try {
        let Blogid = req.params
        let findData=await blogModel.findById(Blogid)
        if(!findData)
            return res.status(400).send({ status: false, message: "no such user exists" })
        if(findData.isDeleted)
        return res.status(400).send({ status:false,msg:"Blog is already deleted"})
        let deletedata = await blogModel.findOneAndUpdate({_id: Blogid }, { $set: { isDeleted: true}, $setOnInsert:{ deletedAt:new Date()}}, { $new: true , upsert:true})
        res.send({status:true, msg: deletedata })
    } 
    catch (error) {
        res.status(400).send({  status:false,msg: error.message })
    }
}

module.exports.createAuthor = createAuthor;
module.exports.createBlog = createBlog;
module.exports.getBlog = getBlog;
module.exports.deleteBlog = deleteBlog;