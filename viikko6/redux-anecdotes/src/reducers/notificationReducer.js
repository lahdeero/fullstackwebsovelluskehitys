export const notifyAction = (message) => {
	return {
		type: 'NOTIFY',
		data: message
	}
}

const notificationReducer = (state = '', action) => {
	console.log('notification = ', state)
	switch (action.type) {
		case 'NOTIFY':
			return state = action.data
		default:
			return state
	}
}

export default notificationReducer

