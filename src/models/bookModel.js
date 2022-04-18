const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    id:{
        type:String,
        ref: ObjectId
    },
    name: String,
    author: {
        type: ObjectId,
        ref: "Author"
    },
    price: Number,
    rating: Number,
    Publisher:{type: ObjectId,
                ref: "Publisher"}


}, { timestamps: true });


module.exports = mongoose.model('LibraryBook', bookSchema)
