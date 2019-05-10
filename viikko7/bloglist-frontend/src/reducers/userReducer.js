export const loginAction = (user) => {
  console.log('login 1')
  console.log('user = ', user)
  return async dispatch => {
    console.log('login 2')
    console.log('user = ', user)
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
  console.log('login 3')
  console.log('action.data = ', action.data)
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