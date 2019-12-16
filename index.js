const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

require('./routes/routes')(app)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
