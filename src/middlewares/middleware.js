const jwt = require("jsonwebtoken")
const authorModel = require("../models/authorModel");
const blogModel = require('../models/blogModel')

//8
let authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        let decodedToken = jwt.verify(token, "Project1");
        if (!decodedToken)
            return res.status(400).send({ status: false, msg: "invalid Token" })
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
        let useremail = req.decodedToken.email
        let blogId = req.params.blogId

        let authorData = await blogModel.findOne({ _id: blogId }).select({ authorId: 1 })
        let abc = authorData.authorId.toString()

        let email = await authorModel.findById(abc).select({ email: 1 })

        if (useremail != email.email)
            return res.status(401).send({ status: false, msg: 'Author logged is not allowed to modify the requested blog data' })
        next();
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { authentication, authorisation };