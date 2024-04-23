import { Supabase } from "../database/Connection.js"
import ComparePassword from "./password.controller.js"

export default async function LogIn(email, password) {
    try {
        const { data, error } = await Supabase
            .from('user_basic_information')
            .select('user_id')
            .eq('user_email', email)

        if (error) throw new Error(error.message)
        if (data.length < 1) throw new Error('El correo no existe')

        const { data: userData, error: userError } = await Supabase
            .from('user_private_information')
            .select('user_password')
            .eq('user_id', data[0].user_id)

        if (userError) throw new Error(userError.message)
        if (userData.length < 1) throw new Error('Usuario no encontrado')

        const AuthResult = await ComparePassword(password, userData[0].user_password)

        if (!AuthResult) throw new Error('Las contraseñas no coinciden')

        return {
            status: 'Ok',
            login: AuthResult,
            error: false,
            errorMessage: null,
            id: data[0].user_id
        }

    } catch (error) {
        return {
            status: 'Fail',
            login: false,
            error: true,
            errorMessage: error.message,
            id: null
        }
    }
}

export async function GetUser(id) {
    try {
        const { data, error } = await Supabase
            .from('user_basic_information')
            .select('*')
            .eq('user_id', id)

        if (error) throw new Error(error.message)
        if (data.length < 1) throw new Error("No se encontro la cuenta")

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
            errorMessage: error
        }
    }
}