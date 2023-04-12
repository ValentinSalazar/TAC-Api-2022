const express = require("express");
const prioritySchema = require("../models/prioritySchema.js");
const router2 = express.Router();

/* POST METHOD*/
router2.post("/priorities", async (req, res) => {
  try {
    const nota = req.body.nota
    const validarNota = await prioritySchema.findOne({ nota })
    if (validarNota !== null) {
      return res.status(409).send({ message: 'El Numero de Nota ya se encuentra en Prioritarios.' })
    } else {
      console.log("Entrando en la seccion de prioritarios.");
      console.log(req.body);
      const priority = new prioritySchema(req.body);
      await priority.save();
      res.send(priority);
      console.log("-------------------------------");
      console.log(`Agregando un nuevo registro al apartado de Prioritarios con la nota: ${priority.nota}`);
    }

  }
  catch (error) {
    res.send(error)
  }
});

/* GET METHODs */
router2.get("/prioritarios", async (req, res) => {
  const priority = await prioritySchema.find().sort({ updatedAt: -1 });
  res.send(priority);
  console.log("-------------------------------");
  console.log("- Registros Prioritarios enviados.");
});

router2.get("/priorities/:id", async (req, res) => {
  const priority = await prioritySchema.find({ _id: req.params.id })
  res.send(priority)
  console.log("-------------------------------");
  console.log(`- Registro Prioritario con el ID: ${req.params.id} enviado.`);
})

/* PATCH METHOD */
router2.patch('/priorities/:id', async (req, res) => {
  try {
    const id = req.params.id
    const nota = await prioritySchema.findOne({_id: id})
    const modifyNota = await prioritySchema.findByIdAndUpdate(
      { _id: id }, { $set: req.body }
    )
    console.log(`- Se ha actualizado el link de la nota ${modifyNota.nota}.`);

    
  } catch (err) {
    console.log(err);
  }
})

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
