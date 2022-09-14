const express = require('express')
const mongoose = require('mongoose')
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors')
const registerRoute = require('./routes/register.js')
const prioritariesRoute = require('./routes/prioritaries')
const finalizadosRoute = require('./routes/finalizados.js')
const userRoute = require('./routes/user.js')
require('dotenv').config();

// Data base collections


// The app.
const app = express()
app.use(cors())
const port = process.env.PORT || 1337;

routes = [registerRoute, prioritariesRoute, finalizadosRoute, userRoute]

// Middlewares 
app.use(express.json())
app.use('/api', routes )

app.listen(port, () => {
    
    console.log('Iniciando servidor en puerto:', port)
    console.log("------------------------------------");
})


// Routes
app.get('/', (req, res) => {
    res.send(`'Bienvenidos a la API de TAC BCyL.'`)
})


// mongodb connection
try {
    console.log("------------------------------------");
    mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB Atlas.')
    
} catch {
    console.error(error)
}


