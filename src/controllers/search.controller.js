import { Supabase } from "../database/Connection.js"

export async function SearchRecipeByType(query) {
    try {
        const { data, error } = await Supabase
            .from('recipes_basic')
            .select('recipe_id, recipe_name, recipe_img')
            .overlaps('recipe_type', [query])

        if (error) throw new Error(`${error.code}: ${error.message}`)

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

export async function SearchRecipeByName(query) {
    try {
        const { data, error } = await Supabase
            .from('recipes_basic')
            .select('recipe_id, recipe_name, recipe_img')
            .ilike('recipe_name', `%${query}%`)

        if (error) throw new Error(`${error.code}: ${error.message}`)

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

export async function SearchRecipeByTag(query) {
    try {
        const { data, error } = await Supabase
            .from('recipes_basic')
            .select('recipe_id, recipe_name, recipe_img')
            .overlaps('recipe_tag', [query])

        if (error) throw new Error(`${error.code}: ${error.message}`)

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