import blogService from '../services/blogs'

export const initializeBlogs = (blogs) => {
  return async dispatch => {
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}
export const addBlogAction = (blog) => {
  return async dispatch => {
    const createdBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD',
      data: createdBlog
    })
    return createdBlog
  }
}
export const likeBlogAction = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update({...blog, likes: blog.likes + 1})
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
    return updatedBlog
  }
}

export const removeBlogAction = (blog) => {
  return async dispatch => {
    const response = await blogService.remove(blog)
    console.log('response = ', response)
    dispatch({
      type: 'REMOVE',
      data: blog
    })
    return blog
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'ADD':
      return state.concat(action.data)
    case 'LIKE':
      return state.map(b => b.id === action.data.id ? action.data : b)
    case 'REMOVE':
      return state.filter(blog => blog.id !== action.data.id)
    default:
      return state
  }
}

export default blogReducer

