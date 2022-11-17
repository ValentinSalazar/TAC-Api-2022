const jwt = require('jsonwebtoken')

const verificarToken = async (req, res, next) => {
    const token = req.headers["token"]

    console.log(token);
}

module.exports = verificarToken;