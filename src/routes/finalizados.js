const express = require("express");
const finalizadoSchema = require("../models/finalizadoSchema.js");
const router3 = express.Router();

/* POST Method */
router3.post('/finalizados', async (req, res) => {
    try {
        console.log(`Registro con Nota: ${req.body.nota} enviada a Finalizados.`)
        const finalizado = new finalizadoSchema(req.body)
        await finalizado.save()
        res.status(201).send(finalizado)
    }
    catch (err) {
        console.log(err);
    }
})



/* GET Method*/
router3.get('/finalizados', async (req, res) => {
    try {
        const finalizados = await finalizadoSchema.find()
        res.send(finalizados)
    }
    catch {

    }
})


module.exports = router3;