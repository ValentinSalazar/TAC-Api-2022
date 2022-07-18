const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/user.js')
require('dotenv').config();


const app = express()
app.use(cors())
const port = process.env.PORT || 8000;



// Middlewares 
app.use(express.json())
app.use('/api', userRoutes)

app.listen(port, () => {
    console.log('Iniciando servidor en puerto:', port)
})


// Routes
app.get('/', (req, res) => {
    res.send('Bienvenidos a la API de TAC BCyL.')
})

// mongodb connection
mongoose
    .connect(process.env.MONGO_URI)
    .then( ()=> { console.log('Connected to MongoDB Atlas.') })
    .catch((error) => console.error(error))