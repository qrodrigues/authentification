const express = require('express');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const qrcode = require('qrcode');
const { authenticator } = require('otplib');
const { createUser, checkPassword } = require('./src/usersRepository')

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
    console.log('ici');
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
    const test = req.cookies
    console.log(test);
    res.status(200).send(`Test session oui`)
})

// A2F
const authenticatorSecret = 'unsecretvraimenttressecret';
router.get('a2f/qrcode', (req, res) => {
    // Le nom d'utilisateur de la personne connectée
    const user = 'quentin@test.fr';
    // Le nom de votre service (à vous de le définir)
    const service = 'LiveCampusAuthentification';

    // Crée une clef pour l'application d'authentification
    const otpauth = authenticator.keyuri(user, service, authenticatorSecret);
    // Génère un qrcode à partir de cette clef
    qrcode.toDataURL(otpauth, (err, imageUrl) => {
        if (err) {
            console.log('Error with QR');
            return;
        }
        res.writeHead(200, 'OK', {
            "Content-Type": 'text/html'
        });
        // Affiche la clef : on pourrait (on devrait) utiliser un moteur de
        // template pour éviter le HTML dans la partie business du serveur
        res.write("<img src='" + imageUrl + "' alt='qrcode'>");
        res.end();
    });
});

router.get('a2f/verify', (req, res) => {
    // Le token, ce sont les six chiffres générés aléatoirement toutes les
    // 30 secondes
    const token = req.query.token; // http://localhost:4000/verify?token=123456
    try {
        // Si la personne n'a pas saisi le token, c'est non
        if (!token) {
            throw new Error("Please supply a token");
        }
        // Si le token n'est pas valide, c'est non
        const isValid = authenticator.check(token, authenticatorSecret);
        if (!isValid) {
            throw new Error("Invalid token");
        }
        // Si le token est valide, c'est oui
        res.send("Le token est valide");
    } catch (err) {
        // On affiche l'erreur à l'utilisateur
        // Possible errors
        // - options validation
        // - "Invalid input - it is not base32 encoded string" (if thiry-two is used)
        res.send(err.message);
    }
});

module.exports = router;