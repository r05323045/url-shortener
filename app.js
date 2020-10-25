const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
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

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Shortener.find()
    .lean()
    .then(urls => res.render('index', { urls }))
    .catch(error => console.error(error))
})

app.post('/', (req, res) => {
  const url = req.body
  return Shortener.find()
    .lean()
    .then(urls => {
      urls.forEach(url => {
        console.log(url.output_url)
      })
      const output_url = "https://www.google.com.tw/"
      res.render('result', { output_url })
    })
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
