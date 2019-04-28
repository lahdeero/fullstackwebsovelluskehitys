import React from 'react'
import Notification from './components/Notification'
import PropTypes from 'prop-types'
import Filter from './components/Filter'
import { connect } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import {anecdoteInitialization} from './reducers/anecdoteReducer'

class App extends React.Component {
  static propTypes = {
    anecdoteInitialization: PropTypes.func.isRequired
  }
  componentDidMount ()  {
    this.props.anecdoteInitialization()
  }

  render () {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <Filter />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}

export default connect(
  null, { anecdoteInitialization }
)(App)
