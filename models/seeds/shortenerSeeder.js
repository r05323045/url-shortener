const mongoose = require('mongoose')
const Shortener = require('../shortener')
mongoose.connect('mongodb://localhost/url-shortener', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Shortener.create(
    { input_url: 'https://www.google.com.tw/', output_url: 'http://localhost:3000/6y7UP' },
    { input_url: 'https://www.facebook.com/', output_url: 'http://localhost:3000/jcmB3' },
    { input_url: 'https://developer.mozilla.org/en-US/', output_url: 'http://localhost:3000/Ecp3Y' }
  )
  console.log('done')
})
