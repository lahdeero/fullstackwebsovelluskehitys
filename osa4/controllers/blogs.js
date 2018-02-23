const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(formatBlog))
})
blogsRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)

    if (blog) response.json(formatBlog(blog))
    else response.status(404).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body)

    if (blog.title === undefined || blog.url === undefined) {
      return response.status(400).json({ error: 'title or url missing' })
    }
    if (blog.likes === undefined) blog.likes = 0

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong..' })
  }
})
blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).json({ error: 'malformatted id' })
  } 
})

module.exports = blogsRouter
