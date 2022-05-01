const jwt = require("jsonwebtoken")
const authorModel = require("../models/authorModel");
const blogModel = require('../models/blogModel')
const mongoose = require("mongoose")
const objectId = mongoose.Types.ObjectId

//8
let authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) return res.status(404).send({ status: false, msg: "token must be present" });
        let decodedToken = jwt.verify(token, "Project1");
        if (!decodedToken)
            return res.status(400).send({ status: false, msg: "Invalid Token" })
        else {
            req["decodedToken"] = decodedToken
        }
        next();
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

//9
const authorisation = async function (req, res, next) {
    try {
        let tokenAuthorId = req.decodedToken.authorId
        let blogId = req.params.blogId

        // validation for blogId 
        if(!(objectId.isValid(blogId)))
        return res.status(400).send({status:false,msg:"blogId is invalid"})
        
        let authorData = await blogModel.findOne({ _id: blogId }).select({ authorId: 1 })
        let authorId = authorData.authorId.toString()
        if (tokenAuthorId != authorId)
            return res.status(401).send({ status: false, msg: 'Author logged is not allowed to modify the requested blog data' })
        next();
    } 
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { authentication, authorisation };