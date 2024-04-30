import express from "express"
import LogIn, { GetUser } from "../controllers/auth.controller.js"
import FormatUserData from "../functions/user.format.js"
import { UploadImageWithoutBuffer } from "../controllers/image.controller.js"
import { SignUp } from "../controllers/auth.controller.js"

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
                user: FormatUserData(data),
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
        let url

        if (!img || !img.base64 || img.base64 === "" || img.base64.length < 1) {
            url = 'https://ik.imagekit.io/uv3u01crv/User_default.webp'
        } else {
            const buffer = Buffer.from(img.base64, 'base64')
            url = await UploadImageWithoutBuffer(buffer, img.fileName)
        }

        const { data, error, errorMessage, status } = await SignUp(username, name, lastname, url, password, email)
        if (error) throw new Error(errorMessage)

        res.json({
            status,
            data,
            error,
            errorMessage
        })
    } catch (error) {
        res.json({
            status: 'Fail',
            data: null,
            error: true,
            errorMessage: error.message
        })
    }
})

export default Router