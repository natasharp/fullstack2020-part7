import React from 'react'
import { useParams } from 'react-router-dom'

const UserDetails = ({ users }) => {
  const id = useParams().id
  const user = users.find(n => n.id === Number(id)) 
  return <div>
      <h2>user</h2>
      <div>added blogs</div>
      <ul>
      {user.blogs.map(blog =>
        <li key={blog.id}>
          {blog.content}
        </li>
      )}
    </ul>
  </div>
}

export default UserDetails
