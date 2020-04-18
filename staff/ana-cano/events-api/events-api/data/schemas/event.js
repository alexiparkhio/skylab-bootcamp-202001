
const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.eports = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true},
    date: { type: Date, required: true },
    location: { type: String, required: true},
    publisher: { type: ObjectId, required: true},
    created: {type: Date, required: true, default: Date.now }
})



// const { ObjectId } = require('../database')

// module.exports = {
//     title: String,
//     description: String,
//     date: Date,
//     location: String,
//     publisher: ObjectId
// }