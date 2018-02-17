const listHelper = require('../utils/list_helper')
const blogHelper = require('../utils/test_blogs')

describe('favorite blog', () => {
  const oneBlog = blogHelper.listWithOneBlog
  const manyBlogs = blogHelper.getExampleBlogs

  test('when list has only one blog it should be favorite', () => {
    const result = listHelper.favoriteBlog(oneBlog)
    expect(result).toBe(oneBlog[0])
  })

  test('when list has many blogs should blog with most likes be favorite', () => {
    const result = listHelper.favoriteBlog(manyBlogs)
    expect(result).toEqual(manyBlogs[2])
  })
})
