import React, { useEffect } from 'react'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setLoggedInUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import blogService from './services/blogs'
import userService from './services/users'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import BlogDetails from './components/BlogDetails'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { Button, Container, Navbar } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(initializeBlogs(blogs)))
  }, [dispatch])

  useEffect(() => {
    userService.getAll().then((users) => dispatch(initializeUsers(users)))
  }, [dispatch, blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoggedInUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistAppUser')
    dispatch(setLoggedInUser(null))
  }

  const match = useRouteMatch('/blogs/:id')
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null

  const padding = { padding: 5 }

  if (!user) {
    return <LoginForm notification={notification} />
  }

  return (
    <Container>
      <Navbar bg='light' variant='light'>
        <Navbar.Brand>BLOG APP</Navbar.Brand>
        <Link style={padding} to='/blogs'>
          Blogs
        </Link>
        <Link style={padding} to='/users'>
          Users
        </Link>
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>Signed in as: {user.name}</Navbar.Text>
          <Link style={padding} to='/login'>
            <Button variant='light' onClick={handleLogout}>
              logout
            </Button>
          </Link>
        </Navbar.Collapse>
      </Navbar>
      <Notification
        message={notification.notification}
        isError={notification.isError}
      />
      <Switch>
        <Route path='/blogs/:id'>
          <BlogDetails user={user} blog={blog} />
        </Route>
        <Route path='/users/:id'>
          <User users={users} />
        </Route>
        <Route path='/users/'>
          <Users users={users} />
        </Route>
        <Route path='/'>
          <Blogs user={user} blogs={blogs} />
        </Route>
      </Switch>
    </Container>
  )
}

export default App
