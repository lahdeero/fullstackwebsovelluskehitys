import blogService from '../services/blogs'

export const loginAction = (user) => {
  return async dispatch => {
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}
export const logoutAction = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT',
      data: null
    })
  }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return (state = null)
    default:
      return state
  }
}

export default userReducer