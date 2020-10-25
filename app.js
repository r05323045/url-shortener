const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')
require('./config/mongoose')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
