import React from 'react'
import Blog from './Blog'
import NewBlogForm from './NewBlogForm'

const Blogs = ({ user, blogs }) => {
  const sortBlogs = (blogs) =>
    blogs.sort((first, second) => (first.likes > second.likes ? -1 : 1))

  return (
    <div>
      <h3>Blogs</h3>
      <div>
        <NewBlogForm />
        <div id='blogs-div'>
          {sortBlogs(blogs).map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blogs
