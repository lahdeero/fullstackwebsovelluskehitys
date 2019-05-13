import React from 'react'
import { connect } from 'react-redux'
import { notifyAction } from '../reducers/notificationReducer'
import { likeBlogAction, commentBlogAction } from '../reducers/blogReducer'
import { useField } from '../hooks'

const Blog = (props) => {
  const { blog } = props
  const [comment, commentReset] = useField('text')

  const notify = (message, type = 'success') => {
    props.notifyAction(message, type, 5)
  }
  const likeBlog = (blog) => {
    props.likeBlogAction(blog).then(updatedBlog =>
      notify(`blog ${updatedBlog.title} by ${updatedBlog.author} liked!`))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.commentBlogAction({ ...blog, comments: blog.comments.concat(comment.value) })
    commentReset()
  }

  console.log(blog)
  if (!blog) {
    return <div></div>
  }
  return (
    <div>
      <div>
        <h2>{blog.title} {blog.author}</h2>

        <a href={blog.url}>{blog.url}</a> <br />
        <div>{blog.likes} likes
        <button onClick={() => likeBlog(blog)}>like</button>
        </div>
        Added by {blog.user.username}
      </div>
      <h3>comments</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <input {...comment} />
          <button type="submit">add comment</button>
        </form>
      </div>
      <ul>
        {blog.comments && blog.comments.map(comment =>
          <li key={comment}>{comment}</li>)}
      </ul>
    </div>
  )
}

const mapDispatchToProps = {
  likeBlogAction,
  notifyAction,
  commentBlogAction
}

const ConnectedBlog = connect(null, mapDispatchToProps)(Blog)

export default ConnectedBlog