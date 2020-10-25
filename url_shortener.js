const Shortener = require('./models/shortener')

function randomNum () {
  const num = 65 + Math.ceil((Math.random() * 56))
  console.log(num)
  if (num > 90 && num < 97) {
    return randomNum()
  } else {
    return num
  }
}

function randomWords (len) {
  let words = ''
  for (let i = 0; i < len; i++) {
    words += String.fromCharCode(randomNum())
  }
  return words
}

function urlShortener () {
  Shortener.find()
    .lean()
    .then(urls => {
      const result = randomWords()
      urls.forEach(url => {
        const output = url.output_url.slice(url.output_url.length - 5, url.output_url.length)
        if (result === output) {
          return urlShortener()
        } else {
          return 'http://localhost:3000/' + result
        }
      })
    })
}

module.exports = urlShortener
