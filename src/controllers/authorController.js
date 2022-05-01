const emailValidator = require("email-validator");
const authorModel = require("../models/authorModel");
const jwt = require("jsonwebtoken")

//1. 
const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        //when body is empty
        if (Object.keys(data).length === 0)
            return res.status(400).send({ status: false, msg: "Enter data to create author" })

        //validate email
        if (!(emailValidator.validate(data.email)))
            return res.status(403).send({ status: false, msg: "Enter valid email id" })

        const authorCreated = await authorModel.create(data);
        res.status(201).send({ status: true, msg: authorCreated })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


//7.
const authorLogin = async function (req, res) {
    try {
        let loginDetail = req.body
        let keys = Object.keys(loginDetail)
        let temp = 0;
        //when body is empty
        if (keys.length === 0)
            return res.status(400).send({ status: false, msg: "email and password required" })

        //checking, body must have 2 keys only i.e., email and password
        if (keys.length === 2) {
            if (loginDetail.email && loginDetail.password)
                temp++;
            if (temp === 0)
                return res.status(400).send({ status: false, msg: "Invalid login details!!" })
        }
        else return res.status(400).send({ status: false, msg: "Invalid login details!!" })

        let author = await authorModel.findOne(loginDetail)
        if (!author)
            return res.status(404).send({ status: false, msg: "Invalid email or Password" })
        let token = jwt.sign({
            authorId: author._id.toString()
        },
            "Project1"
        );
        res.status(200).send({ status: true, msg: token })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
} 

// Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JJZCI6IjYyNjg1NDhkZGRiNDM4NjU2YmMyYzQwYSIsImlhdCI6MTY1MTQwOTk2OH0.ZRmOGsIBxJYfYAUcMkAYz2snCPQRXJvWAFbszGAVYo8"

module.exports = { createAuthor, authorLogin }