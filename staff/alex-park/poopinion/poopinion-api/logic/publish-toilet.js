const { validate } = require('poopinion-utils')
const { models: { User, Toilet } } = require('poopinion-data')
const { NotAllowedError, NotFoundError } = require('poopinion-errors')

/**
 * Publishes a new toilet post
 * 
 * @param {string} id user's unique id
 * @param {string} place location of the toilet
 * @param {object} coordinates Google maps location of the place. Includes: latitude, latitudeDelta, longitude, longitudeDelta
 * 
 * @returns {Promise<string>} returns an empty Promise on a successful toilet publish
 * 
 * @throws {NotAllowedError} if the user exists but has the property 'deactivated' as true
 * @throws {NotFoundError} if the user does not exist
 */

module.exports = (id, place, coordinates) => {
    validate.string(id, 'id')
    validate.string(place, 'place')
    validate.type(coordinates, 'coordinates', Object)

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)
            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            const toilet = new Toilet({ place, created: new Date, publisher: id, geolocation: coordinates })

            user.publishedToilets.push(toilet)
            return Promise.all([user.save(), toilet.save()])
        })
        .then(([, toilet]) => {
            toilet.id = toilet._id.toString()
            delete toilet._id

            return toilet.save()
        })
        .then(() => { })
}