/** IMPORTS */
const mongoose = require("mongoose");

const finalizadoSchema = mongoose.Schema({
  nota: {
    type: Number,
    default: "Empty",
  },
  fecha: {
    type: String,
    default: "Empty",
  },
  areaResponsable: {
    type: String,
    default: "Empty",
  },
  localidad: {
    type: String,
    default: "Empty",
  },
  solicitanteForm: {
    type: String,
    default: "Empty",
  },
  estadoForm: {
    type: String,
    default: "Empty",
  },
  link: {
    type: String,
    default: "No hay link almacenado"
  }
},
  {
    timestamps: true
  });

module.exports = mongoose.model("Finalizado", finalizadoSchema, "Finalizados");
