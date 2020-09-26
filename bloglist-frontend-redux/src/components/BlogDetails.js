import React from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { removeBlog, likeTheBlog } from '../reducers/blogReducer'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'
import { commentBlog } from '../reducers/blogReducer'
import { Badge, Button, Card, Col, Form } from 'react-bootstrap'

const BlogDetails = ({ user, blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const comment = useField('text')

  if (!blog) {
    return null
  }

  const handleDelete = () => {
    const message = `Remove blog ${blog.title} by ${blog.author}`
    if (window.confirm(message)) {
      blogService
        .remove(blog.id)
        .then(() => {
          dispatch(removeBlog(blog.id))
          history.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const handleLike = () => {
    const updatedBlog = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      comments: blog.comments,
    }

    blogService
      .update(blog.id, updatedBlog)
      .then((returnedBlog) => {
        dispatch(likeTheBlog(returnedBlog))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const addComment = (e) => {
    e.preventDefault()
    const updatedBlog = {
      ...blog,
      comments: blog.comments.concat(comment.value),
    }
    blogService
      .createComment(blog.id, updatedBlog)
      .then((returnedBlog) => dispatch(commentBlog(returnedBlog)))
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Card>
      <Card.Body>
        <h2>
          <a href={blog.url}>
            {blog.title} {blog.author}
          </a>
        </h2>{' '}
        <div>added by {blog.user.name}</div>
        <div>
          <Button variant='primary' onClick={handleLike}>
            Like <Badge variant='light'>{blog.likes}</Badge>
            <span className='sr-only'>unread messages</span>
          </Button>
        </div>
        <div>Comments</div>
        <div>
          <Form onSubmit={addComment}>
            <Form.Row>
              <Col>
                <Form.Control {...comment} />
              </Col>
              <Col>
                <Button variant='primary' type='submit'>
                  Add comment
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </div>
        {blog.comments ? (
          <ul>
            {blog.comments.map((comment, i) => (
              <li key={i}>{comment}</li>
            ))}
          </ul>
        ) : (
          <div>null</div>
        )}
      </Card.Body>
      <Button variant='outline-danger' onClick={handleDelete}>
        Remove
      </Button>{' '}
    </Card>
  )
}

export default BlogDetails
