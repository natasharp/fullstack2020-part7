import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  if (isError) {
    return <Alert variant="danger"> {message}</Alert>
  }

  return <Alert variant="success"> {message}</Alert>

}

export default Notification
