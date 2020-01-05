// Import 'express' (framework)
const express = require('express')

// Import 'body-parser' (converter)
const bodyParse = require('body-parser')

// Import 'userRoutes.js'
const userRoutes = require('./routes/userRoutes')

const app = express()

// Simulation port of server
const port = 3300

// Convert object sent by url
app.use(bodyParse.urlencoded({ extended: false }))

// Pass API as parameter to another structure
userRoutes(app)

// API receives main route ('/') and sends response
app.get('/', (req, res) => res.send("Fucking Running"))

// Create server on specified port and send notification
app.listen(port, () => console.log('Running'))
