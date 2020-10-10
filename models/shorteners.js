const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  origin_url: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('Shortener', todoSchema)
