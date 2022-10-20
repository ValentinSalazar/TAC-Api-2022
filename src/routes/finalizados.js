const express = require("express");
const finalizadoSchema = require("../models/finalizadoSchema.js");
const prioritariosSchema = require('../models/prioritySchema.js')
const generalesSchema = require('../models/registerSchema.js')
const router3 = express.Router();
const helpers = require('../helpers/functions.js')

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
                res.status(201).send({ message: `Registro creado con la Nota: ${finalizado.nota}` })
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
        const finalizados = await finalizadoSchema.find().sort({ createdAt: -1 })
        res.send(finalizados)
    }
    catch {

    }
})

/* GET Cantidad de Registros */
router3.get('/finalizados-cantidad', async (req, res) => {
    try {
        const cantidadGenerales = await generalesSchema.find({})
        const cantidadPrioritarios = await prioritariosSchema.find({})
        const cantidadFinalizados = await finalizadoSchema.find({})

        const totales = {
            generales: cantidadGenerales,
            prioritarios: cantidadPrioritarios,
            finalizados: cantidadFinalizados
        }
        res.send(totales)

    } catch (error) {
        console.log(error);
    } 
})

module.exports = router3;




/* 
    CODIGO VIEJO
// Estos fueron algunos de los algoritmos que quise implementar para realizar una misma funcion.
// Lo fui mejorando a medida que lo iba desarrollando.
// try {
    //     const provincias = req.query
    //     console.log(provincias.localidad);
    //     let cantidadProvinciasGenerales = {}
    //     let cantidadProvinciasFinalizados = {}
    //     let cantidadProvinciasPrioritarios = {}

    //     for (let i = 0; i < provincias.length; i++) {
    //         console.log(provincias[i]);
    //         if (i === 0) {
    //             console.log(provincias[i]);
    //             const cabaCantidadGenerales = await generalesSchema.find({ localidad: provincias[i] })
    //             console.log(cabaCantidadGenerales);
    //             // cantidadProvinciasGenerales[provincias[i]] = cabaCantidadGenerales.length

    //         } else {

    //         }
    //     }

    //     console.log(cantidadProvinciasGenerales);
    // } catch (error) {
    //     console.log(error);
    // }


    // return res.sendStatus(200)
    // try {
    //     let listaNombreProvincias = []
    //     const nombreProvincias = Object.values(req.body)
    //     for (let provincia in nombreProvincias) {
    //         listaNombreProvincias.push(nombreProvincias[provincia].split(','))
    //     }

    //     for (let i = 0; i < listaNombreProvincias[0].length; i++) {
    //         let buscador = listaNombreProvincias[0][i]
    //         let caba = ''
    //         if (i === 0) {
    //             caba = buscador

    //             const cabaCantidadPrioritarios = await prioritariosSchema.find({ localidad: caba})
    //             cantidadProvinciasPrioritarios[caba] = cabaCantidadPrioritarios.length

    //             const cabaCantidadFinalizados = await finalizadoSchema.find({ localidad: caba})
    //             cantidadProvinciasFinalizados[caba] = cabaCantidadFinalizados.length
    //         } else {
    //             const otrasProvincias = helpers.titleCase(buscador)
    //             const cantidadGenerales = await generalesSchema.find({ localidad: otrasProvincias })
    //             if (cantidadGenerales[0] !== undefined) {
    //                 cantidadProvinciasGenerales[otrasProvincias] = cantidadGenerales.length
    //             }

    //             const cantidadFinalizados = await finalizadoSchema.find({ localidad: otrasProvincias })
    //             if (cantidadFinalizados[0] !== undefined) {
    //                 cantidadProvinciasFinalizados[otrasProvincias] = cantidadFinalizados.length
    //             }

    //             const cantidadPrioritarios = await prioritariosSchema.find({ localidad: otrasProvincias})
    //             if (cantidadPrioritarios[0] !== undefined) {
    //                 cantidadProvinciasPrioritarios[otrasProvincias] = cantidadPrioritarios.length
    //             }
    //         }
    //     }
    //     let cantidadTotal = {cantidadProvinciasGenerales, cantidadProvinciasPrioritarios, cantidadProvinciasFinalizados}

    //     res.send({ message: 'hola' })

    // } catch (error) {
    //     console.log(error);
    // } 
*/



