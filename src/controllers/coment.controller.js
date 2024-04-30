import { Supabase } from "../database/Connection.js"

export async function PostComment(comment, user_id, recipe_id) {
    try {
        const { data, error } = await Supabase
            .from('recipes_comments')
            .insert({
                user_id: user_id,
                recipe_id: recipe_id,
                comment: comment,
                is_response: false,
                response_to: null
            })

        if (error) throw new Error(error.message)

        return {
            status: 'Ok',
            error: false,
            errorMessage: null,
            data: 'Comentario subido correctamente'
        }

    } catch (error) {
        return {
            status: 'Fail',
            error: true,
            errorMessage: error.message,
            data: 'El comentario no pudo ser subido'
        }
    }
}

export async function UpdateComment(comment, coment_id) {
    try {
        const { data, error } = await Supabase
            .from('recipes_comments')
            .update({
                comment: comment
            })
            .eq('coment_id', coment_id)

        if (error) throw new Error(error.message)

        return {
            status: 'Ok',
            error: false,
            errorMessage: null,
            data: 'Comentario actualizado correctamente'
        }

    } catch (error) {
        return {
            status: 'Fail',
            error: true,
            errorMessage: error.message,
            data: 'El comentario no pudo ser actualizado'
        }
    }
}

export async function DeleteComment(user_id, comment_id) {
    try {
        const [existingComment, existingUser] = await Promise.all([
            Supabase
                .from('recipes_comments')
                .select('coment_id')
                .eq('coment_id', comment_id)
                .single(),
            Supabase
                .from('recipes_comments')
                .select('user_id')
                .eq('user_id', user_id)
                .single()
        ])

        if (existingComment.error) throw new Error('El comentario no existe');
        if ((existingUser.error) === true) throw new Error('El usuario no tiene comentarios subidos');

        const { data, error } = await Supabase
            .from('recipes_comments')
            .delete()
            .eq('coment_id', comment_id)
            .eq('user_id', user_id)

        if (error) throw new Error(error.message)

        return {
            status: 'Ok',
            error: false,
            errorMessage: null,
            data: 'Comentario eliminado correctamente'
        }

    } catch (error) {
        return {
            status: 'Fail',
            error: true,
            errorMessage: error.message,
            data: 'El comentario no pudo ser eliminado'
        }
    }
}