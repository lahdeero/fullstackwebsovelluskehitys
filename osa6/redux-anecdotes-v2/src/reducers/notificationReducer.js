const notificationReducer = (store = ' ', action) => {
  switch(action.type) {
    case 'VOTE':
      store = 'you voted \'' + action.anecdote.content + '\''
      return store
    case 'HIDE_NOTIFICATION':
      store = ''
      return store
    default:
      store = ' '
     return store
  }
}

export const actionForNotification = {
  notifyVote(anecdote) {
    return {
      type: 'VOTE',
      anecdote
    }
  },
  hideNotification() {
    console.log('tulee hidenotification')
    return {
      type: 'HIDE_NOTIFICATION'
    }
  }
}

export default notificationReducer
