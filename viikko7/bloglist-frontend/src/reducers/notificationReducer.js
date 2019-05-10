const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return { ...state, message: action.data.message }
    case 'HIDE':
      return {}
    default:
      return state
  }
}

export const notifyAction = (message, notificationType, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFY',
      data: { message, type: notificationType }
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE',
        data: ''
      })
    }, time * 1000)
  }
}

export default notificationReducer