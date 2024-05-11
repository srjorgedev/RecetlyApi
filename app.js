import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'

import Recipes from './src/routes/recipes.routes.js'
import User from './src/routes/user.routes.js'
import Auth from './src/routes/auth.routes.js'
import Food from './src/routes/food.routes.js'
import UserV2 from './src/routes/user.v2.routes.js'
import Daily from './src/routes/daily.recipe.routes.js'
import Search from './src/routes/search.routes.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT ?? 1234

app.use(bodyParser.json())
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/helloworld', (req, res) => {
    res.send('<h1>¡Hola mundo!</h1>')
})

app.use('/api/v1/recipe', Recipes)
app.use('/api/v2/recipe', Daily)
app.use('/api/v1/user', User)
app.use('/api/v2/user', UserV2)
app.use('/api/v1/auth', Auth)
app.use('/api/v1/food', Food)
app.use('/api/v1/search', Search)

app.listen(PORT, () => {
    console.log(`Server listening on localhost:${PORT}`)
})