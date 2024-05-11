import express from "express"
import LogIn, { GetUser } from "../controllers/auth.controller.js"
import FormatUserData from "../services/user.format.js"
import { uploadSingleImage } from "../controllers/image.controller.js"
import { SignUp } from "../controllers/auth.controller.js"
import multer from "multer"

const Router = express.Router()

const storage = multer.memoryStorage()
const uploads = multer({
    storage: storage,
    preservePath: true
})

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

Router.post('/signup', uploads.single('img'), async (req, res) => {
    try {
        const { name, username, lastname, email, password } = req.body

        var url
        if (!req.file) {
            url = 'https://ik.imagekit.io/uv3u01crv/User_default.webp'
        } else {
            url = await uploadSingleImage(req.file)
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