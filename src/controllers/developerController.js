const AuthorModel= require("../models/developerModel")

const createDeveloper= async function (req, res) {
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.send({data: authorCreated})
}

const getAuthorsData= async function (req, res) {
    let authors = await AuthorModel.find()
    res.send({data: authors})
}

module.exports.createDeveloper = createDeveloper
module.exports.getAuthorsData = getAuthorsData