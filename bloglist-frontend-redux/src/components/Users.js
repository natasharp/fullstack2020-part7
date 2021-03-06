import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = ({ users }) => {
  if (users) {
    return (
      <div>
        <h2>Users</h2>
        <Table striped>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
                <td>{u.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  } else {
    return <div></div>
  }
}

export default Users
