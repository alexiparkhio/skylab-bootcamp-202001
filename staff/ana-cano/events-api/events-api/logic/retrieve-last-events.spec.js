require('dotenv').config()

const mongoose = require('mongoose')
const {expect} = require('chai')
const retrieveLastEvents = require('./retrieve-last-events')
const { models: {User, Event}} = require('../data')

const { env: { TEST_MONGODB_URL } } = process

describe('retrieveLastEvents', ()=>{
    before(()=> 
    mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    )
    
    beforeEach(()=>{
        return User.create({name: "Pepito", surname: "Grillo", email: "fulanito@gmail.com", password: "321"})
            .then (({id}) => id)
            .then((publisher)=> {

                let event = { "title" : "Concert la Rosalía", "description": "Ufffff", "location":"Spain", "date": "04/03/2021", publisher }
                let event2 = { "title" : "Mirar el fútbol", "description": "Bernabeu", "location":"França", "date": "05/03/2021", publisher}
                let event3 = { "title" : "Final projecte", "description": "Vull sortir de casa", "location":"A casa", "date": "06/03/2021", publisher }
                return Event.insertMany([event, event2, event3])
                    .then(()=>{
                    
                    })
            })


    })

    describe('in case there are existing events ', ()=>{
        it('should return events in reverse order', ()=>{
            retrieveLastEvents()
            .then(events=> {})
        })
    })
    after(() => database.disconnect())
})