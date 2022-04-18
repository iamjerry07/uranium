const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publisherModel")

const createBook= async function (req, res) {
    let book = req.body
    if(!book.author){
        res.send("Author id should be present")}

        if(!book.Publisher){
        res.send("Publisher id should be present") }

let ath= await authorModel.find();
let validauth = ath.find(value=>{
    return value.id== book.author._id})


    if(!validauth)
    res.send("Please enter valid author ID")

let pub= await publisherModel.find()
let validPub= pub.find(value=>{
    return value._id==book.Publisher
})
    
    if(!validPub){
    res.send("Please enter valid publisher ID")
    }
    let bookData= await bookModel.create(book)
    res.send(bookData)}
    


const getAllBooksData= async function (req, res) {
    let books = await bookModel.find().populate('_id')
    res.send({data: books})
}

const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author_id')
    res.send({data: specificBook})
}

module.exports.createBook= createBook
module.exports.getAllBooksData= getAllBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
