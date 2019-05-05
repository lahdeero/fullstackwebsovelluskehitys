import React from 'react'
import { connect } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { notifyAction } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (id) => {
    console.log('vote', id)
    props.voteAction(id)
		const anecdote = props.anecdotes.filter(anecdote => anecdote.id === id)[0]
		console.log('anecdote = ', anecdote)
		props.notifyAction(`you voted ${anecdote.content}`)
		setTimeout(() => {
			props.notifyAction('')
		}, 5000)
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
		notifyAction: message => {
			dispatch(notifyAction(message))
		},
		voteAction: id => {
			dispatch(voteAction(id))
		},
	}
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList
