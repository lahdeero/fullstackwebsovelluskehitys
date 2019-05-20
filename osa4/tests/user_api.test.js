const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')

describe.only('when there is initially one user at db', async () => {
  beforeAll(async () => {
    await User.remove({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('POST /api/users succeeds with a fresh username', async () => {
    const usersBeforeOperation = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await helper.usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
    const usernames = usersAfterOperation.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('POST /api/users fails with duplicate username', async () => {
    const usersBeforeOperation = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'salainen',
      password: 'tosisalainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const request = await api
      .get('/api/users')

    expect(request.body.length).toBe(usersBeforeOperation.length)
  })
  test('POST /api/users fails with password length < 3', async () => {
    const usersBeforeOperation = await helper.usersInDb()

    const newUser = {
      username: 'randomguy',
      name: 'randomnezz',
      password: 'pz'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const request = await api
      .get('/api/users')

    expect(request.body.length).toBe(usersBeforeOperation.length)
  })
  afterAll(() => {
    server.close()
  })
})
