const listHelper = require('../utils/list_helper')

describe('total likes', () => {

  const blog = { _id: '5a422aa71b54a676234d17f8', title:'Eka blogi', author:'Matti', url:'http://localhost/api/blogs/1', likes:5, __v:0 }
  const blog2 = { _id: '5a422aa71b54a956234d17f3', title:'Toka blogi', author:'Pertti', url:'http://localhost/api/blogs/2', likes:7, __v:0 }
  const blog3 = { _id: '5a777aa71b54a676234d17f1', title:'Kolmas blogi', author:'Seija', url:'http://localhost/api/blogs/3', likes:5, __v:0 }


  let listWithThreeBlogs = []
  listWithThreeBlogs.push(blog)
  listWithThreeBlogs.push(blog2)
  listWithThreeBlogs.push(blog3)

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('when list has three blogs equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithThreeBlogs)
    expect(result).toBe(17)
  })
})
