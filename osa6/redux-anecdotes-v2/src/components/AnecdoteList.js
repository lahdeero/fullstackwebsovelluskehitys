import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  voteAnecdote = (anecdote) => async (event) => {
    event.preventDefault()
    this.props.voteAnecdote(anecdote)
    this.props.notify(`you voted '${anecdote.content}'`, 10)
  }

  render() {
    const filter = this.props.filter
    const anecdotes = this.props.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
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

const mapStateToProps = (store) => {
  return {
    anecdotes: store.anecdotes,
    filter: store.filter
  }
}
const mapDispatchToProps = {
  voteAnecdote,
  notify
}
const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
