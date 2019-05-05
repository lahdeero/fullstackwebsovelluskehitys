export const notifyAction = (message, time) => {
	console.log('time = ', time)
	return async dispatch => {
		dispatch({
			type: 'NOTIFY',
			data: message
		})

		setTimeout(() => {
			dispatch({
				type: 'HIDE',
				data: ''
			})
		}, time * 1000)
	}
}

const notificationReducer = (state = '', action) => {
	console.log('notification = ', state)
	switch (action.type) {
		case 'NOTIFY':
			return state = action.data
		case 'HIDE':
			return ''
		default:
			return state
	}
}

export default notificationReducer

