import React from 'react'
import { connect } from 'react-redux'
import Notification from './Notification'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useField } from '../hooks'
import { loginAction } from '../reducers/userReducer'
import { Button, Input, FormGroup, Form } from 'reactstrap'

const Login = (props) => {
  const [username] = useField('text')
  const [password] = useField('password')

  const notify = async (message, type) => {
    await props.notifyAction(message, type, 5)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      props.loginAction(user)
    } catch (exception) {
      notify('wrong username of password', 'error')
    }
  }

  return (
    <div>
      <h2>log in to Blog app</h2>
      {props.notification && props.notification.message && <Notification />}
      <Form onSubmit={handleLogin}>
        <FormGroup>
          käyttäjätunnus
          <Input id='username' {...username} />
        </FormGroup>
        <FormGroup>
          salasana
          <Input id='password' {...password} />
        </FormGroup>
        <Button outline color="success" type="submit">kirjaudu</Button>
      </Form>
    </div >
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}
const mapDispatchToProps = {
  loginAction
}

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)

export default ConnectedLogin
