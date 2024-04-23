import express from 'express'
import { GetAllRecipes, GetBasicRecipes, GetRecipeById } from '../controller/recipes.controller.js'
import { GetRecipeScore } from '../controller/score.controller.js'

const Router = express.Router()

Router.get('/get/all/', async (req, res) => {
    try {
        const { data, error, errorMessage, status } = await GetAllRecipes()

        if (error || status == 'Fail') throw new Error(errorMessage)

        res.json({ data })
    } catch (error) {
        res.json({
            data: null,
            error: true,
            errorMessage: error.message
        })
    }
})

Router.get('/get/:id', async (req, res) => {
    try {
        const { id } = req.params
        
        const { data, error, errorMessage, status } = await GetRecipeById(id)

        if (error || status == 'Fail') throw new Error(errorMessage)

        res.json({ data })
    } catch (error) {
        res.json({
            data: null,
            error: true,
            errorMessage: error.message
        })
    }
})


Router.get('/get/all/basic', async (req, res) => {
    try {
        const { data, error, errorMessage, status } = await GetBasicRecipes()

        if (error || status == 'Fail') throw new Error(errorMessage)

        res.json({ data })
    } catch (error) {
        res.json({
            data: null,
            error: true,
            errorMessage: error.message
        })
    }
})


Router.get('/get/all/score/:id', async (req, res) => {
    try {

        const { id } = req.params

        const response = await GetRecipeScore(id)

        if (response.error || response.status == 'Fail') throw new Error(response.error)

        res.json(response)
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