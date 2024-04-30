import { Supabase } from "../database/Connection.js"

export async function GetAllRecipes() {
    try {
        const { data, error } = await Supabase
            .from('recipes_basic')
            .select('*, user_basic_information(user_id, user_username)')

        if (error) throw new Error(error.message)
        if (data.length === 0) throw new Error('No hay recetas')

        return {
            status: 'Ok',
            data: data,
            error: false,
            errorMessage: null
        }
    } catch (error) {
        return {
            status: 'Fail',
            data: null,
            error: true,
            errorMessage: error
        }
    }
}

export async function GetBasicRecipes() {
    try {
        const { data, error } = await Supabase
            .from('recipes_basic')
            .select(`
                recipe_id,
                recipe_name,
                recipe_img
            `)

        if (error) throw new Error(error.message)
        if (data.length === 0) throw new Error('No hay recetas')

        return {
            status: 'Ok',
            data: data,
            error: false,
            errorMessage: null
        }
    } catch (error) {
        return {
            status: 'Fail',
            data: null,
            error: true,
            errorMessage: error
        }
    }
}

export async function GetRecipeById(id) {
    try {
        const { data, error } = await Supabase
            .from('recipes_basic')
            .select('*, user_basic_information(user_id, user_username)')
            .eq('recipe_id', id)

        if (error) throw new Error(error.message)
        if (data.length === 0) throw new Error('No se encontro la receta buscada')

        return {
            status: 'Ok',
            data: data,
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

export async function DeleteRecipe(recipeId, userId) {
    try {
        const { data, error } = await Supabase
            .from('recipes_basic')
            .delete()
            .eq('recipe_id', recipeId)
            .eq('user_id', userId)
            .select()

        if (error?.code == '22P02') throw new Error('El id del usuario o de la receta es incorrecto')
        if (error) throw new Error(`${error.code}: ${error.message}`)
        if (!(data && data.length > 0)) {
            return {
                status: 'Ok',
                data: 'No se encontro la receta',
                error: false,
                errorMessage: null
            }
        }

        return {
            status: 'Ok',
            data: 'Receta eliminada',
            error: false,
            errorMessage: null
        }
    } catch (error) {
        return {
            status: 'Fail',
            data: 'No se pudo eliminar la receta',
            error: true,
            errorMessage: error.message
        }
    }
}

export async function CreateRecipe(recipe) {
    try {
        const { data, error } = await Supabase
            .from('recipes_basic')
            .insert(recipe)

        if (error) throw new Error(`${error.code}: ${error.message}`)

        return {
            data: 'Receta subida',
            status: 'Ok',
            error: false,
            errorMessage: null
        }
    } catch (error) {
        return {
            data: 'La receta no pudo ser subida',
            status: 'Fail',
            error: true,
            errorMessage: error.message
        }
    }
}

export async function UpdateRecipe(recipe, recipe_id, user_id) {
    try {
        const { data: userData, error: userError } = await Supabase
            .from('recipes_basic')
            .select('user_id')
            .eq('recipe_id', recipe_id)

        if (!(userData && userData.length > 0)) throw new Error('La receta no existe')
        if (userData[0].user_id != user_id) throw new Error('El id del usuario no coincide')
        if (userError) throw new Error(`${userError.code}: ${userError.message}`)

        const { data, error } = await Supabase
            .from('recipes_basic')
            .update(recipe)
            .match({
                recipe_id: recipe_id,
                user_id: user_id
            })

        if (error?.code == "22P02") throw new Error('El id del usuario o de la receta no es correcto')
        if (error) throw new Error(`${error.code}: ${error.message}`)
        console.log(data)

        return {
            data: 'Receta actualizada',
            status: 'Ok',
            error: false,
            errorMessage: null
        }
    } catch (error) {
        return {
            data: 'La receta no pudo ser actualizada',
            status: 'Fail',
            error: true,
            errorMessage: error.message
        }
    }
}