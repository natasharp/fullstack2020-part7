import React from 'react'
import { useDispatch } from 'react-redux'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import { addNewBlog } from '../reducers/blogReducer'
import { addNewNotification } from '../reducers/notificationReducer'
import BlogForm from '../components/BlogForm'

const AddNewBlog = () => {
  const dispatch = useDispatch()

  const createBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
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

  const blogFormRef = React.createRef()
  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  return <div> {blogForm()}</div>
}

export default AddNewBlog
