import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import Recipes from './src/routes/Recipes.js'
import User from './src/routes/User.js'
import Auth from './src/routes/Auth.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT ?? 1234

app.use(bodyParser.json())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hola mundo')
})

app.get('/recetas', async (req, res) => {
    
})

app.use('/api/v1/recipe', Recipes)
app.use('/api/v1/user', User)
app.use('/api/v1/auth', Auth)

app.listen(PORT, () => {
    console.log(`Server listening on localhost:${PORT}`)
})