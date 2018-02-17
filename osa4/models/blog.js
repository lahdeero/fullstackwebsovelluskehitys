const mongoose = require('mongoose')

const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise

const Blog = mongoose.model('Blog', {
  title: String,
  author: String,
  url: String,
  likes: Number
})

module.exports = Blog
