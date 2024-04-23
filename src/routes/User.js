import express from "express"
import { GetUserData } from "../controller/user.controller.js"

const Router = express.Router()

Router.get('/get/public/data/:id', async (req, res) => {
    try {
        const { id } = req.params

        if (id === "" || id === null || id === undefined || id === '') throw new Error('Debes proporcionar el id del usuario')

        const { data, error, errorMessage, status } = await GetUserData(id)

        if (error || status === 'Fail') throw new Error(errorMessage)

        res.json({
            status,
            error,
            errorMessage,
            data
        })

    } catch (error) {
        res.json({
            status: 'Fail',
            error: true,
            errorMessage: error.message,
            data: null
        })
    }
})

export default Router