/** IMPORTS */
const express = require("express");
const registerSchema = require("../models/registerSchema.js");
const router = express.Router();

// ----------------------------------------------------------------------- //
/** POST Method */
router.post("/registers", async (req, res) => {
  const register = new registerSchema(req.body);
  await register.save();
  res.send(register);
  console.log("-------------------------------");
  console.log(`Agregando un nuevo registro con la nota: ${register.nota}`);
});

// ----------------------------------------------------------------------- //
/** UPDATE Method */
router.patch("/registers/:id", async (req, res) => {
  try {
    const register = await registerSchema.findOne({ _id: req.params.id });

    if (req.body.title) {
      register.title = register.body.title;
    }

    if (req.body.content) {
      register.content = req.body.content;
    }

    await register.save();
    res.send(register);
  } catch {
    res.status(404);
    res.send({ error: "El registro que esta intentando buscar no existe." });
  }
});

// ----------------------------------------------------------------------- //
// /** GET Method */
router.get("/registers", async (req, res) => {
  const registers = await registerSchema.find().sort({ nota: 1 });
  res.send(registers);
  console.log("- Registros generales enviados.");
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

/**GET SEARCHED Method */
router.get("/registers/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const registers = await registerSchema.find({ title: req.body.nota });
    res.send(registers);
  } catch {
    res.status(404);
    res.send({
      error: "GET SEARCH Method: El registro que esta buscando no existe.",
    });
  }
});

// ----------------------------------------------------------------------- //
/** DELETE ONE (byID) Method */
router.delete("/registers/:id", async (req, res) => {
  try {
    await registerSchema.deleteOne({ _id: req.params.id });
    res.status(204).send();

    
    console.log(`- Registro con ID: ${req.params.id} eliminado.`);
  } catch {
    res.status(404);
    res.send({ error: "El registro no existe." });
  }
});

module.exports = router;
