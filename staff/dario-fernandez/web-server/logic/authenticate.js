function authenticate(username, password) {
    const access = users.some(function(element) {
        return element.username === username && element.password === password
    })

    if(!access) {
        throw new Error('Wrong credentials')
    }
}