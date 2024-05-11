import express from 'express'
import multer from "multer"
import { uploadSingleImage } from '../controllers/image.controller.js'
import { UpdateUserData } from "../controllers/user.controller.js"

const Router = express.Router()

const storage = multer.memoryStorage()
const uploads = multer({
    storage: storage,
    preservePath: true
})

Router.post('/update/profile/:id', uploads.single('img'), async (req, res) => {
    try {
        const { username, name, lastname, description, color, email } = req.body
        const { id } = req.params
        const img = req.file

        if (!img && !username && !name && !lastname && !description && !color && !email) throw new Error('No hay datos para actualizar')

        var url
        if (!req.file) {
            url = ""
        } else {
            url = await uploadSingleImage(req.file)
        }

        const updates = {
            user_name: name,
            user_username: username,
            user_last_name: lastname,
            user_description: description,
            user_color: color,
            user_pfp: url,
            user_email: email
        }

        const filteredUpdates = Object.fromEntries(
            Object.entries(updates).filter(([_, value]) => value !== "" && value !== undefined)
        )

        const { status, error, errorMessage, message } = await UpdateUserData(id, filteredUpdates)

        if (error || status == 'Fail') throw new Error(errorMessage)

        res.json(
            {
                status: status,
                message: message,
                error: false,
                errorMessage: null
            }
        )
    } catch (error) {
        res.json({
            status: 'Fail',
            message: 'Los datos no se pudieron actualizar',
            error: true,
            errorMessage: error.message
        })
    }
})

export default Router