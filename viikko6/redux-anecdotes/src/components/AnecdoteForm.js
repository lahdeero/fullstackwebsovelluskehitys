import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addAction } from '../reducers/anecdoteReducer'
import { notifyAction } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const [state, setState] = useState('')

  const addAnecdote = async (event) => {
    event.preventDefault()
    setState('')
		const content = event.target.content.value
		// anecdoteService.createNew(event.target.content.value)
		// 	.then(data => props.addAction(data.content))
		await props.addAction(content)	

		props.notifyAction(`you created '${content}'`, 5)
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
		notifyAction: (message, time) => {
			dispatch(notifyAction(message, time))
		},
	}
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
