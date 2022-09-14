const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const user = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
},
    {
        timestamps: true
    })

user.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

user.methods.comparePassword = async (password, recivePassword) => {
    return await bcrypt.compare(password, recivePassword)
}



module.exports = mongoose.model( "Usuario", user, "Usuarios")
