import express, { Request, Response } from 'express'

import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'


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
// Create DatabaseConnection
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  synchronize: false,
})

//
// Define server port
const port = process.env.PORT

//
// Create a default route
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server v#0.0.2')
})

//
// Listen the request on the defined port
AppDataSource.initialize().then(() => {
  // Listen the request on the defined port
  app.listen(port)
  console.log('Data Source has been initialized!')
}).catch((err) => {
    console.error('Error during Data Source initialization', err)
})


