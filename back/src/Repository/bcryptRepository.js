const jwt = require('jsonwebtoken')

const generateToken = (informations) => {
    return jwt.sign(informations, 'monsecretbiengarde')
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.TOKEN_SECRET_KEY || 'monsecretbiengarde')
}

const verifyTokenMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send("Token manquant.");
    }

    try {
        verifyToken(token);
        next()
    } catch (e) {
        return res.status(401).send("Token invalide.");
      }
};

module.exports = { generateToken, verifyToken, verifyTokenMiddleware }