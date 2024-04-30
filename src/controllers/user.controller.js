import { Supabase } from "../database/Connection.js"
import ComparePassword from "./password.controller.js"

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

export async function UpdateUserData(id, update) {
    try {
        const { data, error } = await Supabase
            .from('user_basic_information')
            .update(update)
            .eq('user_id', id)

        if (error) throw new Error(error.message)

        return {
            status: 'Ok',
            message: 'Datos actualizados',
            error: false,
            errorMessage: null
        }

    } catch (error) {
        return {
            status: 'Fail',
            message: 'No se pudieron actualizar los datos',
            error: true,
            errorMessage: error.message
        }
    }
}

export async function DeleteUser(userId, password) {
    try {
        const { data: passwordData, error: passwordError } = await Supabase
            .from('user_private_information')
            .select('user_password')
            .eq('user_id', userId)

        if (passwordError?.code == '22P02') throw new Error('El id del usuario')
        if (passwordError) throw new Error(`${passwordError.code}: ${passwordError.message}`)
        if (!(passwordData && passwordData.length > 0)) {
            return {
                status: 'Ok',
                data: 'No se encontro el usuario',
                error: false,
                errorMessage: null
            }
        }

        const Match = await ComparePassword(password, passwordData[0].user_password)
        if (!Match) throw new Error('Las contraseñas no coinciden')

        const { data: pData, error: pError } = await Supabase
            .from('user_private_information')
            .delete()
            .eq('user_id', userId)

        const { data, error } = await Supabase
            .from('user_basic_information')
            .delete()
            .eq('user_id', userId)

        return {
            status: 'Ok',
            data: 'Cuenta eliminada',
            error: false,
            errorMessage: null
        }
    } catch (error) {
        return {
            status: 'Fail',
            data: 'No se pudo eliminar la cuenta',
            error: true,
            errorMessage: error.message
        }
    }
}