import { Supabase } from "../database/Connection.js"

export async function GetRecipeScore(id) {
    try {
        const { data, error } = await Supabase
            .from('recipes_basic_score')
            .select('score')
            .eq('recipe_id', id)

        if (error) throw new Error(error.message)

        const score = data.map(score => score.score)
        const prome = () => {
            let r = 0
            for (let i = 0; i < score.length; i++) {
                r = r + score[i]
            }
            console.log(r)
            return (r / score.length)
        }

        return {
            status: 'Ok',
            score: score,
            amount: score.length,
            prom: prome(),
            error: false,
            errorMessage: null
        }
    } catch (error) {
        return {
            status: 'Fail',
            score: null,
            amount: score.length,
            prom: 0,
            error: true,
            errorMessage: error
        }
    }
}