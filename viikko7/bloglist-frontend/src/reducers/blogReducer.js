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
    dispatch({
      type: 'ADD',
      data: blog
    })
  }
}
export const likeBlogAction = (blog) => {
  return async dispatch => {
    dispatch({
      type: 'LIKE',
      data: blog
    })
  }
}

export const removeBlogAction = (blog) => {
  return async dispatch => {
    dispatch({
      type: 'REMOVE',
      data: blog
    })
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
      return state.filter(blog => blog.id === action.data.id)
    default:
      return state
  }
}

export default blogReducer

