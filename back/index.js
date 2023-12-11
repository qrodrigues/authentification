const express = require('express')
const app = express()
const port = 3000

app.post('/account/create', (req, res) => {
  res.status(200).send('Account created!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})