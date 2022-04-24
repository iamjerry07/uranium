const bookModel = require('../models/myBook')
const authorModel= require('../models/myAuthor')
const publicationModel= require('../models/myPublication')
const myAuthor = require('../models/myAuthor')
const myPublication = require('../models/myPublication')
const myBook = require('../models/myBook')

//AUTHOR

const createAuthor= async function (req,res) {
    let data = req.body
    createdData = await myAuthor.create(data)
    res.send({msg:createdData})
}



//PUBLICATION

const createPublication= async function (req,res) {
    let data = req.body
    createdData = await myPublication.create(data)
    res.send({msg:createdData})
}


//BOOK
const createBook= async function (req,res) {
    let data = req.body
    createdData = await myBook.create(data)
    res.send({msg:createdData})
}
//show all books data

const allBookData= async function (req,res) {
    createdData = await myBook.find().populate('authorName','publication')
    res.send({msg:createdData})
}

module.exports.createPublication=createPublication
module.exports.createAuthor=createAuthor
module.exports.createBook=createBook
module.exports.allBookData=allBookData