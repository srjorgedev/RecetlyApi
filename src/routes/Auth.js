import express from "express"
import LogIn from "../controller/auth.controller.js"

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

Router.post('/signup', async (req, res) => {
    try {
        const { name, username, lastname, img, email, password } = req.body

        
    } catch (error) {

    }
})

export default Router