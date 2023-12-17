const express = require('express');
const bodyParser = require('body-parser');
const { getArticles, getOneArticle, getArticlesByBlog, createArticle, updateArticle, deleteArticle, limitArticle } = require('./src/articlesRepository')
const router = express.Router();

// get all article
router.get('/', async (req, res) => {
    const readArticles = await getArticles()
    if (readArticles) {
        res.status(200).send(readArticles)
    }else {
        res.status(400).send('Erreur lors de la récupération des articles.')
    }
})

// get article by ID
router.get('/:articleId', async (req, res) => {
    const article_id = req.params.articleId
    const readArticle = await getOneArticle(article_id)
    if (readArticle) {
        res.status(200).send(readArticle)
    }else {
        res.status(400).send("Erreur lors de la récupération de l'article.")
    }
})

// get article(s) by a blog
router.get('/blog/:blogId', async (req, res) => {
    const blog_id = req.params.blogId
    const readArticle = await getArticlesByBlog(blog_id)
    if (readArticle) {
        res.status(200).send(readArticle)
    }else {
        res.status(400).send("Erreur lors de la récupération de(s) article(s).")
    }
})

// add an article
router.post('/', bodyParser.json(), async (req, res) => {
    const body = req.body
    if(body.title && body.content && body.blog_id){
        const createdArticle = await createArticle(body.title, body.content, body.blog_id)
        if (createdArticle) {
            res.status(200).send(`Article ${createdArticle} créé.`)
        } else {
            res.status(400).send("Erreur lors de la création de l'article.")
        }
    } else {
        res.status(400).send("Les informations pour créer l'article ne sont pas complètes.")
    }
})

// update an article
router.put('/:articleId', bodyParser.json(), async (req, res) => {
    const article_id = req.params.articleId
    const body = req.body
    if(body.title && body.content && article_id){
        const updatedArticle = await updateArticle(article_id, body.title, body.content)
        if (updatedArticle) {
            res.status(200).send(`Article ${article_id} modifié.`)
        } else {
            res.status(400).send("Erreur lors de la modification de l'article")
        }
    } else {
        res.status(400).send("Les informations pour modifier l'article ne sont pas complètes.")
    }
})

// delete an article
router.delete('/:articleId', async (req, res) => {
    const article_id = req.params.articleId
    if(article_id){
        const deletedArticle  = await deleteArticle(article_id)
        if (deletedArticle) {
            res.status(200).send(`Article ${deletedArticle} supprimé.`)
        } else {
            res.status(400).send("Erreur lors de la suppression de l'article.")
        }
    } else {
        res.status(400).send("Les informations pour supprimer l'article ne sont pas complètes.")
    }
})

// limit amount of articles
router.get('/limit/:limit', async (req, res) => {
    const limit = parseInt(req.params.limit)
    if(limit){
        const limitedArticles  = await limitArticle(limit)
        if (limitedArticles) {
            res.status(200).send(limitedArticles)
        } else {
            res.status(400).send("Erreur lors de la suppression des articles.")
        }
    } else {
        res.status(400).send("Une limite d'article est nécessaire.")
    }
})




module.exports = router;