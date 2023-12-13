const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');

const accountRouter = require('./account');

const app = express()
const port = 3000

app.use(cors())
app.use(cookieParser())
app.use('/account', accountRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})