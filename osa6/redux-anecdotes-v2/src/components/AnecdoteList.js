import React from 'react'
import PropTypes from 'prop-types'
import { actionForAnecdote } from '../reducers/anecdoteReducer'
import { actionForNotification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe
  }

  voteAnecdote = (anecdote) => {
    store: PropTypes.object
    return () => {this.context.store.dispatch(actionForAnecdote.vote(anecdote))}
  }

  render() {
    store: PropTypes.object
    const filter = this.context.store.getState().filter
    const anecdotes = this.context.store.getState().anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteAnecdote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteList
