const listHelper = require('../utils/list_helper')
const { initialBlogs } = require('./test_helper')

describe('most blogs', () => {
  const manyBlogs = initialBlogs

  test('Robert C. Martin has most blogs: three', () => {
    const result = listHelper.mostBlogs(manyBlogs)
    expect(result.author).toEqual('Robert C. Martin')
    expect(result.number).toBe(3)
  })
})
