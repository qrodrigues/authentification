const express = require('express');
const bodyParser = require('body-parser');
const { createArticle } = require('./src/articlesRepository')
const router = express.Router();

router.post('/', async (req, res) => {
    res.status(200).send(`Test Article`)
})

router.post('/blogId', bodyParser.json(), async (req, res) => {
    const blog_id = req.params.blogId
    const body = req.body
    if(body.title && body.content && blog_id){
        const createdArticle = await createArticle(blog_id, body.title, body.content)
        if (createdArticle) {
            res.status(200).send(`Article ${createdArticle} créé.`)
        } else {
            res.status(400).send('Erreur lors de la création du blog.')
        }
    } else {
        res.status(400).send("Les informations pour créer l'article ne sont pas complètes.")
    }

            // res.status(200).send(foundBlog)
})




module.exports = router;