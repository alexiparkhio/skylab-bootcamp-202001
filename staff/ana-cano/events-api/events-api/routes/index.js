module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    createEvent: require('./create-event'),
    retrievePublishedEvents: require('./retrieve-published-events'),
    retrieveLastEvents: require('./retrieve-last-events'),
    subscribeEvent: require('./subscribe-event'),
    deleteEvents: require('./delete-events')
}