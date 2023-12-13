const express = require('express')
const accountRouter = require('./account');

const app = express()
const port = 3000

// Allow cookies axios
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.use('/account', accountRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})