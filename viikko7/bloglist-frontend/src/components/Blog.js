import React from 'react'
import { connect } from 'react-redux'
import { notifyAction } from '../reducers/notificationReducer'
import { likeBlogAction, commentBlogAction } from '../reducers/blogReducer'
import { useField } from '../hooks'
import { Table, Button } from 'reactstrap'

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
    commentReset()
    props.commentBlogAction({ ...blog, comments: blog.comments.concat(comment.value) }).then(
      commentedBlog => notify(`you commented ${commentedBlog.title}`)
    )
  }

  console.log(blog)
  if (!blog) {
    return <div></div>
  }
  return (
    <div>
      <Table>
        <thead>
          <th><h2>{blog.title} {blog.author}</h2></th>
        </thead>
        <tbody>
          <tr>
            <a href={blog.url}>{blog.url}</a> <br />
          </tr>
          <tr>
            <td>{blog.likes} likes</td>
            <td><Button id="like" color="success" onClick={() => likeBlog(blog)}>like</Button></td>
          </tr>
          <tr>
            <td>Added by {blog.user.username}</td>
          </tr>
        </tbody>
      </Table>
      <div>
        <form onSubmit={handleSubmit}>
          <input id="comment" {...comment} />
          <Button color="primary" type="submit">add comment</Button>
        </form>
      </div>
      <h3>comments</h3>
      <ul>
        {blog.comments && blog.comments.map(comment =>
          <li key={comment}>{comment}</li>)}
      </ul>
    </div >
  )
}

const mapDispatchToProps = {
  likeBlogAction,
  notifyAction,
  commentBlogAction
}

const ConnectedBlog = connect(null, mapDispatchToProps)(Blog)

export default ConnectedBlog