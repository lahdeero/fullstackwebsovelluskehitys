import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Notification from './components/Notification'
import ListUsers from './components/ListUsers'
import User from './components/User'
import Menu from './components/Menu'
import Login from './components/Login'
import Blog from './components/Blog'
import { notifyAction } from './reducers/notificationReducer'
import { initializeBlogs, addBlogAction, likeBlogAction, removeBlogAction } from './reducers/blogReducer'
import ListBlogs from './components/ListBlogs'
import { loginAction, logoutAction } from './reducers/userReducer'

const App = (props) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      props.loginAction(JSON.parse(loggedUserJSON))
      props.initializeBlogs()
    }
  }, [])

  const blogById = (id) => {
    const ret = props.blogs.find(b => b.id === id)
    return ret
  }

  if (props.user === null) {
    return (
      <Login />
    )
  } else {
    return (
      <div>
        {props.notification && props.notification.message && <Notification />}
        <Router>
          <Menu />
          <Route exact path='/' render={() => <ListBlogs />} />
          <Route exact path='/blogs/:id' render={({ match }) =>
            <Blog blog={blogById(match.params.id)} />
          } />
          <Route exact path='/users' render={() => <ListUsers setUsers={setUsers} users={users} />} />
          <Route exact path='/users/:id' component={User} render={() => <User users={users} />} />
        </Router>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  loginAction,
  logoutAction,
  initializeBlogs,
  addBlogAction,
  likeBlogAction,
  removeBlogAction,
  notifyAction
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp