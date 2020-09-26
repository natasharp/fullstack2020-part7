import React from 'react'
import Notification from './Notification'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { addNewNotification } from '../reducers/notificationReducer'
import { setLoggedInUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks/index'
import { useHistory } from 'react-router-dom'
import { Form, Button, Card } from 'react-bootstrap'

const LoginForm = ({ notification }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })
      window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setLoggedInUser(user))
      history.push('/')
    } catch (error) {
      dispatch(addNewNotification('wrong credentials', true))
      setTimeout(() => {
        dispatch(addNewNotification(null, false))
      }, 5000)
    }
  }

  return (
    <div className='container'>
      <h2>Log in to Blog-app application</h2>
      <Notification
        message={notification.notification}
        isError={notification.isError}
      />
      <Card>
        <Card.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group>
              <Form.Label>Username: </Form.Label>
              <Form.Control {...username} />
              <Form.Label>Password: </Form.Label>
              <Form.Control {...password} />
            </Form.Group>
            <div>
              <Button variant="outline-dark" type='submit'>
                login
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default LoginForm
