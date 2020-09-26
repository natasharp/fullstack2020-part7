import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blogEntry = {
      title: title,
      url: url,
      author: author,
    }
    createBlog(blogEntry)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <Form onSubmit={addBlog}>
        <Form.Group controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control onChange={({ target }) => setTitle(target.value)} type='text' placeholder='Enter title:' />
        </Form.Group>
        <Form.Group controlId='author'>
          <Form.Label>Author</Form.Label>
          <Form.Control onChange={({ target }) => setAuthor(target.value)} type='text' placeholder='Enter author:' />
        </Form.Group>
        <Form.Group controlId=''>
          <Form.Label>Url</Form.Label>
          <Form.Control onChange={({ target }) => setUrl(target.value)} type='url' placeholder='Enter url:' />
        </Form.Group>
        <Button type='submit'>
          create
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
