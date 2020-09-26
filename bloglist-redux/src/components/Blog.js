import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Blog = ({ blog }) => {
  return (
    <Card>
      <Card.Body>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author}
      </Card.Body>
    </Card>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
