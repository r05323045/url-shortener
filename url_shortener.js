function randomNum () {
  let num = '0'.charCodeAt() + Math.floor((Math.random() * ('z'.charCodeAt() - '0'.charCodeAt())))
  while ((num > 'Z'.charCodeAt() && num < 'a'.charCodeAt()) || (num > '9'.charCodeAt() && num < 'A'.charCodeAt())) {
    num = '0'.charCodeAt() + Math.floor((Math.random() * ('z'.charCodeAt() - '0'.charCodeAt())))
  }
  return num
}

function randomWords (len) {
  let nums = []
  const isAllNum = (num) => (num <= '9'.charCodeAt())
  const isAllLetter = (num) => (num > '9'.charCodeAt())
  while (nums.every(isAllNum) || nums.every(isAllLetter)) {
    nums = []
    for (let i = 0; i < len; i++) {
      nums.push(randomNum())
    }
  }
  let words = ''
  for (let i = 0; i < len; i++) {
    words += String.fromCharCode(nums[i])
  }
  return words
}

function urlShortener () {
  const result = randomWords(5)
  return result
}

module.exports = urlShortener
