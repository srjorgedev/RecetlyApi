import { Supabase } from "../database/Connection.js"

export async function GetUserFavoriteRecipes(id) {
    try {
        const { data, error } = await Supabase
            .from('user_basic_favorites')
            .select('recipes_id')
            .eq('user_id', id)

        if (error) throw new Error(error.message)
        if (data[0].recipes_id == [] || data[0].recipes_id == null) {
            return {
                status: 'Ok',
                data: 'El usuario no tiene recetas favoritas',
                error: false,
                errorMessage: null
            }
        }

        return {
            status: 'Ok',
            data: data[0].recipes_id,
            error: false,
            errorMessage: null
        }
    } catch (error) {
        return {
            status: 'Fail',
            data: null,
            error: true,
            errorMessage: error.message
        }
    }
}

export async function GetUserFavoriteCheck(recipeId, userId) {
    try {
        const { data, error } = await Supabase
            .from('user_basic_favorites')
            .select('recipes_id')
            .eq('user_id', userId)

        if (error) throw new Error(error.message)
        if (data[0].recipes_id == [] || data[0].recipes_id == null) {
            return {
                status: 'Ok',
                data: 'El usuario no tiene recetas favoritas',
                error: false,
                errorMessage: null
            }
        }

        if (!data[0].recipes_id.includes(recipeId)) {
            return {
                status: 'Ok',
                data: 'La receta no esta agregada como favorita',
                error: false,
                errorMessage: null
            }
        }

        return {
            status: 'Ok',
            data: 'La receta esta agregada como favorita',
            error: false,
            errorMessage: null
        }
    } catch (error) {
        return {
            status: 'Fail',
            data: 'Ha ocurrido un error',
            error: true,
            errorMessage: error.message
        }
    }
}

export async function SetFavoriteRecipe(userId, recipeId) {
    try {
        const { data, error } = await Supabase
            .from('user_basic_favorites')
            .select('recipes_id')
            .eq('user_id', userId)

        if (error) throw new Error(error.message)
        if (data.length > 0 && data[0].recipes_id && data[0].recipes_id.includes(recipeId)) {
            return {
                status: 'Ok',
                data: 'La receta ya está agregada como favorita',
                error: false,
                errorMessage: null
            }
        }

        let recipes = data.length > 0 && data[0].recipes_id ? [...data[0].recipes_id] : []

        recipes.push(recipeId)

        const { data: setData, error: setError } = await Supabase
            .from('user_basic_favorites')
            .upsert({
                user_id: userId,
                recipes_id: recipes
            })

        if (setError) throw new Error(setError.message)

        return {
            status: 'Ok',
            data: 'Receta agregada a favoritos',
            error: false,
            errorMessage: null
        }
    } catch (error) {
        return {
            status: 'Fail',
            data: 'Hubo un error al agregar la receta a favoritos',
            error: true,
            errorMessage: error.message
        }
    }
}

export async function DeleteFavoriteRecipe(userId, recipeId) {
    try {
        const { data, error } = await Supabase
            .from('user_basic_favorites')
            .select('recipes_id')
            .eq('user_id', userId)

        if (error) throw new Error(error.message)
        if (data.length > 0 && data[0].recipes_id && !(data[0].recipes_id.includes(recipeId))) {
            return {
                status: 'Ok',
                data: 'La receta no está agregada como favorita',
                error: false,
                errorMessage: null
            }
        }

        let recipes = data[0].recipes_id.filter(recipe => recipe != recipeId)

        const { data: setData, error: setError } = await Supabase
            .from('user_basic_favorites')
            .upsert({
                user_id: userId,
                recipes_id: recipes
            })

        if (setError) throw new Error(setError.message)

        return {
            status: 'Ok',
            data: 'Receta eliminada de favoritos',
            error: false,
            errorMessage: null
        }
    } catch (error) {
        return {
            status: 'Fail',
            data: 'Hubo un error al eliminar la receta de favoritos',
            error: true,
            errorMessage: error.message
        }
    }
}