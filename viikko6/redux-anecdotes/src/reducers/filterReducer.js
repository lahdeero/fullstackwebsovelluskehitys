export const filterAction = (filter) => {
	return {
		type: 'FILTER',
		data: filter
	}
}

const filterReducer = (state = '', action) => {
	switch (action.type) {
		case 'FILTER':
			return state = action.data
		default:
			return state
	}
}

export default filterReducer

