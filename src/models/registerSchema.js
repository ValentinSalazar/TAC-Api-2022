const mongoose = require('mongoose')

const registerSchema = mongoose.Schema({
    nota: { type: Number },
    fecha: { type: String },
    area: { type: String },
    localidad: { type: String },
    solicitante: { type: String },
    estado: { type: String }
})

module.exports = mongoose.model('Registro', registerSchema)