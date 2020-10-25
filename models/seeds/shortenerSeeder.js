const Shortener = require('../shortener')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  Shortener.create(
    { input_url: 'https://www.google.com.tw/', output_url: '6y7UP' },
    { input_url: 'https://www.facebook.com/', output_url: 'jcmB3' },
    { input_url: 'https://developer.mozilla.org/en-US/', output_url: 'Ecp3Y' }
  )
  console.log('done')
})
