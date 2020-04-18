import { validate } from 'events-utils'

export default function (token) {
    validate.string(token, 'token')

    const [, payload] = token.split('.')

    const { sub } = JSON.parse(atob(payload))

    if (!sub) throw new Error('no user id in token')

    return (async () => {

        const response = await fetch(`http://localhost:8085/users/`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        const body = await response.json()


        const { error: _error } = body

        if (_error) throw new Error(_error)

        const { name, surname, email } = body

        return { name, surname, email }
    })()
}
