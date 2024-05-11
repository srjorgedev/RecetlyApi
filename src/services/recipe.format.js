import { GetTag, GetType, GetUnit } from '../controllers/food.controller.js'

export default async function FormatRecipes(recipeData = []) {
    const { data: typeData } = await GetType()
    const { data: tagData } = await GetTag()
    const { data: unitsData } = await GetUnit()
    
    const recipes = await Promise.all(recipeData.map(async (recipe) => {
        const tags = tagData.filter(tag => recipe.recipe_tag.some(tagId => tag.tag_id === tagId))
        const types = typeData.filter(type => recipe.recipe_type.some(tagId => type.categoty_id === tagId))
        const timeU = recipe.recipe_time_unit.map(unit => {
            if (unit === 1) {
                return "Minutos"
            } else if (unit === 2) {
                return "Horas"
            } else {
                return "Desconocido"
            }
        })

        return {
            id: recipe.recipe_id,
            owner: {
                id: recipe.user_id,
                username: recipe.user_basic_information.user_username
            },
            name: recipe.recipe_name,
            description: recipe.recipe_description,
            mainImg: recipe.recipe_img,
            addedAt: recipe.created_at,
            tag: {
                count: tags.length,
                tags: tags.map(tag => {
                    return {
                        key: tag.tag_id,
                        value: tag.name,
                    }
                })
            },
            category: {
                count: types.length,
                tags: types.map(type => {
                    return {
                        key: type.categoty_id,
                        value: type.category,
                    }
                })
            },
            time: {
                from: `${recipe.recipe_time[0]} ${timeU[0]}`,
                to: `${recipe.recipe_time[1]} ${timeU[1]}`
            },
            ingredients: {
                count: recipe.recipe_ingredients.length,
                ingredients: recipe.recipe_ingredients.map((ingredient, i) => {
                    const unit = unitsData.find(unit => unit.filter_id === recipe.recipe_ingredient_amount[i])

                    return {
                        name: ingredient,
                        amount: recipe.recipe_ingredient_unit[i],
                        unit: {
                            key: unit.filter_id,
                            value: unit.unit
                        }
                    }
                })
            },
            steps: {
                count: recipe.recipe_steps.length,
                steps: recipe.recipe_steps,
            }
        }
    }))

    return recipes
}