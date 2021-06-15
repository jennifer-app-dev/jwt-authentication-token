// 1. setup express server
const express = require('express')
const app = express()

// 4. create posts
const posts = [
  {
    username: "Jane",
    title: "Post 1"
  },
  {
    username: "John",
    title: "Post 2"
  }
]

// 3. create a simple route, get all the posts inside the app
app.get('/posts', (req, res) => {
  // 3.A: make it return => the post
  res.json(posts)
})

// 2. app listen to port: 3000
app.listen(3000)