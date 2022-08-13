const express = require("express");
const prioritySchema = require("../models/prioritySchema.js");
const router2 = express.Router();

router2.post("/priorities", async (req, res) => {
  try {
    console.log("Entrando en la seccion de prioritarios.");
    console.log(req.body);
    const priority = new prioritySchema(req.body);
    await priority.save();
    res.send(priority);
    console.log("-------------------------------");
    console.log(`Agregando un nuevo registro al apartado de Prioritarios con la nota: ${priority.nota}`);
  } 
  catch(error){
    res.send(error)
  }
});

router2.get("/priorities", async (req, res) => {
  const priority = await prioritySchema.find().sort({ nota: 1 });
  res.send(priority);
  console.log("-------------------------------");
  console.log("- Registros Prioritarios enviados.");
});

module.exports = router2;
