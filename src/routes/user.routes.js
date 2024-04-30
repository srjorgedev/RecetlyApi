import express from "express"
import { GetUserData, UpdateUserData, DeleteUser } from "../controllers/user.controller.js"
import { DeleteFavoriteRecipe, GetUserFavoriteCheck, GetUserFavoriteRecipes, SetFavoriteRecipe } from "../controllers/favorites.controller.js"

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

Router.get('/get/all/favorites/:id', async (req, res) => {
    try {
        const { id } = req.params
        if (id === "" || id === null || id === undefined || id === '') throw new Error('Debes proporcionar el id del usuario')

        const { data, error, errorMessage, status } = await GetUserFavoriteRecipes(id)

        if (error) throw new Error(errorMessage)

        res.json({
            data,
            status,
            error,
            errorMessage
        })
    } catch (error) {
        res.json({
            data: null,
            status: 'Fail',
            error: true,
            errorMessage: error.message
        })
    }
})

Router.get('/get/check/favorite/:user_id/recipe/:recipe_id', async (req, res) => {
    try {
        const { user_id, recipe_id } = req.params
        if (user_id === "" || user_id === null || user_id === undefined || user_id === '') throw new Error('Debes proporcionar el id del usuario')
        if (recipe_id === "" || recipe_id === null || recipe_id === undefined || recipe_id === '') throw new Error('Debes proporcionar el id de la receta')

        const { data, error, status, errorMessage } = await GetUserFavoriteCheck(recipe_id, user_id)

        res.json({
            data,
            status,
            error,
            errorMessage
        })
    } catch (error) {
        res.json({
            data: null,
            status: 'Fail',
            error: true,
            errorMessage: error.message
        })
    }
})


Router.post('/post/favorite/:user_id/recipe/:recipe_id', async (req, res) => {
    try {
        const { user_id, recipe_id } = req.params
        if (user_id === "" || user_id === null || user_id === undefined || user_id === '') throw new Error('Debes proporcionar el id del usuario')
        if (recipe_id === "" || recipe_id === null || recipe_id === undefined || recipe_id === '') throw new Error('Debes proporcionar el id de la receta')

        const { data, error, status, errorMessage } = await SetFavoriteRecipe(user_id, recipe_id)

        res.json(
            {
                data,
                error,
                status,
                errorMessage
            }
        )
    } catch (error) {

    }
})

Router.post('/delete/favorite/:user_id/recipe/:recipe_id', async (req, res) => {
    try {
        const { user_id, recipe_id } = req.params
        if (user_id === "" || user_id === null || user_id === undefined || user_id === '') throw new Error('Debes proporcionar el id del usuario')
        if (recipe_id === "" || recipe_id === null || recipe_id === undefined || recipe_id === '') throw new Error('Debes proporcionar el id de la receta')

        const { data, error, status, errorMessage } = await DeleteFavoriteRecipe(user_id, recipe_id)

        res.json(
            {
                data,
                error,
                status,
                errorMessage
            }
        )
    } catch (error) {

    }
})

Router.post('/update/profile/:id', async (req, res) => {
    try {
        const { img, username, name, lastname, description, color, email } = req.body
        const { id } = req.params

        if (!img && !username && !name && !lastname && !description && !color && !email) throw new Error('No hay datos para actualizar')

        var url
        if (!img || !img.base64 || img.base64 === "" || img.base64.length < 1) {
            url = ""
        } else {
            const buffer = Buffer.from(img.base64, 'base64')
            url = await UploadImageWithoutBuffer(buffer, img.fileName)
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

Router.post('/delete/profile/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { password } = req.body
        if (!password) throw new Error('La contraseña debe ser proporcionada')

        const { data, error, errorMessage, status } = await DeleteUser(id, password)
        if (error) throw new Error(errorMessage)

        return res.json({
            status, 
            data,
            error,
            errorMessage
        })

    } catch (error) {
        res.json({
            status: 'Fail',
            message: 'No se pudo eliminar la cuenta',
            error: true,
            errorMessage: error.message
        })
    }
})

export default Router