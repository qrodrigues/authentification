const express = require('express');
const passport = require('passport')
require('./passport')
const bodyParser = require('body-parser');
const router = express.Router();

const CLIENT_URL = "http://localhost:5173/"

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'failure'
    })
})

// router.get('/login/success', (req, res) => {
//     if (req.user) {
//         res.status(200).json({
//             success: true,
//             message: 'successfull',
//             user: req.user
//         })
//     }
// })

// router.get('/logout', (req, res) => {
//     req.logOut();
//     res.redirect(CLIENT_URL);
// })

router.get('/google', passport.authenticate('google', {scope: ["profile"]}))

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed"
}))

router.get('/github', passport.authenticate('github', {scope: ["profile"]}))

router.get('/github/callback', passport.authenticate('github', {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed"
}))

router.post('/login', bodyParser.json(), (req, res, next) => {
    passport.authenticate(
        'local',
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

router.get('/local/callback', passport.authenticate('local', {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed"
}))

router.use(passport.initialize())
router.use(passport.session())

module.exports = router;