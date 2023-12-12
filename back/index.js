const express = require('express')
const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken');
const cors = require('cors')

const qrcode = require('qrcode');
const { authenticator } = require('otplib');

const app = express()
const port = 3000

const { createUser, checkPassword } = require('./src/usersRepository')

app.use(cors())

app.post('/account/create', bodyParser.json(), async (req, res) => {
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

app.post('/account/login', bodyParser.json(), async (req, res) => {
  // Vérification des variables
  const body = req.body
  if (body.username && body.password) {
    const idUser = await checkPassword(body.username, body.password)
    if (idUser) {
      jwt_token = {"token": jwt.sign({ _id: idUser }, 'monsecretbiengarde')}
      res.status(200).send(jwt_token)
    } else {
      res.status(401).send('mauvais credential')
    }
  }
})

// A2F
const authenticatorSecret = 'unsecretvraimenttressecret';
app.get('/qrcode', (req, res) => {
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

app.get('/verify', (req, res) => {
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

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})