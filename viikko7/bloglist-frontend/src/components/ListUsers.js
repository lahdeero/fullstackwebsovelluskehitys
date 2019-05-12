import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import usersService from '../services/users'

const ListUsers = (props) => {

  useEffect(() => {
    usersService.getAll().then(users => {
      props.setUsers(users)
    })
  }, [])

  return (
    <div>
      <h2>Users:</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td><b>blogs created</b></td>
          </tr>
        </thead>
        <tbody>
          {props.users.map(user =>
            <tr key={user.name}>
              <td><Link to={`/users/${user.id}`}> {user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )

}

export default ListUsers