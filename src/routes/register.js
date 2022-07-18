const express = require('express')
const registerSchema = require('../models/registerSchema.js')

const router = express.Router()

// create register
router.post('/registers', (req, res) => {
    const registro = registerSchema(req.body)
    registro
        .save()
        .then( (data) => res.json(data))
        .catch( (error) => res.json({message: error}))
    console.log('Datos recibidos y enviados a la Base de Datos.', registro);
})

// Get all registers.
router.get('/registers', (req, res) => {

    registerSchema
        .find()
        .then( (data) => res.json(data))
        .catch( (error) => res.json({message: error}))
})

module.exports = router;