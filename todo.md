Obligatoire :  
- [ ] Readme (Manque juste instanceAxios et Passport)
- [ ] Gérer mieux le code secret de l'A2F
- [ ] Sécuriser toutes les routes du back en vérifiant le token (middleware)
- [ ] Autoriser la création et gestion de son blog uniquement si A2F
- [x] Mettre tous les codes secrets en config (variables d'environnements)
- [x] Interdir l'accès à certaines pages quand nécessaire (dashboard quand on est pas connecté, login / register quand on est connecté...)  
    - Ok : /login
    - Ok : /login/a2f/id
    - Ok : /register
    - Ok : /dashboard
    - Ok : /dashboard/a2f
    - Ok : /dashboard/new
    - Ok : /dashboard/update/article_id

- [x] Faire un bouton pour toggle private/public le blog
- [x] Faire une page de blog sympa au niveau du front
- [x] Page Error 404
- []Ajouter le postman du projet dans /documentation

Si le temps :
- [ ] Vérifier que pour aller sur /login/a2f, on s'est d'abord loggé avec les bon identifiants
- [X] CSS finalisation
- [ ] Corriger les trucs soulignés en rouge dans le front
- [ ] Déconnecter toutes les sessions (donc stocker les sessions) (middleware)
- [X] Revoir la structure de certains fichiers (surtout authent back)
- [X] BlogCard devrait être dans les composants et pas page