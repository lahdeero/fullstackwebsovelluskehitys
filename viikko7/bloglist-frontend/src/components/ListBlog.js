import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ListBlog = ({ blog }) => {
  return (
    <div>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
    </div>
  )
}


ListBlog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  creator: PropTypes.bool.isRequired
}

export default ListBlog