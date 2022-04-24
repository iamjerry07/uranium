const mongoose = require('mongoose')

const authorSchema= new mongoose.Schema({

    name:String,
    phone:Number,
    email:String,
    address: String,
    rating:Number
})

module.exports= mongoose.model('myAuthor', authorSchema)