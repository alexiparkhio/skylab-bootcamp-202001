const { deleteToilet } = require('../../logic')
const { NotAllowedError, NotFoundError } = require('poopinion-errors')

module.exports = (req, res) => {
    const { params: { id, toiletId } } = req

    try {
        deleteToilet(id, toiletId)
            .then(() => res.status(200).end())
            .catch(error => {
                let status = 400

                if (error instanceof NotFoundError)
                    status = 404

                if (error instanceof NotAllowedError)
                    status = 409 // conflict

                const { message } = error

                res
                    .status(status)
                    .json({
                        error: message
                    })
            })
    } catch (error) {
        let status = 400

        if (error instanceof NotFoundError)
            status = 404

        if (error instanceof TypeError)
            status = 406 // not acceptable

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}