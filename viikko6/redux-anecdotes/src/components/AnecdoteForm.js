import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addAction } from '../reducers/anecdoteReducer'
import { notifyAction } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const [state, setState] = useState('')

  const addAnecdote = (event) => {
    event.preventDefault()
    setState('')
    props.addAction(event.target.content.value)
		props.notifyAction(`you created ${event.target.content.value}`)
		setTimeout(() => {
			props.notifyAction('')
		}, 5000)
  }
  const changeValue = (event) => {
    setState(event.target.value)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="content" onChange={changeValue} value={state} /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
	return {
		addAction: content => {
			dispatch(addAction(content))
		},
		notifyAction: message => {
			dispatch(notifyAction(message))
		},
	}
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
