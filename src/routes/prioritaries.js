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
  catch (error) {
    res.send(error)
  }
});

router2.get("/priorities", async (req, res) => {
  const priority = await prioritySchema.find().sort({ updatedAt: 1 });
  res.send(priority);
  console.log("-------------------------------");
  console.log("- Registros Prioritarios enviados.");
});

/*  DELETE METHOD    */
router2.delete("/priorities/:id", async (req, res) => {
  try {
    await prioritySchema.deleteOne({ _id: req.params.id });
    res.status(204).send();
    console.log(`- Registro con ID: ${req.params.id} eliminado.`);
  }
  catch {
    res.status(404);
    res.send({ error: "El registro no existe." });
  }
});
module.exports = router2;
