const jwt = require('jsonwebtoken')

const generateToken = (informations) => {
    return jwt.sign(informations, 'monsecretbiengarde')
}

module.exports = { generateToken }