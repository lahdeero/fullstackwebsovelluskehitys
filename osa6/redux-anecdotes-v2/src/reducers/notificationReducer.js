const notificationReducer = (store = ' ', action) => {
  switch (action.type) {
    case 'NOTIFY':
      store = action.data
      return [...store, action.data.notification]
    case 'HIDE_NOTIFICATION':
      store = ''
      return store
    default:
      return store
  }
}

export const notify = (notification, timer) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFY',
      data: notification,
      timer
    })
    setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' })
    }, timer * 1000)
  }
}

export default notificationReducer
