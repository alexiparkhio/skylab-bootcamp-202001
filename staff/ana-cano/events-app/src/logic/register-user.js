
import { validate } from 'events-utils'
const { NotAllowedError } = require('events-errors')

const { env: { REACT_APP_API_URL } } = process
const API_URL = process.env.REACT_APP_API_URL

module.exports =  function (name, surname, email, password) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')

    return (async () => {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, email, password })
        })

        if (response.status === 201) return

        if (response.status >= 400 && status < 500) {
           const { error } = await response.json()

            if ( status === 409) {
                throw new NowAllowedError(error)
            }
           throw new Error(error)
        }
            throw new Error ('server error')
    })()
}