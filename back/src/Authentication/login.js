const express = require('express');
const passport = require('passport')
require('./passport')
const bodyParser = require('body-parser');
const router = express.Router();
const { generateToken } = require('../Repository/bcryptRepository')
require('dotenv').config();

// Google
router.get('/google', passport.authenticate('google', {scope: ["profile"], session: false}))
router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/login/failed",
        session: false
    }, (err, user, next) => {
        if (err) {
            return res.status(401).json({
                timestamp: Date,
                msg: 'Access denied',
                code: 401
            })
        }

        if (!user) {
            return res.status(401).json({
                timestamp: Date,
                msg: 'Unauthorised user',
                code: 401
            })
        }

        // L'utilisateur n'a pas l'A2F
        if (!user.a2f) {
            res.cookie('token', generateToken(user))
            res.status(200).redirect(process.env.CLIENT_URL)
        } else {
            // L'utilisateur a l'A2F
            res.status(200).redirect(`http://localhost:5173/login/a2f/${user._id}`)
        }
    }
    )(req, res, next)
}
)

// Github
router.get('/github', passport.authenticate('github', {scope: ["profile"], session: false}))
router.get('/github/callback', (req, res, next) => {
    passport.authenticate('github', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/login/failed",
        session: false
    }, (err, user, next) => {
        if (err) {
            return res.status(401).json({
                timestamp: Date,
                msg: 'Access denied',
                code: 401
            })
        }

        if (!user) {
            return res.status(401).json({
                timestamp: Date,
                msg: 'Unauthorised user',
                code: 401
            })
        }

        // L'utilisateur n'a pas l'A2F
        if (!user.a2f) {
            res.cookie('token', generateToken(user))
            res.status(200).redirect(process.env.CLIENT_URL)
        } else {
            // L'utilisateur a l'A2F
            res.status(200).redirect(`http://localhost:5173/login/a2f/${user._id}`)
        }
    }
    )(req, res, next)
}
)

// Local
router.post('/login', bodyParser.json(), (req, res, next) => {
    passport.authenticate(
        'local',
        { session: false },
        (err, user) => {
            if (err) {
                return res.status(401).json({
                    timestamp: Date,
                    msg: 'Access denied',
                    code: 401
                })
            }

            if (!user) {
                return res.status(401).json({
                    timestamp: Date,
                    msg: 'Unauthorised user',
                    code: 401
                })
            }

            // L'utilisateur n'a pas l'A2F
            if (!user.a2f) {
                res.cookie('token', generateToken(user))
                res.status(200).json({
                    redirectTo: '/'
                })
            } else {
                // L'utilisateur a l'A2F
                res.status(200).json({
                    redirectTo: `/login/a2f/${user._id}`
                })
            }

        }
    )(req, res, next)
}
)

// Failure
router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'failure'
    })
})

router.use(passport.initialize())
router.use(passport.session())

module.exports = router;