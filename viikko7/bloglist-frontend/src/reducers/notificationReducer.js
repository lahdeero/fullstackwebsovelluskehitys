const notificationReducer = (state = {}, action) => {
  console.log('notification = ', state)
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
  console.log('time = ', time)
  return async (dispatch) => {
    console.log('meneee tokaa')
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