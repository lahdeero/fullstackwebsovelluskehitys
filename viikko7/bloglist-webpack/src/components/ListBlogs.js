import React from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import NewBlog from './NewBlog'
import ListBlog from './ListBlog'
import { addBlogAction, likeBlogAction, removeBlogAction } from '../reducers/blogReducer'
import { notifyAction } from '../reducers/notificationReducer'
import { ListGroup, ListGroupItem } from 'reactstrap'

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

      <Togglable buttonLabel='create new' ref={newBlogRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      <ListGroup>
        {props.blogs.sort(byLikes).map(blog =>
          <ListGroupItem key={Math.random(10000)}>
            <ListBlog
              key={blog.id}
              blog={blog}
              remove={removeBlog}
              user={props.user}
              creator={blog.user.username === props.user.username}
            />
          </ListGroupItem>
        )}
      </ListGroup>
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