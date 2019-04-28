import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.blog.title,
      author: props.blog.author,
      url: props.blog.url,
      likes: props.blog.likes,
      blog: props.blog,
      deleteBlog: props.deleteBlog,
      user: props.user
    }
  }

  likeBlog = (event) => {
    event.preventDefault()
    let user = {name: 'Tuntematon', username: 'Tuntematon'}
    if (this.state.blog.user) {
      user = this.state.blog.user
    }
    console.log('debug ', this.state.blog.user)
    const blogObject = {
      id: this.state.blog._id,
      user: user,
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
      likes: this.state.likes + 1
    }
    blogService
      .update(blogObject.id, blogObject)
      .then(response => {
        this.setState({
          likes: blogObject.likes
        })
      })
      .catch(error => {
        alert(`Et voi tykätä enää tästä blogista`)
      })
  }

 
  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5,
    }

    let added_by = 'Tuntematon'
    if (this.state.blog.user) {
      added_by = this.state.blog.user.name
    }
    if (this.state.blog.user && this.state.user.username !== this.state.blog.user.username) {
      return (
        <div style={blogStyle}>
          <a href={this.state.url}>{this.state.url}</a><br />
          {this.state.likes} tykkäystä <button onClick={this.likeBlog}> Tykkää </button><br />
          Lisääjä: {added_by} <br />
        </div>
      )
    }

    return (
      <div style={blogStyle}>
        <a href={this.state.url}>{this.state.url}</a><br />
        {this.state.likes} tykkäystä <button onClick={this.likeBlog}> Tykkää </button><br />
        Lisääjä: {added_by} <br />
        <button onClick={this.state.deleteBlog}> Poista </button><br />
      </div>
    )
  }
}

export default Blog
