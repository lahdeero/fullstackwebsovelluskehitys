import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import { useField } from './hooks'
import { notifyAction } from './reducers/notificationReducer'
import { initializeBlogs, addBlogAction, likeBlogAction, removeBlogAction } from './reducers/blogReducer'
import ListBlogs from './components/ListBlogs';
import { loginAction, logoutAction } from './reducers/userReducer'

const App = (props) => {
  const [username] = useField('text')
  const [password] = useField('password')

  useEffect(() => {
    if (props.user !== null) {
      blogService
        .getAll().then(blogs => props.initializeBlogs(blogs))
    }
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('user parse = ', user)
      blogService.setToken(user.token)
      loginAction(user)
    }
  }, [props])

  // const notify = async (message, type = 'success') => {
  //   // setNotification({ message, type })
  //   // setTimeout(() => setNotification({ message: null }), 10000)
  //   console.log(message, type)
  //   console.log('eka')
  //   await notifyAction(message, type, 5)
  //   console.log('kolmas')
  // }

  // const handleLogin = async (event) => {
  //   event.preventDefault()
  //   try {
  //     const user = await loginService.login({
  //       username: username.value,
  //       password: password.value
  //     })
  //     window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
  //     blogService.setToken(user.token)
  //     window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
  //     loginAction(user)
  //     console.log(user)
  //   } catch (exception) {
  //     notify('wrong username of password', 'error')
  //   }
  // }

  // const handleLogout = () => {
  //   console.log('eka')
  //   blogService.destroyToken()
  //   console.log('toka')
  //   window.localStorage.removeItem('loggedBlogAppUser')
  //   console.log('kolmas')
  //   logoutAction()
  //   console.log('neljäs')
  //   console.log(props.user)
  // }

  if (props.user === null) {
    console.log('on null')
    return (
      <div>
        <h2>log in to application</h2>

        {/* <Notification notification={props.notification} /> */}

        <form>
          <div>
            käyttäjätunnus
          <input {...username} />
          </div>
          <div>
            salasana
          <input {...password} />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <Notification />
        <ListBlogs user={props.user} blogs={props.blogs} />
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