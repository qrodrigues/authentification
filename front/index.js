// Pour hasher les mots de passe, on utilisera bcrypt
import bcrypt from 'bcrypt'

// Pour créer un hash bcrypt :
// bcrypt.hash("toto", 10, function(err, hash) {
//     // Store hash in your password DB.
//     console.log("hash", hash);
// });

// 1. Les entrées utilisateur (il faudrait un formulaire pour saisir 
// ces informations)
const username = "toto";
const password = "toto";
// 2. La liste des personnes autorisées (il faudrait une base de données 
// pour stocker la liste des comptes autorisés)
// Il faudrait une page inscription pour populer la base de données
const authorizedUsers = [
    {
        username: "toto",
        // Les mots de passe doivent être hashés.
        // Ce mot de passe a été hashé avec l'algorithme bcrypt
        password: "$2b$10$6sWTafrZg0U/PQqOrL0s2utaWH4I2/NcyZvFfMhn/X8OmeDTcx872"
    }
];

// Système d'authentification général
// Il faudrait une page "connexion" pour valider que la personne a bien les
// bons identifiants
async function main() {
    let ok = false;
    for(var i = 0; i < authorizedUsers.length; i++) {
        const authorizedUser = authorizedUsers[i];
        // Si jamais les informations de connexion correspondent...
        const isPasswordValid = await bcrypt.compare(password, authorizedUser.password);
        if(authorizedUser.username == username && isPasswordValid) {
            // Alors c'est bon.
            console.log("C'est bon.");
            ok = true;
        }
    }

    if(!ok) {
        console.log("Non, c'est pas bon.");
    }
}

main();