import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'

import Recipes from './src/routes/recipes.routes.js'
import User from './src/routes/user.routes.js'
import Auth from './src/routes/auth.routes.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT ?? 1234

app.use(bodyParser.json())
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/helloworld', (req, res) => {
    res.send('<h1>¡Hola mundo!</h1>')
})

app.use('/api/v1/recipe', Recipes)
app.use('/api/v1/user', User)
app.use('/api/v1/auth', Auth)

app.listen(PORT, () => {
    console.log(`Server listening on localhost:${PORT}`)
})