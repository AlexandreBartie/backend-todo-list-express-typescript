import express from 'express'

import dotenv from 'dotenv'

import cors from 'cors'
import bodyParser from 'body-parser'

import { AppDataSource } from './database'

import { tasksRouter } from './src/routers/tasks.router'

//
// Instantiate exppress app
const app = express()

dotenv.config()

//
// Parse request Body
app.use(bodyParser.json())

//
// Use CORS install types as well
app.use(cors())

//
// Define server port
const port = process.env.PORT

//
// Listen the request on the defined port
AppDataSource.initialize()
  .then(() => {
    // Listen the request on the defined port
    app.listen(port)
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Bad News: error during Data Source initialization ...', err)
  })

app.use('/', tasksRouter)
