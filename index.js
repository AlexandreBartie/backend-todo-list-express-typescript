const express = require('express')

//
// Instantiate exppress app
const app = express()

//
// Define server port
const port = 3200

//
// Create a default route
app.get('/', (req,res) => {
    res.send('Express + TypeScript Server');
})

//
// Listen the request on the defined port
app.listen(port);