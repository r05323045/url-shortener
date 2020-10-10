const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  input_url: {
    type: String,
    required: true
  },
  output_url: {
    type: String
  }
})
module.exports = mongoose.model('Shortener', todoSchema)
