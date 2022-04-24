const mongoose = require('mongoose')
const myAuthor = require('./myAuthor')


const publicationSchema= new mongoose.Schema({

    publicationName:String,
    rating:Number

        
})

module.exports= mongoose.model('myPublication', publicationSchema)