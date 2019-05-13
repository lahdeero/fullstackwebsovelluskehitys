import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import blogService from '../services/blogs'
import { logoutAction } from '../reducers/userReducer'

const Menu = (props) => {
  const handleLogout = () => {
    blogService.destroyToken()
    window.localStorage.removeItem('loggedBlogAppUser')
    props.logoutAction()
  }

  return (
    <div>
      <div>
        <Link to='/'>Blogs</Link>&nbsp;
        <Link to='/users'>Users</Link>&nbsp;
        {props.user && props.user.name && `${props.user.username} logged in`}&nbsp;
        <button onClick={handleLogout}>logout</button>
      </div>
      <h2>blog app</h2>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = {
  logoutAction
}

const ConnectedMenu = connect(mapStateToProps, mapDispatchToProps)(Menu)

export default ConnectedMenu

