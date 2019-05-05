import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import Filter from './components/Filter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = (props) => {
	useEffect(() => {
		anecdoteService
			.getAll().then(anecdotes => props.initializeAnecdotes(anecdotes))
	},[props])

  return (
    <div>
      <h2>Programming anecdotes</h2>
			<Notification />
			<Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default connect(null, { initializeAnecdotes })(App)
