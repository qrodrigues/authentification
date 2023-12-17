# Livecampus - Projet d'authentification Web



## 🔎 Informations générales : 
- Groupe : RODRIGUES Quentin, ROCHE Sébastien
- Stack du projet :
    - ReactJS pour le frontend 
    - NodeJS (Express) pour le backend
    - MongoDB pour la base de données
- Contexte :   
Vous devez réaliser une application de création de blog. Chaque personne peut créer son espace, dès le moment où celle-ci a créé son compte. Le blog de chaque personne peut être disponible en public (chaque visiteur peut lire les contenus sans pour autant être identifié) ou en privé (le visiteur doit disposer d'un compte et être identifié pour
visualiser le contenu). Des privilèges doivent être plus élevés pour créer du contenu : dans ce cas, une
authentification à deux facteurs est nécessaire.

## 🏗️ Installation du projet : 
- Cloner le repository : 

```
git clone https://github.com/qrodrigues/authentification.git
```

- Installer le backend : 

```python
cd back/ #déplacement dans le dossier du back
npm install ou npm i #installation des dépendances
```

- Installer le frontend : 

```python
cd front/ #déplacement dans le dossier du back
npm install ou npm i #installation des dépendances
```

## 🚀 Démarrage du projet : 
Pour démarrer le projet, vous devez lancer les 2 cotés de l'application : 

```python
cd back/ #si vous n'etes pas déjà dedans
npm run start #lancement du back (sur le port 3000)
```

```python
cd front/ #si vous n'etes pas déjà dedans
npm run dev #lancement du front (sur le port 5173)
```

## 🔩 Fonctionnalités de l'application :

### Inscription
Un utilisateur peut s'inscrire en fournissant les informations requises telles que son username, son adresse e-mail et un mot de passe.
### Connexion 
- #### Normale 
    Un utilisateur peut se connecter en utilisant son adresse e-mail et le mot de passe associé à son compte.
- #### Authentification tierce 
    Pour une connexion simplifiée, les utilisateurs peuvent opter pour l'authentification tierce en utilisant des services de Google et Github.
### Mise en place de l'A2F 
Pour renforcer la sécurité, l'application propose la mise en place de l'authentification à deux facteurs (A2F). Les utilisateurs peuvent activer cette fonctionnalité dans leur espace personnel (bouton en haut à droite), en associant leur compte à un dispositif d'authentification tierce, tel qu'une application d'authentification mobile (Microsoft Authentificator recommandé).
Si jamais l'a2f n'est pas activé sur leur compte, ils ne pourront pas consulter leur blog.

### Page d'acceuil
La page d'acceuil regroupe 2 fonctionnalités distinctes : L'affichage de tous les blogs du site, en précisant si ils sont publics ou privés, et l'affichage des 5 derniers articles publiés (Bonus).
### CRUD & Routes de l'application

#### Le CRUD : 
Notre application est équipée d'un basique CRUD, permettant de voir : 
- son blog, voir des blogs, voir un blog
- voir des articles, voir un article, modifier et supprimer un article

#### Les Routes :
Voici les différentes routes de l'application : 
```js
<Routes>  
    <Route path='*' element={<NotFoundPage />}/>  
    <Route path="/" element={<HomePage />} />
    <Route path="/home" element={<HomePage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/login/a2f/:user" element={<LoginPageDualAuth />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/dashboard/a2f" element={<DualAuthentication />} />
    <Route path="/blog/:blogid" element={<Blog />} />
    <Route path="/dashboard/new" element={<FormArticlePage />} />
    <Route path="/dashboard/update/:articleid" element={<FormArticlePage />} />
</Routes>
```
#### Les requêtes :
Afin de réaliser des requêtes homogènes vers le backend, nous avons choisi de créer une instance Axios.
```js
const instance = axios.create()
instance.defaults.withCredentials = true
```

Dans le backend de l'application, nous avons configuré express pour qu'il s'utilise uniquement avec le frontend, et en utilisant les credentials.
```js
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
res.setHeader('Access-Control-Allow-Credentials', true);
```

#### L'authentification :
Afin de réaliser un système d'authentification complet, nous avons fais le choix d'utiliser la librairie Passport. Nous avons utilisé trois stratégies : Local, Google et Github.

La stratégie Local nous permet de faire un système d'authentification homogène dans l'application.

L'authentification fonctionne avec un cookie nommé **token**, c'est un JWT comportant les informations de l'utilisateur connecté.

Un middleware a été mis en place, il permet de vérifier si l'utilisateur est bien connecté avant d'accéder aux routes du backend. Pour l'exemple, nous l'utilisons sur la route de création d'un article.


---
Roche Sébastien - Rodrigues Quentin - Livecampus 2023
