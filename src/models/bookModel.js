const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName:{type: String,
            required : true},
            prices: {
                indianPrice: String,
                europePrice: String,
            },
            publishedYear: {type: Number, default: 2021},
            tags: [String],
    authorName: String, 
    totalPage: Number,
    stockAvailable: Boolean,
    // sales: {type: Number, default: 10}
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //users

//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover
