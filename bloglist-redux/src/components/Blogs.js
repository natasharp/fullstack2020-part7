import React from 'react'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { likeTheBlog, removeBlog } from '../reducers/blogReducer'

const Blogs = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const updateBlog = (id, updatedBlog) => {
    blogService
      .update(id, updatedBlog)
      .then((returnedBlog) => {
        dispatch(likeTheBlog(returnedBlog))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteBlog = (id) => {
    blogService
      .remove(id)
      .then(() => dispatch(removeBlog(id)))
      .catch((error) => {
        console.log(error)
      })
  }

  const sortBlogs = (blogs) =>
    blogs.sort((first, second) => (first.likes > second.likes ? -1 : 1))

  return (
    <div id='blogs-div'>
      {sortBlogs(blogs).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  )
}

export default Blogs
