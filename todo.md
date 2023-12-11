Partie pratique :
- Sur la base du projet ex1-login, créer un site web avec les pages suivantes :
  - /register qui permet de s'inscrire (login, mot de passe)
  - /login qui permet de se connecter (login, mot de passe)
  - /dashboard qui ne doit être accessible que si l'on est identifié(e)
Les mots de passe doivent être hashés avec bcrypt et stockés dans un stockage permanent (fichier ou BDD, mais BDD préférée quand même)
Une fois que ça fonctionne, ajouter à la page /login, des boutons "login with" en utilisant un (si possible deux ou trois) fournisseurs différents avec passport (stratégie Google/Apple/Microsoft/autres). Les personnes inscrites avec ces comptes doivent pouvoir ensuite se connecter sans problème.
Passport : https://www.passportjs.org/