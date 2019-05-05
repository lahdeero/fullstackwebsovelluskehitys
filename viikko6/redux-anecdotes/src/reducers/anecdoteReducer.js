import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
export const initializeAnecdotes = (anecdotes) => {
	return {
		type: 'INIT_ANECDOTES',
		data: anecdotes
	}
}

export const voteAction = (anecdote) => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.vote(anecdote)
		console.log('newAnecdote = ', newAnecdote)
  	dispatch({
  	  type: 'VOTE',
  	  data: newAnecdote
  	})
	}
}
export const addAction = content => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content)
  	dispatch({
  	  type: 'ADD',
  	  data: newAnecdote
  	})
	}
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
		case 'INIT_ANECDOTES':
			return action.data
    case 'VOTE':
      return state.map(anecdote =>
        anecdote.id === action.data.id ? action.data : anecdote
      ).sort((a, b) => { return b.votes - a.votes })
    case 'ADD':
      return state.concat(action.data)
    default:
      return state
  }
}

export default anecdoteReducer
