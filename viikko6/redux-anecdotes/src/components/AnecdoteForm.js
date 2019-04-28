import React, { useState } from 'react'
import { addAction } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const store = props.store
  const [state, setState] = useState('')

  const addAnecdote = (event) => {
    event.preventDefault()
    setState('')
    store.dispatch(
      addAction(event.target.content.value)
    )
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
export default AnecdoteForm
