const batchModel = require("../models/batchModel")
const developerModel= require("../models/developerModel")

const createBatch= async function (req, res) {
    let batch = req.body
    let allbatch = await batchModel.create(batch)
    res.send({data: allbatch})
}





module.exports.createBatch= createBatch