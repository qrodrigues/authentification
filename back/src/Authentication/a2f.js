const express = require('express');
const qrcode = require('qrcode');
const { authenticator } = require('otplib');
const { getUserById, updateUser } = require('../Repository/usersRepository')
const { createBlog, getSingleBlogByUser, deleteBlog } = require('../Repository/blogsRepository')
const { getArticlesByBlog, deleteArticle } = require('../Repository/articlesRepository')
const { generateToken } = require('../Repository/bcryptRepository')

const router = express.Router();

// Obtenir un QR code
router.get('/qrcode', async (req, res) => {
    const user = await getUserById(req.query.user)

    const service = 'LiveCampusAuthentification';

    const otpauth = authenticator.keyuri(user.username, service, user.a2f.secret);

    qrcode.toDataURL(otpauth, (err, imageUrl) => {
        if (err) {
            throw new Error("Erreur avec le QR Code.");
            return;
        }
        res.status(200).json({
            url: imageUrl
        })
    });
});

// Vérifier un QR code
router.get('/verify', async (req, res) => {
    const token = req.query.token;
    const user = await getUserById(req.query.user)
    try {
        if (!token) {
            throw new Error("Fournissez un token.");
        }
        // Si le token n'est pas valide, c'est non
        const isValid = authenticator.check(token, user.a2f.secret);
        if (!isValid) {
            res.status(200).json({
                isValid: false
            })
        } else {
            await updateUser(user._id, {a2f: {...user.a2f, active: true}})
            const blog_info = {
              "title": `Blog de ${user.username}`,
              "description": `Découvrez les articles de ${user.username} `,
              "author_id": user._id,
              "status": "private"
            }
            await createBlog(blog_info.title, blog_info.description, blog_info.author_id, blog_info.status)
            res.cookie('token', generateToken({
                _id: user._id,
                username: user.username,
                a2f: true
            }))
            res.status(200).json({
                isValid: true
            })
        }
    } catch (err) {
        res.send(err.message);
    }
});

// Désactive l'A2F
router.get('/disable', async (req, res) => {
    const user = await getUserById(req.query.user)
    await updateUser(user._id, {a2f: {...user.a2f, active: false}})
    const blog = await getSingleBlogByUser(user._id)
    await deleteBlog(blog._id)
    const articles = await getArticlesByBlog(blog._id)
    articles.forEach (article => {
        deleteArticle(article._id)
    })
    res.cookie('token', generateToken({
        _id: user._id,
        username: user.username,
        a2f: false
    }))
    res.status(200).send('ok')
});

// Vérifier un QR code d'un utilisateur
router.get('/login/verify', async (req, res) => {
    const token = req.query.token;
    const user = await getUserById(req.query.user)
    try {
        if (!token) {
            throw new Error("Fournissez un token.");
        }
        // Si le token n'est pas valide, c'est non
        const isValid = authenticator.check(token, user.a2f.secret);
        if (!isValid) {
            res.status(200).json({
                isValid: false
            })
        } else {
            res.cookie('token', generateToken(user))
            res.status(200).json({
                isValid: true
            })
        }
    } catch (err) {
        res.send(err.message);
    }
});

module.exports = router;