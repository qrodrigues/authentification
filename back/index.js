const express = require('express')
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session')

const accountRouter = require('./account');
const blogRouter = require('./blog');
const articleRouter = require('./article')
const externalAutenticationRouter = require('./externalAuthentication')
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

app.use('/account', accountRouter);
app.use('/auth', externalAutenticationRouter);
app.use('/blog', blogRouter);
app.use('/article', articleRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening on port ${port}`)
})