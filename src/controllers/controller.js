const emailValidator = require("email-validator");
const authorModel = require("../models/authorModel");
const blogModel = require('../models/blogModel')
const jwt = require("jsonwebtoken")

//1. 
const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        if (!(emailValidator.validate(data.email)))
            return res.status(400).send({ status: false, msg: "Enter valid email id" })
        const authorCreated = await authorModel.create(data);
        res.status(201).send({ status: true, msg: authorCreated })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

//2.
const createBlog = async function (req, res) {
    try {
        let data = req.body
        let authorData = await authorModel.findById(data.authorId)
        if (!authorData)
            return res.status(400).send({ status: false, msg: "Enter valid author ID" })
        if (data.isPublished)
            data["publishedAt"] = new Date();
        const createdBlog = await blogModel.create(data)
        res.status(201).send({ status: true, msg: createdBlog })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


//3.
const getBlog = async function (req, res) {
    try {
        let query = req.query
        let mainQuery = [{ authorId: query.authorId }, { category: query.category }, { tags: query.tags }, { subcategory: query.subcategory }]
        let obj = { isDeleted: false, isPublished: true, $or: mainQuery }
        let getData = await blogModel.find(obj).collation({ locale: "en", strength: 2 })

        if (!(query.authorId || query.category || query.tags || query.subcategory))
            getData = await blogModel.find({ isDeleted: false, isPublished: true })
        if (getData.length === 0)
            return res.status(404).send({ status: false, msg: "Blogs not present" })

        res.status(200).send({ status: true, msg: getData })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

//4.  update by title, body, adding tags, adding a subcategory
const updateData = async function (req, res) {
    try {
        let Id = req.params.blogId
        let query = req.body
        let updateQuery = { title: query.title, category: query.category, isPublished: true, publishedAt: new Date() }
        let addQuery = { tags: query.tags, subcategory: query.subcategory }
        let blogId = await blogModel.findById(Id)

        if (!blogId)
            return res.status(404).send({ status: false, msg: "Blog not present" })
        if (blogId.isDeleted)
            return res.status(404).send({ status: false, msg: "Blog is Deleted" })

        let getData = await blogModel.findOneAndUpdate({ _id: Id }, { $set: updateQuery, $push: addQuery }, { multi: true, new: true, upsert: true }).collation({ locale: "en", strength: 2 })

        res.status(200).send({ status: true, msg: getData })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

//5.
const deleteBlog = async function (req, res) {
    try {
        let Blogid = req.params.blogId
        let findData = await blogModel.findById(Blogid)
        if (!findData)
            return res.status(404).send({ status: false, message: "no such blog exists" })
        if (findData.isDeleted)
            return res.status(400).send({ status: false, msg: "Blog is already deleted" })
        let deletedata = await blogModel.findOneAndUpdate({ _id: Blogid }, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true, upsert: true })
        res.status(200).send({ status: true, msg: deletedata })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

//6.
const deleteBlogBy = async function (req, res) {
    try {
        let query = req.query
        let mainQuery = [{ authorId: query.authorId }, { category: query.category }, { tags: query.tags }, { subcategory: query.subcategory }]
        let obj = { isDeleted: false, isPublished: false, $or: mainQuery }
        let findData = await blogModel.find(obj).collation({ locale: "en", strength: 2 })
        if (findData.length === 0)
            return res.status(404).send({ status: false, message: "no such blogs exists / the blogs you are looking for are already deleted or published" })
        let deletedData = await blogModel.updateMany(obj, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true, upsert: true })
        res.status(200).send({ status: true, msg: deletedData })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


//7.
const authorLogin = async function (req, res) {

    try {
        let email = req.body.email
        let password = req.body.password

        let author = await authorModel.findOne(req.body)

        if (!author)

            return res.status(404).send({ status: false, msg: "Invalid Usernme or Password" })

        let token = jwt.sign({
            email: author.email

        },
            "Project1"
        )

        res.status(200).send({ status: true, msg: token })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

////"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpzbWl0aEBrbWFpbC5jb20iLCJpYXQiOjE2NTExNDI3MTR9.RlgBV4NWu5yJLqjoS5T3jK-yZsWO6HbpvAeM_LLK7qA"

//8
let middleware= async function(req,res,next){
   try {
    let token=req.headers["x-api-key"]
   
     let decodedToken=jwt.verify(token,"Project1");
   
     if(!decodedToken)
   
    return res.status(400).send({status:false,msg:"invalid Token"})
   else{
    req["decodedToken"]=decodedToken
   }
    next();
}
catch(err){
 res.status(500).send({status:false,msg:err.message})   
 
}

}

//9

const middleware2 = async  function (req,res,next){
  
    let useremail=req.decodedToken.email
    let blogId=req.params.blogId
   
   let authorData= await blogModel.findOne({_id:blogId}).select({authorId:1})
 let abc=authorData.authorId.toString()
 
   let email= await authorModel.findById(abc).select({email:1})
 
  if(useremail != email.email )
  return res.status(400).send({status: false, msg: 'Author logged is not allowed to modify the requested blog data'})
   next();    
}


  



module.exports = { createAuthor, createBlog, getBlog, deleteBlog, deleteBlogBy, updateData, authorLogin,middleware,middleware2 }