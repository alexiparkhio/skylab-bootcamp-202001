const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    place: { type: String, required: true },
    created: { type: Date, required: true, default: Date.now },
    publisher: { type: ObjectId, ref: 'User' },
    comments: [{ type: ObjectId, ref: 'Comment' }],
    isFavedBy: [{ type: ObjectId, ref: 'User' }],
    geolocation: [{ type: Number }]
    // geolocation: {
    //     type: "FeatureCollection",
    //     features: [
    //         {
    //             type: "Feature",
    //             properties: {},
    //             geometry: {
    //                 type: "Point",
    //                 coordinates: [{
    //                     longitude: {type: Number, required: true},
    //                     latitude: {type: Number, required: true}
    //                 }]
    //             }
    //         }
    //     ]
    // }
})

 // rating: {
    //     cleanness: {
    //         type: [{
    //             type: {
    //                 rater: { type: ObjectId, required: true, ref: 'Comment' },
    //                 rating: { type: Number, required: true }
    //             }
    //         }]
    //     },
    //     looks: {
    //         type: [{
    //             type: {
    //                 rater: { type: ObjectId, required: true, ref: 'Comment' },
    //                 rating: { type: Number, required: true }
    //             }
    //         }]
    //     },
    //     multipleToilets: {
    //         type: [{
    //             type: {
    //                 rater: { type: ObjectId, required: true, ref: 'Comment' },
    //                 rating: { type: Boolean, required: true }
    //             }
    //         }]
    //     },
    //     paymentRequired: {
    //         type: [{
    //             type: {
    //                 rater: { type: ObjectId, required: true, ref: 'Comment' },
    //                 rating: { type: Boolean, required: true }
    //             }
    //         }]
    //     },
    //     paperDeployment: {
    //         type: [{
    //             type: {
    //                 rater: { type: ObjectId, required: true, ref: 'Comment' },
    //                 rating: { type: Boolean, required: true }
    //             }
    //         }]
    //     },
    //     overallRating: {
    //         type: [{
    //             type: {
    //                 rater: { type: ObjectId, required: true, ref: 'Comment' },
    //                 rating: { type: Number, required: true }
    //             }
    //         }]
    //     },
    //     image: { type: String }
    // },