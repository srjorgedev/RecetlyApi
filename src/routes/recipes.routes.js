import express from 'express'
import { CreateRecipe, DeleteRecipe, GetAllRecipes, GetBasicRecipes, GetRecipeById, UpdateRecipe } from '../controllers/recipes.controller.js'
import { GetRecipeScore } from '../controllers/score.controller.js'
import { DeleteComment, PostComment, UpdateComment } from '../controllers/coment.controller.js'

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
        if (id == "" || id == null || id == undefined) {
            res.json({
                status: 'Fail',
                error: true,
                errorMessage: 'El id de la receta debe ser proporcionado -> /score/_id',
                data: null
            })
        }
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

Router.post('/delete/:recipe_id/:user_id', async (req, res) => {
    try {
        const { recipe_id, user_id } = req.params
        const { data, error, errorMessage, status } = await DeleteRecipe(recipe_id, user_id)

        if (error) throw new Error(errorMessage)

        return res.json({
            data, error, status, errorMessage
        })
    } catch (error) {
        return res.json({
            data: 'No se pudo eliminar la receta',
            error: true,
            status: 'Fail',
            errorMessage: error.message
        })

    }
})

Router.post('/post/comment/:recipe_id/:user_id', async (req, res) => {
    try {
        const { recipe_id, user_id } = req.params
        const { comment } = req.body

        if (recipe_id == "" || recipe_id == null) throw new Error('El id de la receta debe ser proporcionado')
        if (user_id == "" || user_id == null) throw new Error('El id del usuario debe ser proporcionado')
        if (comment == "" || comment == null) throw new Error('El comentario no puede estar vacio')

        const { data, error, errorMessage, status } = await PostComment(comment, user_id, recipe_id)

        if (error) throw new Error(errorMessage)

        res.json({
            data,
            error,
            status,
            errorMessage
        })
    } catch (error) {
        res.json({
            data: null,
            error: true,
            status: 'Fail',
            errorMessage: error.message
        })
    }
})

Router.post('/update/comment/:comment_id', async (req, res) => {
    try {
        const { comment_id } = req.params
        const { comment } = req.body

        if (comment_id == "" || comment_id == null) throw new Error('El id del comentario debe ser proporcionado')
        if (comment == "" || comment == null) throw new Error('El comentario no puede estar vacio')

        const { data, error, errorMessage, status } = await UpdateComment(comment, comment_id)

        if (error) throw new Error(errorMessage)

        res.json({
            data,
            error,
            status,
            errorMessage
        })
    } catch (error) {
        res.json({
            data: null,
            error: true,
            status: 'Fail',
            errorMessage: error.message
        })
    }
})

Router.post('/delete/comment/:comment_id/:user_id', async (req, res) => {
    try {
        const { comment_id, user_id } = req.params
        if (comment_id == "" || comment_id == null) throw new Error('El id del comentario debe ser proporcionado')
        if (user_id == "" || user_id == null) throw new Error('El id del usuario debe ser proporcionado')

        const { data, error, errorMessage, status } = await DeleteComment(user_id, comment_id)
        res.json({
            data,
            error,
            status,
            errorMessage
        })
    } catch (error) {
        res.json({
            data: null,
            error: true,
            status: 'Fail',
            errorMessage: error.message
        })
    }
})

Router.post('/post/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params

        const variables = [
            "recipeName",
            "recipeType",
            "recipeTag",
            "recipeTime",
            "recipeTimeUnit",
            "recipeIngredient",
            "recipeIngredientUnit",
            "recipeIngredientUnitCount",
            "recipeSteps",
            "recipeDescription",
            "Img"
        ]

        variables.forEach(variable => {
            if (!req.body[variable]) {
                throw new Error(`No puedes dejar ${variable} sin datos`)
            }
        })

        var { recipeName, recipeType, recipeTag, recipeTime, recipeTimeUnit, recipeIngredient, recipeIngredientUnit,
            recipeIngredientUnitCount, recipeSteps, recipeDescription, Img } = req.body

        recipeIngredient = Array.isArray(recipeIngredient) ? recipeIngredient : [recipeIngredient]
        recipeIngredientUnitCount = Array.isArray(recipeIngredientUnitCount) ? recipeIngredientUnitCount : [recipeIngredientUnitCount]
        recipeIngredientUnit = Array.isArray(recipeIngredientUnit) ? recipeIngredientUnit : [recipeIngredientUnit]
        recipeTag = Array.isArray(recipeTag) ? recipeTag : [recipeTag]
        recipeType = Array.isArray(recipeType) ? recipeType : [recipeType]
        recipeTime = Array.isArray(recipeTime) ? recipeTime : [recipeTime]
        recipeSteps = Array.isArray(recipeSteps) ? recipeSteps : [recipeSteps]
        recipeTimeUnit = Array.isArray(recipeTimeUnit) ? recipeTimeUnit : [recipeTimeUnit]

        var url
        if (!Img || !Img.base64 || Img.base64 === "" || Img.base64.length < 1) {
            url = ""
        } else {
            const buffer = Buffer.from(Img.base64, 'base64')
            url = await UploadImageWithoutBuffer(buffer, Img.fileName)
        }

        const recipe = {
            user_id: user_id,
            recipe_name: recipeName,
            recipe_description: recipeDescription,
            recipe_tag: recipeTag,
            recipe_type: recipeType,
            recipe_time: recipeTime,
            recipe_steps: recipeSteps,
            recipe_ingredients: recipeIngredient,
            recipe_time_unit: recipeTimeUnit,
            recipe_ingredient_amount: recipeIngredientUnitCount,
            recipe_ingredient_unit: recipeIngredientUnit,
            recipe_img: url
        }

        const { data, error, errorMessage, status } = await CreateRecipe(recipe)
        if (error) throw new Error(errorMessage)

        return res.json({
            data,
            status,
            error,
            errorMessage
        })
    } catch (error) {
        return res.json({
            error: true,
            errorMessage: error.message,
            data: null,
            status: 'Fail'
        })
    }
})

Router.post('/update/:recipe_id/:user_id', async (req, res) => {
    try {
        const { user_id, recipe_id } = req.params

        var { recipeName, recipeType, recipeTag, recipeTime, recipeTimeUnit, recipeIngredient, recipeIngredientUnit,
            recipeIngredientUnitCount, recipeSteps, recipeDescription, Img } = req.body

        recipeIngredient = Array.isArray(recipeIngredient) ? recipeIngredient : [recipeIngredient]
        recipeIngredientUnitCount = Array.isArray(recipeIngredientUnitCount) ? recipeIngredientUnitCount : [recipeIngredientUnitCount]
        recipeIngredientUnit = Array.isArray(recipeIngredientUnit) ? recipeIngredientUnit : [recipeIngredientUnit]
        recipeTag = Array.isArray(recipeTag) ? recipeTag : [recipeTag]
        recipeType = Array.isArray(recipeType) ? recipeType : [recipeType]
        recipeTime = Array.isArray(recipeTime) ? recipeTime : [recipeTime]
        recipeSteps = Array.isArray(recipeSteps) ? recipeSteps : [recipeSteps]
        recipeTimeUnit = Array.isArray(recipeTimeUnit) ? recipeTimeUnit : [recipeTimeUnit]

        var url
        if (!Img || !Img.base64 || Img.base64 === "" || Img.base64.length < 1) {
            url = ""
        } else {
            const buffer = Buffer.from(Img.base64, 'base64')
            url = await UploadImageWithoutBuffer(buffer, Img.fileName)
        }

        const recipe = {
            recipe_name: recipeName,
            recipe_description: recipeDescription,
            recipe_tag: recipeTag,
            recipe_type: recipeType,
            recipe_time: recipeTime,
            recipe_steps: recipeSteps,
            recipe_ingredients: recipeIngredient,
            recipe_time_unit: recipeTimeUnit,
            recipe_ingredient_amount: recipeIngredientUnitCount,
            recipe_ingredient_unit: recipeIngredientUnit,
            recipe_img: url
        }

        const filterUpdate = Object.fromEntries(
            Object.entries(recipe).filter(([_, value]) => value !== "" && value !== undefined && !Array.isArray(value) && !value.includes(undefined))
        )
        const { data, error, errorMessage, status } = await UpdateRecipe(filterUpdate, recipe_id, user_id)
        
        if (error) throw new Error(errorMessage)

        return res.json({
            data,
            status,
            error,
            errorMessage
        })
    } catch (error) {
        return res.json({
            error: true,
            errorMessage: error.message,
            data: null,
            status: 'Fail'
        })
    }
})


export default Router