const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const urlShortener = require('./url_shortener')
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
  const input_url = req.body.url
  return Shortener.find()
    .lean()
    .then(urls => {
      let output_url = urlShortener()
      urls.forEach(url => {
        const output = url.output_url.slice(url.output_url.length - 5, url.output_url.length)
        if (output_url === output) {
          output_url = urlShortener()
        }
      })
      Shortener.create({input_url: input_url, output_url: output_url})
      res.render('result', { output_url: 'http://localhost:3000/' + output_url})
    })
    .catch(error => console.log(error))
})

app.get('/:output_url', (req, res) => {
  const output_url = req.params.output_url
  Shortener.find()
    .lean()
    .then(urls => 
      urls.forEach(url => {
        if (url.output_url === output_url) {
          res.redirect(url.input_url)
        }
      })
    )
    .catch(error => console.error(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
