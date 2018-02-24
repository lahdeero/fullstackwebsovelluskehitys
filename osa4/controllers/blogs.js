const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs.map(Blog.format))
})
blogsRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)

    if (blog) response.json(Blog.format)
    else response.status(404).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  try {
    const decodedToken = await jwt.verify(request.token, process.env.SECRET)
    console.log(decodedToken)

    if(!decodedToken || !decodedToken.id) return response.status(401).json({ error: 'token missing or invalid' })

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id
    })

    if (blog.title === undefined || blog.url === undefined) {
      return response.status(400).json({ error: 'title or url missing' })
    }
    if (blog.likes === undefined) blog.likes = 0

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.json(Blog.format(savedBlog))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong..' })
  }

})
blogsRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = await jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken || !decodedToken.id) return response.status(401).json({ error: 'token missing or invalid' })
    const user = await User.findById(decodedToken.id)

    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'permission denied (not your blog)' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).json({ error: 'malformatted id' })
  }
})
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).json({ error: 'malformatted id' })
  }
})

module.exports = blogsRouter
