const emailValidator = require("email-validator");
const authorModel = require("../models/authorModel");
const jwt = require("jsonwebtoken")

//1. 
const createAuthor = async function (req, res) {
    try {
        let data = req.body;
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
        let author = await authorModel.findOne(loginDetail)
        if (!author)
            return res.status(404).send({ status: false, msg: "Invalid email or Password" })
        let token = jwt.sign({
            email: author.email  //It is supposed to be done with _id attribute because of its unique nature but in this case email is also unique so I tried with it.
        },
            "Project1"
        )
        res.status(200).send({ status: true, msg: token })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

// Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpzbWl0aEBrbWFpbC5jb20iLCJpYXQiOjE2NTExNDI3MTR9.RlgBV4NWu5yJLqjoS5T3jK-yZsWO6HbpvAeM_LLK7qA"

module.exports = { createAuthor, authorLogin }