import updateComment from './update-comment'
const { mongoose, models: { User, Toilet, Comment } } = require('poopinion-data')
const { random, floor } = Math
const jwt = require('jsonwebtoken')
const atob = require('atob')
const { NotFoundError, NotAllowedError } = require('../errors')

describe('updateComment', () => {
    let name, surname, email, password, age, gender, place, latitude, rating, rating2, rating3, longitude, latitudeDelta, longitudeDelta, coordinates, _id, _toiletId, token, _commentId
    const GENDERS = ['male', 'female', 'non-binary']

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test-poopinion', { useNewUrlParser: true, useUnifiedTopology: true })

        await User.deleteMany()
        await Toilet.deleteMany()
        await Comment.deleteMany()
    })

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        age = floor(random() * 100)
        gender = GENDERS[floor(random() * GENDERS.length)]
        place = `place-${random()}`
        latitudeDelta = random()
        longitudeDelta = random()
        latitude = random()
        longitude = random()
        coordinates = { latitude, longitude, latitudeDelta, longitudeDelta }
        rating = {
            rating: {
                cleanness: random() * 5,
                looks: random() * 5,
                multipleToilets: random() * 2,
                paperDeployment: random() * 2,
                paymentRequired: random() * 2,
                overallRating: random() * 5,
                textArea: `opinion-${random()}`
            }
        }
        rating2 = {
            rating: {
                cleanness: random() * 5,
                looks: random() * 5,
                multipleToilets: random() * 2,
                paperDeployment: random() * 2,
                paymentRequired: random() * 2,
                overallRating: random() * 5,
                textArea: `opinion-${random()}`
            }
        }
        rating3 = {
            rating: {
                cleanness: random() * 5,
                looks: random() * 5,
                multipleToilets: random() * 2,
                paperDeployment: random() * 2,
                paymentRequired: random() * 2,
                overallRating: random() * 5,
                textArea: `opinion-${random()}`
            }
        }
    })

    describe('happy paths', () => {

        it('should successfully update a comment that has already been posted', async () => {
            let user = await User.create({ name, surname, email, password, age, gender });
            _id = user.id
            token = jwt.sign({ sub: _id }, '👌', { expiresIn: '1d' })

            let toilet = await Toilet.create({ publisher: _id, place, coordinates })
            _toiletId = toilet.id

            let comment = await Comment.create({ place, publisher: _id, commentedAt: _toiletId, rating })
            _commentId = comment.id
            await User.findByIdAndUpdate(_id, { $push: { comments: _commentId } })
            await Toilet.findByIdAndUpdate(_toiletId, { $push: { comments: _commentId } })

            let update = await updateComment(token, _commentId, rating2)
            expect(update).toBeUndefined()

            toilet = await Toilet.findById(_toiletId).populate('comments')
            user = await User.findById(_id).lean()

            expect(toilet.comments).toBeInstanceOf(Array)
            expect(toilet.comments.length).toBe(1)
            expect(toilet.comments[0].publisher.toString()).toMatch(_id)
            expect(toilet.comments[0].rating).toBeInstanceOf(Object)
            expect(toilet.comments[0].rating.cleanness).toBe(rating2.rating.cleanness)
            expect(toilet.comments[0].rating.multipleToilets).toBe(rating2.rating.multipleToilets)
            expect(toilet.comments[0].rating.looks).toBe(rating2.rating.looks)
            expect(toilet.comments[0].rating.paperDeployment).toBe(rating2.rating.paperDeployment)
            expect(toilet.comments[0].rating.paymentRequired).toBe(rating2.rating.paymentRequired)
            expect(toilet.comments[0].rating.overallRating).toBe(rating2.rating.overallRating)
            expect(toilet.comments[0].rating.textArea).toBe(rating2.rating.textArea)

            expect(user.comments).toBeInstanceOf(Array)
            expect(user.comments.length).toBe(1)
            expect(user.comments[0].toString()).toMatch(_commentId.toString())

            update = await updateComment(token, _commentId, rating3)

            toilet = await Toilet.findById(_toiletId).populate('comments')
            user = await User.findById(_id).lean()

            expect(toilet.comments).toBeInstanceOf(Array)
            expect(toilet.comments.length).toBe(1)
            expect(toilet.comments[0].publisher.toString()).toMatch(_id)
            expect(toilet.comments[0].rating).toBeInstanceOf(Object)
            expect(toilet.comments[0].rating.cleanness).toBe(rating3.rating.cleanness)
            expect(toilet.comments[0].rating.multipleToilets).toBe(rating3.rating.multipleToilets)
            expect(toilet.comments[0].rating.looks).toBe(rating3.rating.looks)
            expect(toilet.comments[0].rating.paperDeployment).toBe(rating3.rating.paperDeployment)
            expect(toilet.comments[0].rating.paymentRequired).toBe(rating3.rating.paymentRequired)
            expect(toilet.comments[0].rating.overallRating).toBe(rating3.rating.overallRating)
            expect(toilet.comments[0].rating.textArea).toBe(rating3.rating.textArea)
        })

        it('should fail to toggle/untoggle if the user is deactivated', async () => {
            await User.findByIdAndUpdate(_id, { $set: { deactivated: true } })

            let _error

            try {
                await updateComment(token, _commentId, rating)
            } catch (error) {
                _error = error
            }
            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(Error)
            const userId = JSON.parse(atob(token.split('.')[1])).sub
            expect(_error.message).toEqual(`user with id ${userId} is deactivated`)
        })

        it('should fail to toggle thumb up on an invalid token', async () => {
            let _error
            try {
                await updateComment(`${token}-wrong`, _commentId, rating)
            } catch (error) {
                _error = error
            }

            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(Error)
            expect(_error.message).toBe('invalid signature')
        })

        it('should fail to toggle thumb up if the user does not exist', async () => {
            await User.deleteMany()

            let _error
            try {
                await updateComment(token, _commentId, rating)
            } catch (error) {
                _error = error
            }
            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(NotFoundError)
            const userId = JSON.parse(atob(token.split('.')[1])).sub
            expect(_error.message).toBe(`user with id ${userId} does not exist`)
        })

        it('should fail to toggle thumb up if the comment does not exist', async () => {
            let user = await User.create({ name, surname, email, password, age, gender });
            _id = user.id
            token = jwt.sign({ sub: _id }, '👌', { expiresIn: '1d' })
            await Comment.deleteMany()

            let _error
            try {
                await updateComment(token, _commentId, rating)
            } catch (error) {
                _error = error
            }
            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(NotFoundError)
            expect(_error.message).toBe(`comment with id ${_commentId} does not exist`)
        })

    })

    describe('unhappy paths', () => {
        it('should fail on a non string token', () => {
            token = 45438
            expect(() => updateComment(token, _commentId, rating)).toThrow(`token ${token} is not a string`)

            token = {}
            expect(() => updateComment(token, _commentId, rating)).toThrow(`token ${token} is not a string`)

            token = false
            expect(() => updateComment(token, _commentId, rating)).toThrow(`token ${token} is not a string`)

            token = [1, 2, 3]
            expect(() => updateComment(token, _commentId, rating)).toThrow(`token ${token} is not a string`)

            token = undefined
            expect(() => updateComment(token, _commentId, rating)).toThrow(`token is empty`)
        })

        it('should fail on a non-string comment ID', () => {
            token = 'some token'
            _commentId = 45438
            expect(() => updateComment(token, _commentId, rating)).toThrow(`commentId ${_commentId} is not a string`)

            _commentId = {}
            expect(() => updateComment(token, _commentId, rating)).toThrow(`commentId ${_commentId} is not a string`)

            _commentId = false
            expect(() => updateComment(token, _commentId, rating)).toThrow(`commentId ${_commentId} is not a string`)

            _commentId = [1, 2, 3]
            expect(() => updateComment(token, _commentId, rating)).toThrow(`commentId ${_commentId} is not a string`)

            _commentId = undefined
            expect(() => updateComment(token, _commentId, rating)).toThrow(`commentId is empty`)
        })

        it('should fail on a non-object rating', () => {
            token = 'some token'
            _commentId = 'some comment id'
            rating = 45438
            expect(() => updateComment(token, _commentId, rating)).toThrow(`rating ${rating} is not a Object`)

            rating = 'some string'
            expect(() => updateComment(token, _commentId, rating)).toThrow(`rating ${rating} is not a Object`)

            rating = false
            expect(() => updateComment(token, _commentId, rating)).toThrow(`rating ${rating} is not a Object`)
         
            rating = undefined
            expect(() => updateComment(token, _commentId, rating)).toThrow(`rating ${rating} is not a Object`)
        })
    })

    afterAll(async () => {
        await User.deleteMany()
        await Toilet.deleteMany()
        await Comment.deleteMany()
        await mongoose.disconnect()
    })
})