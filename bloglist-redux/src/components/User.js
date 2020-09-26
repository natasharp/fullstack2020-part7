import React from 'react'
import { useParams } from 'react-router-dom'

const User = ({ users }) => {
  const id = useParams().id
  if (users) {
    const user = users.find((u) => u.id === id)
    return (
      <div>
        <h3>{user.name}</h3>
        <div>added blogs</div>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    )
  } else {
    return null
  }
}

export default User
