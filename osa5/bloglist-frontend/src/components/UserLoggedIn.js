import React from 'react'

const UserLoggedIn = (props) => {
  return (
    <div>
      {props.user.name} kirjautunut sisään  
      <form onSubmit={props.logout}>
        <button type="submit">kirjaudu ulos</button>
      </form>
    </div>
  )
}

export default UserLoggedIn
