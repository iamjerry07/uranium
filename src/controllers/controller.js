const emailValidator = require("email-validator");
const authorModel = require("../models/authorModel");
const blogModel = require('../models/blogModel')


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
        let bodyData = req.body
        let updateQuery = { title: bodyData.title, category: bodyData.category, isPublished: true, publishedAt: new Date() }
        let addQuery = { tags: bodyData.tags, subcategory: bodyData.subcategory }
        let blogId = await blogModel.findById(Id)

        if (!blogId)
            return res.status(404).send({ status: false, msg: "Blog not present" })
        if (blogId.isDeleted)
            return res.status(404).send({ status: false, msg: "Blog is Deleted" })

        let getData = await blogModel.findOneAndUpdate({ _id: Id }, { $set: updateQuery, $push: addQuery }, { multi: true, new: true, upsert: true })
        
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


module.exports = { createAuthor, createBlog, getBlog, deleteBlog, deleteBlogBy, updateData }