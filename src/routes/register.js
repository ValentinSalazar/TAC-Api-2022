/** IMPORTS */
const express = require('express')
const registerSchema = require('../models/registerSchema.js')
const router = express.Router()

/** POST Method */
router.post('/registers', (req, res) => {
    // Create register
    const registro = registerSchema(req.body)
    registro
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
    console.log('Registro recibido y enviado a la base de Datos.');
    console.log('Nota agregada:', registro.nota);
    console.log();
})

router.post('/priorities', (req, res) => {
    // Create a priority register
    const registro = registerSchema(req.body)
    registro
        .save()
        .then(data => res.json(data))
        .catch(err => res.json({ message: err }))
    console.log('Registro prioritario recibido y enviado a la base de datos.', registro);
})



/** GET Method */
router.get('/registers', (req, res) => {
    // Get all registers.
    registerSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
    console.log('Recargando la pagina de inicio..');
    setTimeout(function () {
        console.log('Enviando registros generales al cliente..');
        setTimeout(function() {
            console.log('Registros enviados.');
        }, 1000)
    }, 2000)
})


router.get('/priorities', (req, res) => {
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


/** DELETE Method */
router.delete('/registers', (req, res) => {
    // Delete a register.
    console.log(req.params.id);
})


module.exports = router;