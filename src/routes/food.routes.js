import express from 'express'
import { GetTag, GetType, GetUnit } from '../controllers/food.controller.js'

const Router = express.Router()

Router.get('/get/tag', async (req, res) => {
    try {
        const { data, error, errorMessage, status } = await GetTag()
        if (error) throw new Error(errorMessage)

        return res.json({
            status, data, error, errorMessage
        })
    } catch (error) {
        return res.json({
            status: 'Fail',
            data: null,
            error: true,
            errorMessage: error.message
        })
    }
})

Router.get('/get/type', async (req, res) => {
    try {
        const { data, error, errorMessage, status } = await GetType()
        if (error) throw new Error(errorMessage)

        return res.json({
            status, data, error, errorMessage
        })
    } catch (error) {
        return res.json({
            status: 'Fail',
            data: null,
            error: true,
            errorMessage: error.message
        })
    }
})

Router.get('/get/unit', async (req, res) => {
    try {
        const { data, error, errorMessage, status } = await GetUnit()
        if (error) throw new Error(errorMessage)

        return res.json({
            status, data, error, errorMessage
        })
    } catch (error) {
        return res.json({
            status: 'Fail',
            data: null,
            error: true,
            errorMessage: error.message
        })
    }
})


export default Router