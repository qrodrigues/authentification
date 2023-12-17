const express = require('express');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const qrcode = require('qrcode');
const { authenticator } = require('otplib');
const { createUser, getUserById, updateUser } = require('../Repository/usersRepository')
const { generateToken } = require('../Repository/bcryptRepository')

const router = express.Router();

// Créer un utilisateur
router.post('/create', bodyParser.json(), async (req, res) => {
    // Vérification des variables
    const body = req.body
    if (body.username && body.mail && body.password) {
        const createdUser = await createUser(body.username, body.mail, body.password)
        if (createdUser) {
            
            res.status(200).send(`Utilisateur ${createdUser} créé.`)
        } else {
            res.status(400).send('Erreur lors de la création du compte')
        }
    } else {
        res.status(400).send("Les informations d'inscription ne sont pas complètes.")
    }
})

// Récupérer l'utilisateur connecté
router.get('/verify', bodyParser.json(), async (req, res) => {
    if (req.cookies.token) {
        const user = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET_KEY || 'monsecretbiengarde')
        if (user._id) {
            res.status(200).send({
                user: {
                    _id: user._id,
                    username: user.username,
                    a2f: user.a2f
                }
            })
        } else {
            res.status(200).send()
        }
    } else {
        res.status(200).send()
    }

})

module.exports = router;