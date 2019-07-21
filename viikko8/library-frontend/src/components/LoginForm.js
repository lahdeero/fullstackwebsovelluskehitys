import React, { useState } from 'react'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = (e) => {
    e.preventDefault()

    props.login({
      variables: { username, password }
    }).then(res => {
      const token = res.data.login.value
      props.setToken(token)
      localStorage.setItem('lbToken', token)
      setUsername('')
      setPassword('')
      props.setPage('authors')
    })
  }

  if (!props.show) {
    return null
  }
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name: <input value={username} onChange={({ target }) => setUsername(target.value)}></input>
        </div>
        <div>
          password: <input value={password} onChange={({ target }) => setPassword(target.value)}></input>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login