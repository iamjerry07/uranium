const a_authorModel = require("../models/a_authorModel")

const createAuthor = async function (req, res) {
    let data= req.body

    let savedData= await a_authorModel.create(data)
    res.send({msg: savedData})
}

const createWhenAuthorId = async function (req, res) {
    let data= req.body
    if (data.author_id =false) 
    {
    let savedData= await a_authorModel.create(data)
    res.send({msg: savedData})}

}












module.exports.createAuthor= createAuthor
module.exports.createWhenAuthorId= createWhenAuthorId

