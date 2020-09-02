const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'UPDATE_BLOG':
      const id = action.data.id
      return state.map((blog) => (blog.id !== id ? blog : action.data))
    case 'DELETE_BLOG':
      return state.filter((blog) => blog.id !== action.data)
    default:
      return state
  }
}

export const addNewBlog = (blog) => {
  return {
    type: 'ADD_BLOG',
    data: blog,
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs,
  }
}

export const likeTheBlog = (blog) => {
  return {
    type: 'UPDATE_BLOG',
    data: blog,
  }
}

export const removeBlog = (id) => {
  return {
    type: 'DELETE_BLOG',
    data: id,
  }
}

export default blogReducer
