import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import userService from '../services/users'

const User = (props) => {
  const [name, setName] = useState('')
  // console.log(match)
  useEffect(() => {
    userService.getOne(props.match.params.id).then(
      user => {
        console.log(user)
        setName(user.name)
      })
  }, [props.match.params.id])

  console.log(props.blogs)
  return (
    <div>
      <h2>{name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {props.blogs.map(blog => blog.user.name === name &&
          <li key={Math.random(10000)}>
            {blog.title}
          </li>
        )}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

const ConnectedUser = connect(mapStateToProps)(User)

export default ConnectedUser