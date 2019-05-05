import React from 'react'
import Notification from './components/Notification'
import Filter from './components/Filter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = (props) => {
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

export default App
