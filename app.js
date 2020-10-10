const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Shortener = require('./models/shortener')

const app = express()

mongoose.connect('mongodb://localhost/url-shortener', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  Shortener.find()
    .lean()
    .then(urls => res.render('index', { urls }))
    .catch(error => console.error(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
