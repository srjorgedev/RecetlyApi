export default function FormatUserData(userData) {
    try {
        if (userData == null) throw new Error('No se recibieron los datos del usuario')

        return {
            userId: userData.user_id,
            userName: userData.user_name,
            userLastName: userData.user_last_name,
            userNickname: userData.user_username,
            userDescription: userData.user_description,
            userImg: userData.user_pfp,
            userColor: userData.user_color ?? "#c1c1c1",
        }
    } catch (error) {
        return error.message
    }
}