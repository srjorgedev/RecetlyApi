export default async function FormatBasicRecipes(recipeData) {

    const recipes = await Promise.all(recipeData.map(async (recipe) => {
        return {
            id: recipe.recipe_id,
            name: recipe.recipe_name,
            mainImg: recipe.recipe_img,
        }
    }))

    return recipes
}