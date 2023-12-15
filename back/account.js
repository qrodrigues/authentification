const express = require('express');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const qrcode = require('qrcode');
const { authenticator } = require('otplib');
const { createUser, checkPassword, getUserById, updateUser } = require('./src/usersRepository')

const router = express.Router();

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

router.post('/login', bodyParser.json(), async (req, res) => {
    const body = req.body
    if (body.mail && body.password) {
        const user = await checkPassword(body.mail, body.password)
        if (user) {
            jwt_token = jwt.sign({ _id: user._id, username: user.username }, 'monsecretbiengarde')
            res.status(200).send({token: jwt_token})
        } else {
            res.status(401).send('Les identifiants ne sont pas correctes.')
        }
    } else {
        res.status(400).send("L'authentification requiert une adresse mail et un mot de passe.")
    }
})


router.get('/verify', bodyParser.json(), async (req, res) => {
    if (req.cookies.token) {
        const user = jwt.verify(req.cookies.token, 'monsecretbiengarde')
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

// A2F
const authenticatorSecret = 'unsecretvraimenttressecret';
router.get('/a2f/qrcode', async (req, res) => {
    const user = await getUserById(req.query.user)

    const service = 'LiveCampusAuthentification';

    const otpauth = authenticator.keyuri(user.username, service, user.a2f.secret);

    qrcode.toDataURL(otpauth, (err, imageUrl) => {
        if (err) {
            console.log('Error with QR');
            return;
        }
        res.status(200).json({
            url: imageUrl
        })
    });
});

router.get('/a2f/verify', async (req, res) => {
    const token = req.query.token;
    const user = await getUserById(req.query.user)
    try {
        if (!token) {
            throw new Error("Please supply a token");
        }
        // Si le token n'est pas valide, c'est non
        const isValid = authenticator.check(token, user.a2f.secret);
        if (!isValid) {
            res.status(200).json({
                isValid: false
            })
        } else {
            updateUser(user._id, {a2f: {...user.a2f, active: true}})
            res.status(200).json({
                isValid: true
            })
        }
    } catch (err) {
        res.send(err.message);
    }
});

router.get('/a2f/disable', async (req, res) => {
    const user = await getUserById(req.query.user)
    updateUser(user._id, {a2f: {...user.a2f, active: false}})
    res.status(200).send('ok')
});

module.exports = router;