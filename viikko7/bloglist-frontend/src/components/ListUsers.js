import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import usersService from '../services/users'
import { Table } from 'reactstrap'

const ListUsers = (props) => {

  useEffect(() => {
    usersService.getAll().then(users => {
      props.setUsers(users)
    })
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <th>username</th>
            <th><b>blogs created</b></th>
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
      </Table>
    </div>
  )

}

export default ListUsers