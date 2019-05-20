import React from 'react'
import Notification from './Notification'

const LoginForm = (props) => {
  return (
    <div className="loginForm">
      <Notification error={props.error} />
      <Notification message={props.message} />
      <h2>Kirjaudu</h2>
  
      <form onSubmit={props.login}>
        <div>
          käyttäjätunnus
          <input
            type="text"
            name="username"
            value={props.username}
            onChange={props.handleLoginFieldChange}
          />
        </div>
        <div>
          salasana
          <input
            type="password"
            name="password"
            value={props.password}
            onChange={props.handleLoginFieldChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

export default LoginForm
