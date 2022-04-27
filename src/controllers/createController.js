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
        res.status(200).send({ status: true, msg: authorCreated })
    }
    catch (error) {
        res.status(400).send({ status: false, msg: error.message })
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
        res.status(200).send({ status: true, msg: createdBlog })
    }
    catch (error) {
        res.status(400).send({ status: false, msg: error.message })
    }
}


//3.
const getBlog = async function (req, res) {
    try {
        let authorId = req.query.authorId
        let category = req.query.category
        let tag = req.query.tags
        let subcategory = req.query.subcategory
        let getData = await blogModel.find({ isDeleted: false, isPublished: true, $or: [{ authorId: authorId }, { category: category }, { tags: tag }, { subcategory: subcategory }] }).collation({ locale: "en", strength: 2 })
        if (!(authorId || category || tag || subcategory))
            getData = await blogModel.find({ isDeleted: false, isPublished: true })
        if (getData.length === 0)
            return res.status(404).send({ status: false, msg: "Blogs not present" })
        res.status(200).send({ status: true, msg: getData })
    }
    catch (error) {
        res.status(400).send({ status: false, msg: error.message })
    }
}

//4.  update by title, body, adding tags, adding a subcategory
const updateData = async function (req, res) {
    try {
        let Id = req.params.blogId
        let title = req.body.title
        let category = req.body.category
        let tags = req.body.tags
        let subcategory = req.body.subcategory
        let blogId = await blogModel.findById(Id)
        if (!blogId.isDeleted == true) {
            return res.status(404).send({ status: false, msg: "Blogs is Deleted" })
        }
        let getData = await blogModel.findOneAndUpdate({ _id: Id }, { $set: { title: title, category: category, tags: tags, subcategory: subcategory, isPublished: true, publishedAt: new Date() } }, { multi: true, new: true, upsert: true }).collation({ locale: "en", strength: 2 })
        if (getData.length === 0)
            return res.status(404).send({ status: false, msg: "Blogs not present" })
        res.status(200).send({ status: true, msg: getData })
    }
    catch (error) {
        res.status(400).send({ status: false, msg: error.message })
    }
}
//
//5.
const deleteBlog = async function (req, res) {
    try {
        let Blogid = req.params.blogId
        let findData = await blogModel.findById(Blogid)
        if (!findData)
            return res.status(400).send({ status: false, message: "no such user exists" })
        if (findData.isDeleted)
            return res.status(400).send({ status: false, msg: "Blog is already deleted" })
        let deletedata = await blogModel.findOneAndUpdate({ _id: Blogid }, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true, upsert: true })
        res.send({ status: true, msg: deletedata })
    }
    catch (error) {
        res.status(400).send({ status: false, msg: error.message })
    }
}

//6.
const deleteBlogBy = async function (req, res) {
    try {
        let authorId = req.query.authorId
        let category = req.query.category
        let tag = req.query.tags
        let subcategory = req.query.subcategory
        let obj = { isPublished: false, $or: [{ authorId: authorId }, { category: category }, { tags: tag }, { subcategory: subcategory }] }
        let updatedData = await blogModel.findOne(obj).collation({ locale: "en", strength: 2 })
        if (!updatedData)
            return res.status(400).send({ status: false, message: "no such user exists" })
        if (updatedData.isDeleted)
            return res.status(400).send({ status: false, msg: "Blog is already deleted" })
        let deletedData = await blogModel.findOneAndUpdate(obj, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true, upsert: true }).collation({ locale: "en", strength: 2 })
        res.send({ status: true, msg: deletedData })
    }
    catch (error) {
        res.status(400).send({ status: false, msg: error.message })
    }
}

module.exports.createAuthor = createAuthor;
module.exports.createBlog = createBlog;
module.exports.getBlog = getBlog;
module.exports.deleteBlog = deleteBlog;
module.exports.deleteBlogBy = deleteBlogBy;
module.exports.updateData = updateData;
