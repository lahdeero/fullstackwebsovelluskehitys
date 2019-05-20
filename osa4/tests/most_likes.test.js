const listHelper = require('../utils/list_helper')
const { initialBlogs } = require('./test_helper')

describe('most likes in blogs', () => {
  const manyBlogs = initialBlogs

  test('Everyone likes Dijkstra', () => {
    const result = listHelper.mostLikes(manyBlogs)
    expect(result.author).toEqual('Edsger W. Dijkstra')
    expect(result.number).toBe(17)
  })
})
