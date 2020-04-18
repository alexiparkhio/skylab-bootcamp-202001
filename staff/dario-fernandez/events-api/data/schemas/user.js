const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    publishedEvents: { type: [ObjectId], ref: 'Event' },
    created: { type: Date, required: true, default: Date.now },
    authenticated: { type: Date },
    retrieved: { type: Date }
})