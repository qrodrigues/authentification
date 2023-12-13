const express = require('express')
const cors = require('cors')

const accountRouter = require('./account');

const app = express()
const port = 3000

// Allow cookies axios
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.use('/account', accountRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})