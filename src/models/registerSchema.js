const mongoose = require('mongoose')

const registerSchema = mongoose.Schema({
    nota: {
        type: Number,
        default: 'Empty'
    },
    fecha: {
        type: String,
        default: "Empty"
    },
    areaResponsable: {
        type: String,
        default: "Empty",
    },
    localidad: {
        type: String,
        default: "Empty"
    },
    solicitanteForm: {
        type: String,
        default: "Empty"
    },
    estadoForm: {
        type: String,
        default: "Empty"
    }
})

module.exports = mongoose.model('Registro', registerSchema)