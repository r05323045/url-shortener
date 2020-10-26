const express = require('express')
const router = express.Router()

const urlShortener = require('../../url_shortener')
const Shortener = require('../../models/shortener')

router.get('/', (req, res) => {
  Shortener.find()
    .lean()
    .then(urls => res.render('index', { urls }))
    .catch(error => console.error(error))
})

router.post('/', (req, res) => {
  const inputUrl = req.body.url
  return Shortener.find()
    .lean()
    .then(urls => {
      let outputUrl = urlShortener()
      urls.forEach(url => {
        const output = url.output_url.slice(url.output_url.length - 5, url.output_url.length)
        if (outputUrl === output) {
          outputUrl = urlShortener()
        }
      })
      Shortener.create({ input_url: inputUrl, output_url: outputUrl })
      res.render('result', { output_url: 'https://shorten-the-url.herokuapp.com/' + outputUrl })
    })
    .catch(error => console.log(error))
})

router.get('/:output_url', (req, res) => {
  const outputUrl = req.params.output_url
  Shortener.find()
    .lean()
    .then(urls =>
      urls.forEach(url => {
        if (url.output_url === outputUrl) {
          res.redirect(url.input_url)
        }
      })
    )
    .catch(error => console.error(error))
})

module.exports = router
