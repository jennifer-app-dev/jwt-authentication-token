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


//PART. II: create authenticateToken function
// => this is the middleware route
function authenticateToken (req, res, next
  ) {
  // II.1: GET the token authenticated they sent back to us
  // II.2: Then => Verifies the token of the user
  const authHeader = req.headers['authorization']
  // we only need to get the Token portion-> split the array and get the 2nd portion
  const token = authHeader && authHeader.split(' ')[1]
  // conditional check: to see if we have a token or not: if null, return 'undefined'
  if(token == null) return res.sendStatus(401)
  
  // After conditional check, so that we know the user has token, => so we have to verify that token, => How to verify? pass the token and the SECRET_KEY in the environment variable
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // this takes a callback, 1st check for errors [403] Invalidate Token, No Access
    if(err) return res.sendStatus(403)
    // so we know we have Token, so that we can set our user 
    req.user = user
    // then => call next()
    next()
  })
  // The Token comes with the Header 'Bearer' from the authHeader above 
  // => Bearer TOKEN 
}

// 2. app listen to port: 3000
app.listen(3000)