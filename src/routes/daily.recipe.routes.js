import express from 'express'
import { GetRandomRecipe } from '../controllers/recipes.controller.js'
import FormatBasicRecipes from '../services/recipe.basic.format.js'

const Router = express.Router()

let lastDailyRecipe = null

Router.get('/get/daily', async (req, res) => {
    try {
        let data = null
        const currentTime = new Date()

        if (lastDailyRecipe && currentTime - new Date(lastDailyRecipe.date) < 12 * 60 * 60 * 1000) {
            data = lastDailyRecipe.data
        } else {
            let retries = 3

            while (retries > 0) {
                const result = await GetRandomRecipe()
                if (!result.error) {
                    data = result.data
                    break
                }
                retries--
            }

            if (!data) {
                data = lastDailyRecipe ? lastDailyRecipe.data : null
            } else {
                lastDailyRecipe = {
                    date: currentTime.toISOString(),
                    data: data
                }
            }
        }

        const nextRecipeChangeTime = new Date(lastDailyRecipe.date)
        nextRecipeChangeTime.setHours(nextRecipeChangeTime.getHours() + 12) 
        const timeRemaining = nextRecipeChangeTime - currentTime

        const recipe = await FormatBasicRecipes([data])

        res.json({
            recipe: recipe[0],
            countdown: timeRemaining < 0 ? '¡Es hora de cambiar la receta!' : formatTimeRemaining(timeRemaining)
        })
    } catch (error) {
        res.json({
            status: 'Error',
            error: true,
            errorMessage: error.message,
            data: 'Hubo un error al cargar la receta del día'
        })
    }
})

function formatTimeRemaining(time) {
    const hours = Math.floor(time / (60 * 60 * 1000))
    const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000))
    return `${hours} horas y ${minutes} minutos`
}

export default Router
