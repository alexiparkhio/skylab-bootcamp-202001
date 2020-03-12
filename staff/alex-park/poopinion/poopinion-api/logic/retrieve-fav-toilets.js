const { validate } = require('poopinion-utils')
const { models: { User, Toilet } } = require('poopinion-data')
const { NotFoundError, NotAllowedError } = require('poopinion-errors')

/**
 * Retrieves all favorite toilet posts that are included on the user
 * 
 * @param {string} id user's unique ID
 * 
 * @returns {Array} returns an array of all found results
 * 
 * @throws {NotFoundError} if the user does not exist
 * @throws {NotAllowedError} if the user exists but has the property 'deactivated' as true
 */
module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)
            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            return Toilet.find({ isFavedBy: id }).populate('comments').lean()
        })
}