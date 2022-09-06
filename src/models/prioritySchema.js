const mongoose = require("mongoose");

const prioritySchema = mongoose.Schema({
  nota: {
    type: Number,
    default: "Empty",
    unique: true,
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

module.exports = mongoose.model(
  "Prioritario",
  prioritySchema,
  "Prioritarios"
);
