import React from 'react'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { addNewBlog } from '../reducers/blogReducer'
import { addNewNotification } from '../reducers/notificationReducer'
import BlogForm from './BlogForm'
import { Accordion, Card } from 'react-bootstrap'

const NewBlogForm = () => {
  const dispatch = useDispatch()

  const createBlog = (newBlog) => {
    blogService
      .create(newBlog)
      .then((returnedBlog) => {
        dispatch(addNewBlog(returnedBlog))
        dispatch(
          addNewNotification(
            `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
            false
          )
        )
        setTimeout(() => {
          dispatch(addNewNotification(null, false))
        }, 5000)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Accordion>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey='0'>
        Create new blog entry
        </Accordion.Toggle>
        <Accordion.Collapse eventKey='0'>
          <Card.Body>
            <BlogForm createBlog={createBlog} />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}

export default NewBlogForm
