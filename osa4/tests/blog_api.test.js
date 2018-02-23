const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

describe('when there is initially some blogs saved', async () => {
  beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = helper.initialBlogs.map(b => new Blog(b))
    await Promise.all(blogObjects.map(b => b.save()))
  })

  test('blogs are returned as json by GET /api/blogs', async () => {
    const blogsInDatabase = await helper.blogsInDb()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(blogsInDatabase.length)

    const returnedTitles = response.body.map(b => b.title)
    blogsInDatabase.forEach(blog => {
      expect(returnedTitles).toContain(blog.title)
    })
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
  describe('POST /api/blogs succeeds with valid data', async () => {

    test('Blog can be added', async () => {
      const blogsBefore = await helper.blogsInDb()
      const newBlog = {
        title: 'Testi blogi by testaaja',
        author: 'Testaaja',
        url: 'http://localhost/api/blogs/1337',
        likes: '5'
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const response = await api
        .get('/api/blogs')
    
      const authors = response.body.map(r => r.author)
    
      expect(response.body.length).toBe(blogsBefore.length + 1)
      expect(authors).toContain('Testaaja')
    })
    
    test('If no likes, set likes to 0', async () => {
      const newBlog = {
        title: 'Nobody likes me',
        author: 'Lonely guy',
        url: 'http://localhost/api/blogs/101010'
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const response = await api
        .get('/api/blogs')
    
      expect(response.body[response.body.length-1].title).toContain('Nobody likes me')
      expect(response.body[response.body.length-1].likes).toBe(0)
    
    }) 
    test('Blog needs to have title and url', async () => {
      const blogsBefore = await helper.blogsInDb()
      const newBlog = {
        author: 'No title or url',
        likes: '3'
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
      const response = await api
        .get('/api/blogs')

      expect(response.body.length).toBe(blogsBefore.length)
    }) 
    test('DELETE /api/blogs/:id succeeds with proper statuscode', async () => {
      const newBlog = {
        title: 'This will be short blog',
        author: 'Born to die',
        url: 'http://localhost/api/blogs/h3ll',
        likes: '666'
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api
        .get('/api/blogs')

      const idOfSoonDeleted = response.body[response.body.length-1].id

      await api
        .delete(`/api/blogs/${idOfSoonDeleted}`)
        .expect(204)
    })
  })
  afterAll(() => {
    server.close()
  })
})
