const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user.js')
require('dotenv').config();


const app = express()
const port = process.env.PORT || 8000;

// Middlewares
app.use(express.json())
app.use('/api', userRoutes)

app.listen(port, () => {
    console.log('Iniciando servidor en puerto:', port)
})


// Routes
app.get('/', (req, res) => {
    res.send('Welcome to my API.')
    res.send(`<h1>HOLA</h2>`)
})

// mongodb connection
mongoose
    .connect(process.env.MONGO_URI)
    .then( ()=> { console.log('Connected to MongoDB Atlas.') })
    .catch((error) => console.error(error))