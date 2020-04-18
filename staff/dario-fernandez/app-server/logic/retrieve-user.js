const fetch = require('../utils/fetch')

function retrieveUser(token) {

    return fetch(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            const { name, surname, username, error } = JSON.parse(response.content)

            if(error) throw new Error(error)

            return { name, surname, username }
        })
}

module.exports = retrieveUser