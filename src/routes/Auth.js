import express from "express"
import LogIn, { GetUser } from "../controller/auth.controller.js"

const Router = express.Router()

Router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const { error, login, errorMessage, status, id } = await LogIn(email, password)

        res.json({
            status,
            login,
            error,
            errorMessage,
            id
        })

    } catch (error) {
        res.json({
            status: 'Fail',
            login: null,
            error: true,
            errorMessage: error.message,
            id: null
        })
    }
})

Router.get('/get/:id', async (req, res) => {
    try {
        const { id } = req.params

        const { data, error, errorMessage, status } = await GetUser(id)
        if (error || status == 'Fail') throw new Error(errorMessage)

        res.json(
            {
                status,
                data,
                error,
                errorMessage
            }
        )
    } catch (error) {
        res.json(
            {
                status: 'Fail',
                data: null,
                error: true,
                errorMessage: error
            }
        )
    }
})

Router.post('/signup', async (req, res) => {
    try {
        const { name, username, lastname, img, email, password } = req.body


    } catch (error) {

    }
})

export default Router