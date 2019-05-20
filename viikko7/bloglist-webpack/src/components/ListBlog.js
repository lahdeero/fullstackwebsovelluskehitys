import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ListBlog = ({ blog }) => {
  return (
    <div key={Math.random(10000)}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
    </div>
  )
}

ListBlog.propTypes = {
  blog: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
  creator: PropTypes.bool.isRequired
}

export default ListBlog