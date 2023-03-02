import express, { Request, Response } from 'express'

import dotenv from 'dotenv'

//
// Instantiate exppress app
const app = express()
dotenv.config()

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
app.listen(port)
