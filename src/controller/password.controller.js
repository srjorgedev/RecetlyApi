import bcrypt from 'bcrypt'

export default async function ComparePassword(userPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(userPassword, hashedPassword)
        return match
    } catch (error) {
        throw new Error('Error al comparar contraseñas: ' + error)
    }
}
