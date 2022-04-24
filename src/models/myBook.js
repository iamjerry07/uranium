const mongoose = require('mongoose')
const myAuthor = require('./myAuthor')
const myPublication = require('./myPublication')

const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema= new mongoose.Schema({

    bookName:String,
    authorName:{type:ObjectId,
                 ref:"myAuthor"},

    pages:Number,

    publicaton: {type:ObjectId,
                 ref:"myPublication" },
                
     bookRating:Number
})

module.exports= mongoose.model('myBook', bookSchema)