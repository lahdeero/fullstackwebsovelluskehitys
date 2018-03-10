const anecdoteReducer = (store = [], action) => {
  if (action.type === 'VOTE') {
    const old = store.filter(a => a.id !== action.anecdote.id)
    const voted = store.find(a => a.id === action.anecdote.id)

    return [...old, { ...voted, votes: voted.votes+1} ]
  }
  if (action.type === 'CREATE') {
    return [...store, { content: action.content, id: action.id, votes:0 }]
  }
  if (action.type === 'INIT_ANECDOTES') {
    return action.data
  }

  return store
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

export const createAnecdote = (content, id) => {
  return {
    type: 'CREATE',
    content,
    id
  }
}
export const voteAnecdote = (anecdote) => {
  return {
    type: 'VOTE',
    anecdote
  }
}

export const actionForAnecdote = {
  createNew(content) {
    return {
      type: 'CREATE',
      content
    }
  },
  vote(anecdote) {
    return {
      type: 'VOTE',
      anecdote
    }
  }
}

export default anecdoteReducer
