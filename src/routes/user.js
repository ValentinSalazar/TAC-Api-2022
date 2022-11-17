const express = require("express");
const userSchema = require("../models/userSchema.js");
const routerUser = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Code } = require("mongodb");
require("dotenv").config();

routerUser.post("/user/create", async (req, res) => {
  try {
    console.log("- Endpoint userCreate funcionando.");
    const { name, email, password } = req.body;

    const userFound = await userSchema.find({ email });
    const validarEmail = Object.keys(userFound).length !== 0;
    if (validarEmail) {
      return res.status(409).json({ error: "El mail ya se encuentra registrado." });
    } else {
      const passwordHash = await bcrypt.hash(password, 8);
      const newUser = new userSchema({
        name,
        email,
        password: passwordHash,
      });

      const savedUser = await newUser.save();
      console.log(savedUser);

      return res.status(201).json({ mensaje: 'Se ha registrado correctamente.' })
    }
  } catch (err) {
    console.log(err);
  }
});

routerUser.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    const passwordCorrect = user === null 
      ? false 
      : await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      return res.status(401).json({
        error: "Usuario o contrasenia invalido.",
      });
    } else {
      const id = req.body._id
      const name = user.name
      const userForToken = {
        id,
        name
      }
      const token = jwt.sign({userForToken}, process.env.KEY, { expiresIn: 43200})
      return res.json({
        mensaje: 'Usuario logueado.',
        usuario: { id, name, token }
      })

    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = routerUser;
