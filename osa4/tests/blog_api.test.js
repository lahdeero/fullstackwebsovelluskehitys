const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const blogHelper = require('../utils/test_blogs')

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are six blogs', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body.length).toBe(6)
})

test('the first blog is about React patterns', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body[0].title).toBe('React patterns')
})

const initialBlogs = blogHelper.getExampleBlogs

beforeAll(async () => {
  await Blog.remove({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

afterAll(() => {
  server.close()
})
