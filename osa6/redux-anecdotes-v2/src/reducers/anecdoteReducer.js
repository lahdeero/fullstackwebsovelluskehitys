import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  if (action.type === 'VOTE') {
    const id = action.data.id
    const anecdoteToVote = store.find(n => n.id === id)
    const votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 } 
    return store.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
  }
  if (action.type === 'CREATE') {
    return [...store, action.data]
  }
  if (action.type === 'INIT_ANECDOTES') {
    return action.anecdotes
  }

  return store
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote 
    })
  }
}
export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = {
      id: anecdote.id,
      content: anecdote.content,
      votes: anecdote.votes + 1
    }
    await anecdoteService.vote(anecdote.id, votedAnecdote)
    dispatch({
      type: 'VOTE',
      data: { id: anecdote.id }
    })
  }
}

export default anecdoteReducer
