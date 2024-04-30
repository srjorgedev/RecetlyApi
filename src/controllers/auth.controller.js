import { Supabase } from "../database/Connection.js"
import ComparePassword from "./password.controller.js"
import bcrypt from 'bcrypt'

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

export async function SignUp(username, userName, userLastName, userPfp, userPassword, userEmail) {
    try {
        const EncryptedPassword = await bcrypt.hash(userPassword, 16)

        const { data, error } = await Supabase
            .from('user_basic_information')
            .insert({
                user_name: userName,
                user_username: username,
                user_last_name: userLastName,
                user_pfp: userPfp,
                user_email: userEmail
            })
            .select('user_id')

        if (error?.code == 23505) throw new Error(`El correo ${userEmail} ya es usado en otra cuenta`)
        if (error) throw new Error(`${error.code}: ${error.message}`)

        const { error: SignUpError } = await Supabase
            .from('user_private_information')
            .insert({
                user_id: data[0].user_id,
                user_password: EncryptedPassword
            })

        if (SignUpError) throw new Error(`${SignUpError.code}: ${SignUpError.message}`)

        return {
            status: 'Ok',
            data: data[0].user_id,
            error: false,
            errorMessage: null
        }
    } catch (error) {
        return {
            status: 'False',
            data: null,
            error: true,
            errorMessage: error.message
        }
    }
}