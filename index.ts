import express, { Request, Response } from 'express';

//
// Instantiate exppress app
const app = express()

//
// Define server port
const port = 3200

//
// Create a default route
app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
})

//
// Listen the request on the defined port
app.listen(port);