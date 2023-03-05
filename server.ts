import express from 'express'

import dotenv from 'dotenv'

import { DataSource } from 'typeorm'
import cors from 'cors'
import bodyParser from 'body-parser'

import { Task } from './src/task/task.entity'
import { taskRouter } from './src/task/task.router'

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
// Create DataBase Connection
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  synchronize: true,
  logging: false,
  entities: [Task],
  migrations: [],
  subscribers: [],
})

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

app.use('/', taskRouter)
