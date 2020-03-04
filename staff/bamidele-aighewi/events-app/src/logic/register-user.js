import { validate } from 'events-utils'
const API_URL = process.env.REACT_APP_API_URL

export default function (name, surname, email, password) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')

    return fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surname, email, password })
    })
        .then(response => {
            if (response.status === 201) return
            
            if (response.status === 409) {
                return response.json().then(body => {
                    const { error } = body

                    throw new Error(error)
                })
            } else throw new Error('Unknown error')
        })
        .then(() => { })
}