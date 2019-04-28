import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)
const generateId = () => Number((Math.random() * 1000000).toFixed(0))

class App extends React.Component {

  voteAnecdote = (anecdote) => (event) => {
    event.preventDefault()
    store.dispatch({
      type: 'VOTE',
      data: {
        content: anecdote.content,
        id: anecdote.id,
        votes: anecdote.votes + 1
      }
    })
  }
  addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    store.dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: anecdote,
        id: generateId(),
        votes: 0
      }
    })
  }

  render() {
    const anecdotes = store.getState().sort(function(a,b) {
      return b.votes - a.votes
    })
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteAnecdote(anecdote)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp()
store.subscribe(renderApp)

export default App
