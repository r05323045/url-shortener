function randomNum () {
  const num = 48 + Math.ceil((Math.random() * 74))
  if ((num > 90 && num < 97) || (num > 57 && num < 65)) {
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
  const result = randomWords(5)
  return result
}

module.exports = urlShortener
