import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
	filter: filterReducer,
	anecdotes: anecdoteReducer,
	notification: notificationReducer
})

// anecdoteService.getAll().then(anecdotes =>
// 	store.dispatch(initializeAnecdotes(anecdotes))
// )

const store = createStore(
	reducer, 
	composeWithDevTools(
		applyMiddleware(thunk)
	)
)

const render = () => {
  ReactDOM.render(
		<Provider store={store}>
    	<App />
		</Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
