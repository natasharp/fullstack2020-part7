import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { addNewNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setLoggedInUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import Users from './components/Users'
import Blogs from './components/Blogs'
import AddNewBlog from './components/AddNewBlog'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(initializeBlogs(blogs)))
    userService.getAll().then((users) => dispatch(initializeUsers(users)))
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoggedInUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setLoggedInUser(user))
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(addNewNotification('wrong credentials', true))
      setTimeout(() => {
        dispatch(addNewNotification(null, false))
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistAppUser')
    dispatch(setLoggedInUser(null))
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification
          message={notification.notification}
          isError={notification.isError}
        />
        <form onSubmit={handleLogin}>
          <div>
            username{' '}
            <input
              id='username-input'
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password{' '}
            <input
              id='password-input'
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type='submit'>
            login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Router>
        <h2>blogs</h2>
        <Notification
          message={notification.notification}
          isError={notification.isError}
        />
        <div>
          <div>{user.name} is logged in</div>
          <br />
          <button id='logout-button' onClick={handleLogout}>
            logout
          </button>
        </div>
        <br />

        <Switch>
          <Route path='/users/:id'>
          </Route>
          <Route path='/users'>
            <Users users={users} />
          </Route>
          <Route path='/'>
            <AddNewBlog />
            <Blogs user={user} />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
