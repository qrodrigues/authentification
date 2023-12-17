const express = require('express');
const bodyParser = require('body-parser')
const { createBlog, getBlogs, updateBlog, deleteBlog, getOneBlog, getSingleBlogByUser } = require('./Repository/blogsRepository')

const router = express.Router();

// get blogs
router.get('/', async (req, res) => {
    const readBlogs = await getBlogs()
    if(readBlogs) {
        res.status(200).send(readBlogs)
    } else {
        res.status(400).send(`Erreur lors de l'obtention des blogs.`)
    }
})

// get blog by ID
router.get('/:blogid', async (req, res) => {
    const blogId = req.params.blogid;
    if(blogId) {
        const readBlog = await getOneBlog(blogId)
        if(readBlog) {
            res.status(200).send(readBlog)
        } else {
            res.status(400).send(`Erreur lors de l'obtention du blog ${blogId}.`)
        }
    } else {
        res.status(400).send(`Erreur lors de l'obtention du blog.`)
    }
})

// Create blog
router.post('/', bodyParser.json(), async (req, res) => {
    // Vérification des variables
    const body = req.body
    if (body.title && body.author_id) {
        const createdBlog = await createBlog(body.title, body.description, body.link, body.articles, body.author_id, body.status)
        if (createdBlog) {
            res.status(200).send(`Blog ${createdBlog} créé.`)
        } else {
            res.status(400).send('Erreur lors de la création du blog.')
        }
    } else {
        res.status(400).send("Les informations du blog ne sont pas complètes.")
    }
})

// update a blog
router.put('/:blogid', bodyParser.json(), async (req, res) => {
    const blogId = req.params.blogid
    if(blogId && req.body) {
        const updatedBlog = await updateBlog(blogId, req.body)
        if(updatedBlog) {
            res.status(200).send(`Blog ${updatedBlog} modifié.`)
        } else {
            res.status(400).send(`Erreur lors de la modification du blog.`)
        }
    } else {
        res.status(400).send("Les informations du blog ne sont pas complètes.")
    }
})

// delete a blog
router.delete('/:id', async (req, res) => {
    const blogId = req.params.id
    if(blogId) {
        const deletedBlog = await deleteBlog(blogId)
        if(deletedBlog) {
            res.status(200).send(`Blog ${deletedBlog} supprimé.`)
        } else {
            res.status(400).send(`Erreur lors de la suppression du blog.`)
        }
    } else {
        res.status(400).send("Les informations du blog ne sont pas complètes.")
    }
})

// get a blog for a user
router.get('/user/:id', async (req, res) => {
    const user_id = req.params.id;
    if(user_id) {
        const foundBlog = await getSingleBlogByUser(user_id)
        if(foundBlog) {
            res.status(200).send(foundBlog)
        } else {
            res.status(200).send(null)
        }
    }
})

module.exports = router;