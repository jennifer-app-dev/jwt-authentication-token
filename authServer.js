// render the SECRET_KEY from the environment variables
require('dotenv').config()

// 1. setup express server
const express = require('express')
const app = express()

// 6. Create json web token using the library
const jwt = require('jsonwebtoken');

// let app use the json from the body get passed in
app.use(express.json())

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
app.get('/posts', authenticateToken, (req, res) => {
  // PART. III: so now we have access to our user => so we can Request our user
  res.json(posts.filter(post => post.username === req.user.name))

  // 3.A: make it return => the post
  res.json(posts)
})

// 5. create a POST '/login' Route => to create a token
app.post('/login', (req, res) => {
  // use this '/login' route => to Authenticate the User
  // 5.B) you are gonna Authenticate user first. the user has access to our app.
  const username = req.body.username

  // 5.C.1) step 1. create a user obj
  const user = {name: username}
  // 5.C) create a jsonwebtoken very simple
  // ==> 5.C.2) serialize our user by using 'secret key' from environment variables
  const accessToken = generateAccessToken(user)
  // Next, create a fresh token (since the generateAccessToken will expire in 15 secs )
  res.json({accessToken: accessToken})
})

//PART. II: create a function which is to generateAccessToken, named 'generateAccessToken()'
// => this is the middleware route
function generateAccessToken(user) {
  // add a 2nd parameter, an expiration time, which now set for it expire in 15secs
  // next, call the 'generateAccessToken' function in the 'accessToken' variable.
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s'})
}





// 2. app listen to port: 4000
app.listen(4000)