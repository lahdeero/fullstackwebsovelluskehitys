import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'
import Togglable from './components/Togglable'

describe('<App />', () => {
  let app
  beforeEach(() => {
    app = mount(<App />)
  })

  it('when not logged show just loginform', () => {
    app.update()
    const blogComponents = app.find(Blog)
    const loginFormDiv = app.find('.loginForm')
    expect(loginFormDiv.text()).toContain('käyttäjätunnus')
    expect(loginFormDiv.text()).toContain('salasana')
    expect(blogComponents.length).toEqual(0)
  })
})
describe('when user is logged', () => { 
  let app
  beforeEach(() => {
    const user = {
      username: 'tester',
      name: 'Teemu Testaaja',
      token: '1231231234'
    }
    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    app = mount(<App />)
  })
  it('user\'s name is shown', () => {
    app.update()
    const userLoggedInDiv = app.find('.userLoggedIn')
    expect(userLoggedInDiv.text()).toContain('Teemu Testaaja')
  })

  it('all blogs are rendered', () => {
    app.update()
    const blogComponents = app.find(Blog)
    expect(blogComponents.length).toEqual(blogService.blogs.length)
  })
})
