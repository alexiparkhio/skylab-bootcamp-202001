const { retrieveLastEvents } = require('../logic')
module.exports = (req, res) => {
    try {
        retrieveLastEvents().then(events => {
            res.status(200).json(events)
        }).catch(({ message }) => {
            res.status(409).json({ error: message })
        })
    } catch ({ message }) {
        res.status(409).json({ error: message })
    }
}