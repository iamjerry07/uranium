const { count } = require("console")
const a_bookModel = require("../models/a_bookModel")
const a_authorController= require("../controllers/a_authorController1")

const createBook = async function (req, res) {
    let data= req.body

    let savedData= await a_bookModel.create(data)
    res.send({msg: savedData})
}

const chetanBhagatBooks = async function (req, res) {

    let savedData= await a_bookModel.find({author_id:1}).select({name:1})
    res.send({msg: savedData})
}

const findAndUpdate = async function (req, res) {

    let savedData= await a_bookModel.findOneAndUpdate({name:"Two states"},{price:150},{$new:true}).select({authorName:1,price:1})
    res.send(savedData)
}



 module.exports.createBook= createBook
 module.exports.chetanBhagatBooks=chetanBhagatBooks
 module.exports.findAndUpdate=findAndUpdate


 const authorsName = async function(req,res){
    const booksId = await a_bookModel.find({price: {$gte:50, $lte:100}}).select({author_id:1, _id:0})
     const id = booksId.map(inp=>inp.author_id)
res.send(booksId)
    let arr = []
    for(let i=0;i<id.length;i++){
        let x = id[i]
        const author = await authorModel.find({author_id:x}).select({author_name:1, _id:0})
        arr.push(author)
    }
    const authorName = arr.flat()
    res.send({msg:authorName})
  }


module.exports.authorsName=authorsName
