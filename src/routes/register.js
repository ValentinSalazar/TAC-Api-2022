/** IMPORTS */
const express = require("express");
const registerSchema = require("../models/registerSchema.js");
const router = express.Router();

// Funciones
const isObjEmpty = require("../helpers/functions");

// ----------------------------------------------------------------------- //
/** POST Method */
router.post("/registers", async (req, res) => {
  try {
    const nota = req.body.nota
    const validarNota = await registerSchema.findOne({ nota })
    if (validarNota !== null) {
      res.status(409).send({ message: 'Ese numero de nota, ya se encuentra en la base de datos.' })
    } else {
      const register = new registerSchema(req.body);
      await register.save();
      res.status(201).send(register);
      console.log("-------------------------------");
      console.log(`Agregando un nuevo registro con la nota: ${register.nota} \n`);
    }

  } catch (error) {
    console.log(error);
  }
});

// ----------------------------------------------------------------------- //
/** UPDATE Method */
router.patch("/registers/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const register = await registerSchema.findByIdAndUpdate(
      { _id: id },
      { $set: req.body }
    );
    
    console.log(`Se ha actualizado el link de la nota ${register.nota}.`);
  } catch (err) {
    console.log(err);
  }
});

// ----------------------------------------------------------------------- //
// /** GET Method */
router.get("/registers", async (req, res) => {
  try {
    const registers = await registerSchema.find().sort({ updatedAt: -1 });
    res.send(registers);
    console.log("- Registros Generales enviados. \n");
  } catch (err) {
    console.log(err);
  }

});

/** GET ONE Method */
router.get("/registers/:id", async (req, res) => {
  try {
    const registers = await registerSchema.findOne({ _id: req.params.id });
    res.send(registers);
    console.log(`- Registro con ID: ${req.params.id} enviado.`);
  } catch {
    res.status(404);
    res.send({
      error: "GET ONE Method: El registro que esta buscando no existe.",
    });
  }
});


// ----------------------------------------------------------------------- //
/** DELETE ONE (byID) Method */
router.delete("/registers/:id", async (req, res) => {
  try {
    await registerSchema.deleteOne({ _id: req.params.id });
    res.status(200).send();

    console.log(
      `- Registro con ID: ${req.params.id} eliminado de Generales. \n`
    );
  } catch {
    res.status(404);
    res.send({ error: "El registro no existe." });
  }
});

module.exports = router;
