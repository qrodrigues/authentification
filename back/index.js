const express = require('express')
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session')

const accountRouter = require('./src/Authentication/account');
const blogRouter = require('./src/blog');
const articleRouter = require('./src/article')
const a2fRouter = require('./src/Authentication/a2f')
const loginRouter = require('./src/Authentication/login')
const app = express()
require('dotenv').config();
const port = 3000

// Allow cookies axios
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cookieParser());

app.use(
  cookieSession({
    name: 'session',
    keys: ['macledecookiesecret'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
)

// Route de gestion de compte
app.use('/account', accountRouter);

// Route de login
app.use('/auth', loginRouter);

// Route de double authentification
app.use('/a2f', a2fRouter)

// Routes de blogs
app.use('/blog', blogRouter);

// Route d'articles
app.use('/article', articleRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening on port ${port}`)
})