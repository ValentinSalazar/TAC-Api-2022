const express = require('express')
const routerEstadisticas = express.Router();

/* Schemas */
const generalesSchema = require('../models/registerSchema.js')
const prioritariosSchema = require('../models/prioritySchema.js')
const finalizadoSchema = require('../models/finalizadoSchema.js')

routerCantidad.post('/estadisticas', async(req, body) => {
    const estadisticasGenerales = await generalesSchema.find({}).count()
    
    const provincias = req.body.provincias // La idea es que me vengan todas las provincias para poder filtrarlas.

    const estadisticasFiltradas = 'Aca iran las provincias e ire filtrando por nombre.';
})

module.exports = routerEstadisticas;