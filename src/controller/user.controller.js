import { Supabase } from "../database/Connection.js"

export async function GetUserData(id) {
    try {
        const { data, error } = await Supabase
            .from('user_basic_information')
            .select('*')
            .eq('user_id', id)

        if (error) throw new Error(error.message)
        if (data.length < 1) throw new Error('No se encontro el usuario')

        return {
            status: 'Ok',
            data: data[0],
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