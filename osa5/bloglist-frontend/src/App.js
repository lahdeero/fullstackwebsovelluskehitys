import React from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import UserLoggedIn from './components/UserLoggedIn'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlogTitle: '',
      newBlogAuthor: '',
      newBlogUrl: '',
      blogsVisible: true,
      message: null,
      error: null,
      username: '',
      password: '',
      user: null 
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
  
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
      this.setState({ message: 'kirjauduttu sisään' })
      setTimeout(() => {
        this.setState({ message: null })
      }, 3000)
    } catch(exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = async (event) => {
    event.preventDefault() 
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({ username: '', password: '', user: null, message: 'kirjauduttu ulos' })
    setTimeout(() => {
      this.setState({ message: null })
    }, 5000)
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlogChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.newBlogTitle,
      author: this.state.newBlogAuthor,
      url: this.state.newBlogUrl,
      likes: 0
    }
    blogService
      .create(blogObject)
      .then(response => {
        this.setState({
          blogs: this.state.blogs.concat(response),
          message: `Lisättiin blogi otsikolla: '${blogObject.title}', kirjoittajana '${blogObject.author}' joka löytyy osoitteesta
          '${blogObject.url}'`,
          newBlogTitle: '',
          newBlogAuthor: '',
          newBlogUrl: ''
        })
        setTimeout(() => {
          this.setState({message: null})
        }, 5000 )
      })
      .catch(error => {
        alert(`Blogin lisäämisessä tapahtui virhe`)
      })
  } 
  deleteBlog = (id) => {
    return () => {
      const blog = this.state.blogs.find(n => n._id === id)
      if (!window.confirm(`Poistetaanko '${blog.title}' ?`)) return
      blogService
        .erase(id)
        .then(response => {
          this.setState({
            message: `Poistettiin '${blog.title}' tietokannasta`,
            blogs: this.state.blogs.filter(e => !e.title.includes(blog.title))
          })
          setTimeout(() => {
            this.setState({message: null})
          }, 3000)
        })
        .catch(error => {
          alert(`Et voi poistaa tätä blogia`)
        })
    }
  }

  render() {
    const hideWhenVisible = { display: this.state.blogsVisible ? 'none' : '' }
    const showWhenVisible = { display: this.state.blogsVisible ? '' : 'none' }

    if (this.state.user === null) {
      return (
        <div>
          <LoginForm login={this.login} username={this.state.username} handleLoginFieldChange={this.handleLoginFieldChange}
          password={this.state.password} message={this.state.message} error={this.state.error} />        
        </div>
      )
    }

    let sortedBlogs = this.state.blogs
    sortedBlogs.sort(function(a,b) {
      if (a.likes !== b.likes) {
        return b.likes - a.likes
      }
      return b.title.length - a.title.length
    }) 

    return (
      <div>
        <Notification message={this.state.message} error={this.state.error} />

        <h1>Blogit</h1>
        <div className="userLoggedIn">
          <UserLoggedIn user={this.state.user} logout={this.logout}/>
          <NewBlogForm addBlog={this.addBlog} handleBlogChange={this.handleBlogChange} newBlogTitle={this.state.newBlogTitle}
            newBlogAuthor={this.state.newBlogAuthor} newBlogUrl={this.state.newBlogUrl} /> 
        </div>
        <br />
        <br />
        <div className="blogitDiv">
          <div style={hideWhenVisible}>
            <button onClick={e => this.setState({ blogsVisible: true })}>näytä blogit</button>
          </div>
          <div style={showWhenVisible}>
            <button onClick={e => this.setState({ blogsVisible: false })}>piilota blogit</button>
            <h2>Blogit</h2>
            {this.state.blogs.map(blog =>
              <Togglable key={blog._id} buttonLabel={blog.title + ' ' +  blog.author}>
                <Blog key={blog._id} blog={blog} deleteBlog={this.deleteBlog(blog._id)} user={this.state.user}/>
              </Togglable>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
