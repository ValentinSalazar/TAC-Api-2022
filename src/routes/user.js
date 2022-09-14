const express = require('express')
const userSchema = require('../models/userSchema.js')
const routerUser = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

routerUser.post('/user/create', async (req, res) => {
    try {
        console.log('Endpoint userCreate funcionando.');

        // const userFound = userSchema.find(email: )
        const { name, email, password } = req.body
        const passwordHash = await bcrypt.hash(password, 8)
        const newUser = new userSchema({
            name,
            email,
            password: passwordHash
        })

        const savedUser = await newUser.save()

        const token = jwt.sign({ id: savedUser._id }, 'institucionales-api', {
            expiresIn: 43200
        })
        res.json({ token })
    } catch (err) {
        console.log(err);
    }
})

routerUser.post('/user/login', async (req, res) => {
    try {
        const userFound = await userSchema.findOne({ email: req.body.email })

        if (req.body.password !== userFound.password) {
            console.log('asd');
            //return res.status(401).json({token: null, message: 'Password invalida.'})
            res.status(401).json({ token: null, message: 'password invalida.' })
        } else {
            res.json({ token: 'logueado' })
        }
    } catch (err){
        console.log(err);
    }
})


module.exports = routerUser;