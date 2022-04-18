const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const publisherSchema = new mongoose.Schema({
id: {  type:  ObjectId  },

name: String,
headquater: String

},
{ timestamps: true });





module.exports = mongoose.model('Publisher', publisherSchema)