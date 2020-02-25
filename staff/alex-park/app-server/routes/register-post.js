const { registerUser } = require('../logic')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { body: { name, surname, username, password } } = req

    try {
        registerUser(name, surname, username, password, error => {
            if (error) {
                logger.warn(error)
                const { message } = error
                const { session: { acceptCookies } } = req

                return res.render('register', { error: message, name, surname, username, acceptCookies })
            } else {
                res.redirect('/login')
            }
        })
    } catch (error) {
        logger.warn(error)
        const { session: { acceptCookies } } = req
        const { message } = error

        return res.render('register', { error: message, name, surname, username, acceptCookies })
    }
}