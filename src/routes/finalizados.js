const express = require("express");
const finalizadoSchema = require("../models/finalizadoSchema.js");
const router3 = express.Router();

/* POST Method */
router3.post('/finalizados', async (req, res) => {
    try {
        while (true) {
            const registro = req.body
            const encontrarRegistro = await finalizadoSchema.find({ nota: registro.nota })
            if (encontrarRegistro[0] === undefined) {
                const finalizado = new finalizadoSchema(registro)
                await finalizado.save()
                console.log(`Registro creado con la Nota: ${finalizado.nota}`);
                res.status(201).send({ message: `Registro creado con la Nota: ${finalizado.nota}`})
                break
            } else {
                const validarDuplicado = Object.entries(encontrarRegistro[0]).length === 0
                while (!validarDuplicado) {
                    registro.nota += 1
                    console.log(`Registro aumentado: ${registro.nota}`);
                    if (registro.nota !== encontrarRegistro[0].nota) {
                        break
                    }
                }
                
            }
        }
    }
    catch (err) {
        console.log(err);
    }
})



/* GET Method*/
router3.get('/finalizados', async (req, res) => {
    try {
        const finalizados = await finalizadoSchema.find().sort({ createdAt: -1})
        res.send(finalizados)
    }
    catch {

    }
})


module.exports = router3;