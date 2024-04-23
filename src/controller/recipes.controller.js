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
            errorMessage: error
        }
    }
}
