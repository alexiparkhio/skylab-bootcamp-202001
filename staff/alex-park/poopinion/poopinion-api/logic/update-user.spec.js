require('dotenv').config()

const { expect } = require('chai')
const { random, floor } = Math
const { mongoose, models: { User } } = require('poopinion-data')
const updateUser = require('./update-user')
const bcrypt = require('bcryptjs')
const { env: { TEST_MONGODB_URL } } = process

describe('updateUser', () => {
    let name, surname, email, password, age, gender, _id
    const GENDERS = ['male', 'female', 'non-binary']

    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        age = floor(random() * 120)
        gender = GENDERS[floor(random() * GENDERS.length)]
    })

    describe('when the user exists', () => {
        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(password =>
                    User.create({ name, surname, email, password, age, gender })
                )
                .then(user => _id = user.id)
        )

        it('should succeed on correct user data', () =>
            User.findById(_id).lean()
                .then(user => {
                    expect(user).to.exist
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.age).to.equal(age)
                    expect(user.gender).to.equal(gender)
                })
                .then(() =>
                    updateUser(_id, { pendejada: 'maxima', name: `${name}-updated`, surname: `${surname}-updated`, email: `${email}-updated`, age: age + 1 }, password)
                )
                .then(() => User.findById(_id).lean())
                .then(user => {
                    expect(user).to.exist
                    expect(user._id.toString()).to.be.a('string')
                    expect(user.name).to.equal(`${name}-updated`)
                    expect(user.surname).to.equal(`${surname}-updated`)
                    expect(user.email).to.equal(`${email}-updated`)
                    expect(user.gender).to.equal(gender)
                    expect(user.age).to.equal(age + 1)
                    expect(user.pendejada).to.be.undefined

                    return bcrypt.compare(password, user.password)
                })
                .then(validPassword => expect(validPassword).to.be.true)
        )
    })

    describe('when the user does not exist', () => {
        beforeEach(() => User.deleteMany().then(() => { }))

        it('should fail to update if the user does not exist', () =>
            updateUser(_id, { name, surname, email }, password)
                .then(() => { throw new Error('should not reach this point') })
                .catch(({ message }) => {

                    expect(message).not.to.be.undefined
                    expect(message).to.equal(`user with id ${_id} does not exist`)
                })
                .then(() => { })
        )
    })

    describe('on wrong credentials', () => {
        beforeEach(() =>
            User.create({ name, surname, email, password, age, gender })
                .then(({ id }) => _id = id)
                .then(() => User.findByIdAndUpdate(_id, { $set: { deactivated: true } }))
                .then(() => { })
        )

        it('should fail to update if the password is wrong', () =>
            updateUser(_id, { name, surname, email }, `${password}-wrong`)
                .then(() => { throw new Error('should not reach this point') })
                .catch(({ message }) => {
                    expect(message).not.to.be.undefined
                    expect(message).to.equal(`wrong credentials`)
                })
                .then(() => { })
        )
    })

    describe('unhappy paths', () => {
        let __id
        beforeEach(() =>
            Promise.resolve(User.create({ name, surname, email, password, age, gender }))
                .then(({ id }) => {
                    _id = id
                    __id = id
                })
                .then(() => { })
        )

        it('should fail on a non-string user id', () => {
            _id = 9328743289
            expect(() => updateUser(_id, { surname, email }, password)).to.throw(TypeError, `id ${_id} is not a string`)

            _id = false
            expect(() => updateUser(_id, { surname, email }, password)).to.throw(TypeError, `id ${_id} is not a string`)

            _id = undefined
            expect(() => updateUser(_id, { surname, email }, password)).to.throw(TypeError, `id ${_id} is not a string`)

            _id = []
            expect(() => updateUser(_id, { surname, email }, password)).to.throw(TypeError, `id ${_id} is not a string`)
        })

        it('should fail on a non-object data', () => {
            data = 9328743289
            expect(() => updateUser(__id, data, password)).to.throw(TypeError, `data ${data} is not a Object`)

            data = false
            expect(() => updateUser(__id, data, password)).to.throw(TypeError, `data ${data} is not a Object`)

            data = undefined
            expect(() => updateUser(__id, data, password)).to.throw(TypeError, `data ${data} is not a Object`)

            data = 'function () { }'
            expect(() => updateUser(__id, data, password)).to.throw(TypeError, `data ${data} is not a Object`)
        })

        it('should fail on a non-string password', () => {
            password = 9328743289
            expect(() => updateUser(__id, { surname, email }, password)).to.throw(TypeError, `password ${password} is not a string`)

            password = false
            expect(() => updateUser(__id, { surname, email }, password)).to.throw(TypeError, `password ${password} is not a string`)

            password = undefined
            expect(() => updateUser(__id, { surname, email }, password)).to.throw(TypeError, `password ${password} is not a string`)

            password = []
            expect(() => updateUser(__id, { surname, email }, password)).to.throw(TypeError, `password ${password} is not a string`)
        })
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})