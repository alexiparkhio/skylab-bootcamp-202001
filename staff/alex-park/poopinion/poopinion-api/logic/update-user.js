const { validate } = require('poopinion-utils')
const { models: { User } } = require('poopinion-data')
const { NotAllowedError, NotFoundError } = require('poopinion-errors')
const bcrypt = require('bcryptjs')

/**
 * Registers a new user on the database
 * 
 * @param {string} id user's unique ID
 * @param {object} data the elements that will be updated
 * @param {string} password user's password
 * 
 * @returns {Promise<string>} an empty Promise
 * 
 * @throws {NotAllowedError} if a user set a wrong password
 * @throws {NotFoundError} if the user does not exist

 */
module.exports = (id, data, password) => {
    validate.string(id, 'id')
    validate.type(data, 'data', Object)
    validate.string(password, 'password')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            return bcrypt.compare(password, user.password)
                .then(validPassword => {
                    if (!validPassword) throw new NotAllowedError(`wrong credentials`)

                    return User.findByIdAndUpdate(id, { $set: data })
                })
                .then(() => { })
        })
}