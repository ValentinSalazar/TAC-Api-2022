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
    const register = new registerSchema(req.body);
    await register.save();
    res.send(register);
    console.log("-------------------------------");
    console.log(`Agregando un nuevo registro con la nota: ${register.nota} \n`);
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
    if (req.body.nota === undefined) {
      console.log("- Link actualizado correctamente. \n");
    } else {
      console.log(`- Registro con la nota: ${req.body.nota} actualizado. \n`);
    }
  } catch (err) {
    console.log(err);
  }
});

// ----------------------------------------------------------------------- //
// /** GET Method */
router.get("/registers", async (req, res) => {
  const registers = await registerSchema.find().sort({ updatedAt: -1 });
  res.send(registers);
  console.log("- Registros Generales enviados. \n");
});

/** GET ONE Method */
// router.get("/registers/:id", async (req, res) => {
//   try {
//     const registers = await registerSchema.findOne({ _id: req.params.id });
//     res.send(registers);
//     console.log(`- Registro con ID: ${req.params.id} enviado.`);
//   } catch {
//     res.status(404);
//     res.send({
//       error: "GET ONE Method: El registro que esta buscando no existe.",
//     });
//   }
// });

/**GET SEARCHED Method */
router.get("/registers/:title", async (req, res) => {
  try {
    const title = req.params.title;
    console.log("- Ingresando a GET by SEARCH");
    const registers = await registerSchema.find({
      $or: [{ nota: title }],
    });
    // Verifico que el registro no este vacio.
    if (isObjEmpty(registers)) {
      res.send({ error: "No existe el registro que esta buscando." });
      console.log("  No se encontro el registro que esta buscando el usuario.");
    } else {
      res.send(registers);
      console.log(`- Registro con la Busqueda: ${title}, enviado.`);
    }
  } catch (error) {
    res.status(404);
    console.log(error);
  }
});

// ----------------------------------------------------------------------- //
/** DELETE ONE (byID) Method */
router.delete("/registers/:id", async (req, res) => {
  try {
    await registerSchema.deleteOne({ _id: req.params.id });
    res.status(204).send();

    console.log(
      `- Registro con ID: ${req.params.id} eliminado de Generales. \n`
    );
  } catch {
    res.status(404);
    res.send({ error: "El registro no existe." });
  }
});

module.exports = router;
