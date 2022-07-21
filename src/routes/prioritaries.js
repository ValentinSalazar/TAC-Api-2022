const express = require('express')
const registerSchema = require('../models/registerSchema.js')
const router2 = express.Router()

router2.post('/priorities', (req, res) => {
    // Create a priority register
    console.log('Entrando al apartado de Prioritarios.');
})

router2.get('/priorities', (req, res) => {
    // Get priorities registers.
    registerSchema
        .find()
        .then(data => res.json(data))
        .catch(err => res.json({ message: error }))
        console.log('Enviando registros prioritarios al cliente..');
    setTimeout(function () {
        console.log('Registros prioritarios enviados.');
    }, 2000)
})

module.exports = router2