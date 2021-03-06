import React from 'react'
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import counterReducer from './reducer'

const Statistiikka = () => {
  const palautteita = 10
  const kaikki = store.getState().good + store.getState().ok + store.getState().bad
  const keskiarvo = store.getState().good * 1 - store.getState().bad
  let positiivisia = (store.getState().good / kaikki * 100).toFixed(2)
  if (isNaN(positiivisia)) {
    positiivisia = 0
  }

  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{store.getState().good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{store.getState().ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{store.getState().bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{keskiarvo}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positiivisia}%</td>
          </tr>
        </tbody>
      </table>

      <button onClick={e => store.dispatch({ type: 'ZERO' })}>nollaa tilasto</button>
    </div>
  )
}

const store = createStore(counterReducer) 

class App extends React.Component {
  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={e => store.dispatch({ type: 'GOOD' })}>hyvä</button>
        <button onClick={e => store.dispatch({ type: 'OK' })}>neutraali</button>
        <button onClick={e => store.dispatch({ type: 'BAD' })}>huono</button>
        <Statistiikka />
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
