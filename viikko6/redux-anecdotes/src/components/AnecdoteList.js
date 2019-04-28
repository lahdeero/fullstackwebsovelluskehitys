import React from 'react'
import { voteAction } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  const store = props.store
  const anecdotes = props.store.getState()

  const vote = (id) => {
    console.log('vote', id)
    store.dispatch(
      voteAction(id)
    )
  }

  return (
    <div>
      {
        anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}
export default AnecdoteList
