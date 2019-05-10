import React from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import NewBlog from './NewBlog'
import Blog from './Blog'
import { addBlogAction, likeBlogAction, removeBlogAction } from '../reducers/blogReducer'
import { notifyAction } from '../reducers/notificationReducer'

const ListBlogs = (props) => {

  const newBlogRef = React.createRef()

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const notify = (message, type = 'success') => {
    props.notifyAction(message, type, 5)
  }

  const createBlog = async (blog) => {
    newBlogRef.current.toggleVisibility()
    props.addBlogAction(blog).then(createdBlog => 
      notify(`a new blog ${createdBlog.title} by ${createdBlog.author} added`))
  }

  const likeBlog = (blog) => {
    props.likeBlogAction(blog).then(updatedBlog =>
      notify(`blog ${updatedBlog.title} by ${updatedBlog.author} liked!`))
  }

  const removeBlog = (blog) => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      props.removeBlogAction(blog).then(removedBlog =>
        notify(`blog ${removedBlog.title} by ${removedBlog.author} removed!`))
    }
  }
  console.log(props.blogs)
  return (
    <div>
      <h2>blogs</h2>

      <p>{props.user && props.user.name} logged in</p>
      <button onClick={props.handleLogout}>logout</button>

      <Togglable buttonLabel='create new' ref={newBlogRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      {props.blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          like={likeBlog}
          remove={removeBlog}
          user={props.user}
          creator={blog.user.username === props.user.username}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  addBlogAction,
  likeBlogAction,
  removeBlogAction,
  notifyAction
}

const ConnectedListBlogs = connect(mapStateToProps, mapDispatchToProps)(ListBlogs)

export default ConnectedListBlogs