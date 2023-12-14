const express = require('express');
const bodyParser = require('body-parser')
const { createBlog, getBlogs, updateBlog, deleteBlog, getSingleBlog } = require('./src/blogsRepository')

const router = express.Router();
router.get('/:blogid', async (req, res) => {

    const blogId = req.params.blogid;
    console.log(blogId);
    if(blogId) {
        const foundBlog = await getSingleBlog(blogId)
        console.log(foundBlog)
        if(foundBlog) {
            res.status(200).send(`${foundBlog}`)
        } else {
            res.status(400).send(`Erreur lors de l'obtention du blog ${blogId}.`)
        }
    } else {
        res.status(400).send(`Erreur lors de l'obtention du blog.`)
    }
})

router.get('/', async (req, res) => {
    const foundBlogs = await getBlogs()
    if(foundBlogs) {
        res.status(200).send(`${foundBlogs}`)
    } else {
        res.status(400).send(`Erreur lors de l'obtention des blogs.`)
    }
})

router.post('/', bodyParser.json(), async (req, res) => {
    // Vérification des variables
    const body = req.body
    if (body.title && body.author) {
        const createdBlog = await createBlog(body.title, body.description, body.link, body.articles, body.author, body.status)
        if (createdBlog) {
            res.status(200).send(`Blog ${createdBlog} créé.`)
        } else {
            res.status(400).send('Erreur lors de la création du blog.')
        }
    } else {
        res.status(400).send("Les informations du blog ne sont pas complètes.")
    }
})

router.put('/:id', bodyParser.json(), async (req, res) => {

    const body = req.body
    if(body) {
        const updatedBlog = await updateBlog(body)
        if(updatedBlog) {
            res.status(200).send(`Blog ${updatedBlog} modifié.`)
        } else {
            res.status(400).send(`Erreur lors de la modification du blog.`)
        }
    } else {
        res.status(400).send("Les informations du blog ne sont pas complètes.")
    }
})


router.delete('/:id', bodyParser.json(), async (req, res) => {
    const body = req.body
    if(body) {
        const deletedBlog = await deleteBlog(body)
        if(!deletedBlog) {
            res.status(200).send(`Blog ${deletedBlog} supprimé.`)
        } else {
            res.status(400).send(`Erreur lors de la suppression du blog.`)
        }
    } else {
        res.status(400).send("Les informations du blog ne sont pas complètes.")
    }
})

module.exports = router;