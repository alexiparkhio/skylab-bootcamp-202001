const { Router } = require('express')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    updateUser,
    publishToilet,
    deleteToilet,
    searchToilets,
    retrieveToilet,
    toggleFavToilet,
    retrieveFavToilets,
    publishComment,
    deleteComment,
    toggleThumbUp,
    toggleThumbDown
} = require('./handlers')
const bodyParser = require('body-parser')
const { jwtVerifierMidWare } = require('../mid-wares')
const jsonBodyParser = bodyParser.json()

const router = new Router()

router.post('/users', jsonBodyParser, registerUser)

router.post('/users/auth', jsonBodyParser, authenticateUser)

router.get('/users', jwtVerifierMidWare, retrieveUser)

router.patch('/users', [jwtVerifierMidWare, jsonBodyParser], updateUser)

router.post('/users/toilet', [jwtVerifierMidWare, jsonBodyParser], publishToilet)

router.delete('/users/toilet/:toiletId/delete', jwtVerifierMidWare, deleteToilet)

router.get('/toilets', searchToilets)

router.get('/toilets/:toiletId', retrieveToilet)

router.patch('/users/toilet/:toiletId/favorite', jwtVerifierMidWare, toggleFavToilet)

router.get('/users/favorites', jwtVerifierMidWare, retrieveFavToilets)

router.post('/users/toilet/:toiletId/comment', [jwtVerifierMidWare, jsonBodyParser], publishComment)

router.delete('/users/toilet/:toiletId/comment/:commentId/delete', jwtVerifierMidWare, deleteComment)

router.patch('/users/comment/:commentId/thumb-up', jwtVerifierMidWare, toggleThumbUp)

router.patch('/users/comment/:commentId/thumb-down', jwtVerifierMidWare, toggleThumbDown)

module.exports = router