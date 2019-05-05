import React from 'react'
import { connect } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { notifyAction } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = async (id) => {
		const anecdote = props.visibleAnecdotes.filter(anecdote => anecdote.id === id)[0]
    await props.voteAction(anecdote)
		props.notifyAction(`you voted '${anecdote.content}'`, 5)
  }

  return (
    <div>
			{props.visibleAnecdotes.map(anecdote => 
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
	return anecdotes.filter(anecdote => anecdote.content.includes(filter))
}

const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  console.log(state)
  return {
    visibleAnecdotes: anecdotesToShow(state),
  }
}

const mapDispatchToProps = dispatch => {
	return {
		notifyAction: (message, time) => {
			dispatch(notifyAction(message, time))
		},
		voteAction: id => {
			dispatch(voteAction(id))
		},
	}
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList
