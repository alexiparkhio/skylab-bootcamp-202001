const { validate } = require('../utils')
const { models: { Event }} = require('../data')
const { models: {User}} = require('../data')

module.exports = (publisher, title, description, location, date) => {

    validate.string(publisher, 'publisher')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(location, 'location')
    validate.type(date, 'date', Date)


    return Event.findOne(({ publisher: id}))

        .then(results => User.updateOne({_id: ObjectId(publisher)}, {$set: {title, description, location, date }}))
}
