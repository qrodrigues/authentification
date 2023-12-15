const express = require('express');
const passport = require('passport')
require('./passport')
const bodyParser = require('body-parser');
const router = express.Router();
const { generateToken } = require('./src/bcryptRepository')

const CLIENT_URL = "http://localhost:5173/"

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'failure'
    })
})

router.get('/login/success', (req, res) => {
    console.log('ici');
    if (req.user) {
        res.status(200).json({
            success: true,
            message: 'successfull',
            user: req.user
        })
    } else {
        res.status(400).send()
    }
})

// router.get('/logout', (req, res) => {
//     req.logOut();
//     res.redirect(CLIENT_URL);
// })

router.get('/google', passport.authenticate('google', {scope: ["profile"], session: false}))

router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', {
        successRedirect: CLIENT_URL,
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

        // Créer le cookie de session
        res.cookie('token', generateToken(user))
        res.status(200).redirect(CLIENT_URL)
    }
    )(req, res, next)
}
)

router.get('/github', passport.authenticate('github', {scope: ["profile"], session: false}))

router.get('/github/callback', (req, res, next) => {
    passport.authenticate('github', {
        successRedirect: CLIENT_URL,
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

        // Créer le cookie de session
        res.cookie('token', generateToken(user))
        res.status(200).redirect(CLIENT_URL)
    }
    )(req, res, next)
}
)

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

            req.logIn(user, (err) => {
                if (err) return next(err)
                res.status(200).json({
                    redirectTo: '/'
                })
            })
        }
    )(req, res, next)
}
)

router.use(passport.initialize())
router.use(passport.session())

module.exports = router;