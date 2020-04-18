const {validate} = require('events-utils')
const { models: { Event }} = require('../data')

module.exports = id => {
    validate.string(id, 'id')


    return Event.find({publisher: id})

}