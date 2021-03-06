import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import usersReducer from './reducers/usersReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { BrowserRouter as Router } from 'react-router-dom'

const reducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  users: usersReducer,
  notification: notificationReducer,
})
const store = createStore(reducer, composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <Router>
        <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
