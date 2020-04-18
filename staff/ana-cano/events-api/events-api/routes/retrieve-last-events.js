const {NotFoundError} = require('../errors')
const {retrieveLastEvents} = require('../logic')

module.exports = (req, res) => {
//const {body: {date}} = req

try{
    
    retrieveLastEvents()
    .then(events=> {
        res.status(200).json(events)
    })
    .catch(({message}) => {
        res
            .status(401)
            .json({error: message})
    })
}

catch(error){
    const { message } = error
    res.status(404)
    .json({error: message})
    
}
}