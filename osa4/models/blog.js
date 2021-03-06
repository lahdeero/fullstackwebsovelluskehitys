const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

blogSchema.statics.format = (blog) => {
  return {
    _id: blog.id,
    user: blog.user,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
