import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {
  voteAnecdote = (anecdote) => async (event) => {
    event.preventDefault()
    await anecdoteService.vote(anecdote.id, anecdote)
    this.props.voteAnecdote(anecdote)
  }

  render() {
    const filter = this.props.filter
    const anecdotes = this.props.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    console.log(this.props)
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
  voteAnecdote
}
const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
