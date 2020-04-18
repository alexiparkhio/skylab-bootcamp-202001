const {validate} = require('events-utils')
const { models: { User, Event }} = require('../data')
const {NotFoundError} = require('events-errors')



module.exports = (idUser, idEvent) =>{
    validate.string(idUser, 'idUser')
    validate.string(idEvent, 'idEvent')

    // const _idUser = ObjectId(idUser)
    // const _idEvent = ObjectId(idEvent)

    return Event.find({id: idEvent})
        .then(event => {
            if (!event) throw new NotFoundError('event not found')
            return User.find({_id: ObjectId(_idUser), subscribeEvent: _idEvent })
                .then(result =>{
                    if(result.length === 0)
                        return User.updateOne({_id: ObjectId(_idUser)}, {$push: {subscribeEvent: _idEvent}})
                            .then(eventSubscribe =>{
                                return User.findOne({_id: ObjectId(_idUser)})
                            })
                    else throw new NotFoundError('you already subscribe in this event')
                })
                        
        })
    }
