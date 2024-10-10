import e from "express"
import { GetTag, GetType } from '../controllers/food.controller.js'
import { SearchRecipeByName, SearchRecipeByTag, SearchRecipeByType } from "../controllers/search.controller.js"

const Router = e.Router()

Router.get('/:search', async (req, res) => {
    try {
        if (req.path === "") {
            throw new Error('Se necesita una búsqueda')
        }

        const { search } = req.params
        const query = search.toLowerCase()

        const { data: tagData } = await GetTag()
        const { data: typeData } = await GetType()

        const filteredTags = tagData
            .filter(tag => {
                const tagName = tag.name.toLowerCase()
                return tagName.includes(query)
            })
            .map(tag => tag.tag_id)

        const filteredTypes = typeData
            .filter(type => {
                const typeName = type.category.toLowerCase()
                return typeName.includes(query)
            })
            .map(type => type.categoty_id)

        console.log(filteredTags)
        console.log(filteredTypes)

        const tagPromises = filteredTags.map(tagId => SearchRecipeByTag(tagId))
        const typePromises = filteredTypes.map(typeId => SearchRecipeByType(typeId))
        const namePromise = SearchRecipeByName(query)

        const [tagResults, typeResults, nameResult] = await Promise.all([
            Promise.all(tagPromises),
            Promise.all(typePromises),
            namePromise
        ])

        const filteredTagResults = tagResults.map(result => result.data).filter(Boolean)
        const filteredTypeResults = typeResults.map(result => result.data).filter(Boolean)
        const filteredNameResult = nameResult.data

        if (filteredNameResult.length === 0 && filteredTagResults.length === 0 && filteredTypeResults.length === 0) {
            return res.json({
                data: `No se encontraron resultados para ${query}`
            });
        }

        const results = {
            ByTag: filteredTagResults,
            ByType: filteredTypeResults,
            ByName: filteredNameResult
        }

        res.json(results)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

export default Router