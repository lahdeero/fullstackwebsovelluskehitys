import React from 'react'
import Togglable from './Togglable'
import NewBlog from './NewBlog'
import Blog from './Blog'
import blogService from '../services/blogs'
import { addBlogAction, likeBlogAction, removeBlogAction } from '../reducers/blogReducer'
import Notification from './Notification'
import { notifyAction } from '../reducers/notificationReducer'

const ListBlogs = (props) => {

  const newBlogRef = React.createRef()

  const byLikes = (b1, b2) => b2.likes - b1.likes
  const notify = async (message, type = 'success') => {
    console.log(message, type)
    console.log('eka')
    await notifyAction(message, type, 5)
    console.log('kolmas')
  }

  const createBlog = async (blog) => {
    const createdBlog = await blogService.create(blog)
    newBlogRef.current.toggleVisibility()
    addBlogAction(props.blogs.concat(createdBlog))
    await notify(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
  }

  const likeBlog = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(likedBlog)
    likeBlogAction(updatedBlog)
    await notify(`blog ${updatedBlog.title} by ${updatedBlog.author} liked!`)
  }

  const removeBlog = async (blog) => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      const updatedBlog = await blogService.remove(blog)
      removeBlogAction(props.blogs.filter(b => b.id !== blog.id))
      notify(`blog ${updatedBlog.title} by ${updatedBlog.author} removed!`)
    }
  }
  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={props.notification} />

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


export default ListBlogs