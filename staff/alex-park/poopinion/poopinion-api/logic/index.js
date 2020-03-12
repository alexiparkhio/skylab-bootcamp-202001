module.exports = {
    authenticateUser: require('./authenticate-user'),
    registerUser: require('./register-user'),
    retrieveUser: require('./retrieve-user'),
    updateUser: require('./update-user'),
    publishToilet: require('./publish-toilet'),
    updateToilet: require('./update-toilet'),
    deleteToilet: require('./delete-toilet'),
    searchToilets: require('./search-toilets'),
    retrieveToilet: require('./retrieve-toilet'),
    toggleFavToilet: require('./toggle-fav-toilet'),
    retrieveFavToilets: require('./retrieve-fav-toilets'),
    publishComment: require('./publish-comment'),
    updateComment: require('./update-comment'),
    deleteComment: require('./delete-comment'),
    toggleThumbUp: require('./toggle-thumb-up'),
    toggleThumbDown: require('./toggle-thumb-down')
}