const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const authorSchema = new mongoose.Schema( {
    id: {type: ObjectId },
    authorName: String,
    age:Number,
    address:String,
    rating: Number
}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema)
