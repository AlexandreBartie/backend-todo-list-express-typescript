import express from 'express'

import dotenv from 'dotenv'

// import { DataSource } from 'typeorm'
import cors from 'cors'
import bodyParser from 'body-parser'

import { AppDataSource } from './data-source'

// import { Task } from './src/entity/tasks.entity'
import { tasksRouter } from './src/routers/tasks.router'
import { Task } from './src/entity/tasks.entity'

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
