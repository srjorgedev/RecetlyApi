import { Supabase } from "../database/Connection.js"

export async function GetTag() {
    try {
        const { data, error } = await Supabase
            .from('food_tag')
            .select('*')

        if (error) throw new Error(`${error.code}: ${error.message}`)
        if (!data && data.length < 0) throw new Error('No hay datos en la tabla food_tag')

        return {
            status: 'Ok',
            error: false,
            errorMessage: null,
            data: data
        }
    } catch (error) {
        return {
            status: 'Fail',
            error: true,
            errorMessage: error.message,
            data: null
        }
    }
}

export async function GetType() {
    try {
        const { data, error } = await Supabase
            .from('food_category')
            .select('*')

        if (error) throw new Error(`${error.code}: ${error.message}`)
        if (!data && data.length < 0) throw new Error('No hay datos en la tabla food_category')

        return {
            status: 'Ok',
            error: false,
            errorMessage: null,
            data: data
        }
    } catch (error) {
        return {
            status: 'Fail',
            error: true,
            errorMessage: error.message,
            data: null
        }
    }
}

export async function GetUnit() {
    try {
        const { data, error } = await Supabase
            .from('food_units')
            .select('*')

        if (error) throw new Error(`${error.code}: ${error.message}`)
        if (!data && data.length < 0) throw new Error('No hay datos en la tabla food_units')

        return {
            status: 'Ok',
            error: false,
            errorMessage: null,
            data: data
        }
    } catch (error) {
        return {
            status: 'Fail',
            error: true,
            errorMessage: error.message,
            data: null
        }
    }
}