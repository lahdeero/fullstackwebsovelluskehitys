const listHelper = require('../utils/list_helper')
const { initialBlogs,listWithOneBlog } = require('./test_helper')

describe('favorite blog', () => {
  const oneBlog = listWithOneBlog
  const manyBlogs = initialBlogs

  test('when list has only one blog it should be favorite', () => {
    const result = listHelper.favoriteBlog(oneBlog)
    expect(result).toBe(oneBlog[0])
  })

  test('when list has many blogs should blog with most likes be favorite', () => {
    const result = listHelper.favoriteBlog(manyBlogs)
    expect(result).toEqual(manyBlogs[2])
  })
})
