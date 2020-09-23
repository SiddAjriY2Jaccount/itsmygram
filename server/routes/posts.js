const express = require('express')
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")
const router = express.Router()


// Creating a Post
router.post('/createpost', requireLogin, (req, res) => {
    const {title, body, url} = req.body

    if (!title || !body || !url) {
        res.status(422).json({error: "Some fields are empty"})
    }

    //console.log(req.user)
    req.user.password = undefined

    const post = new Post({
        title,
        body,
        photo: url,
        postedBy: req.user
     }) 
     
    post.save()
       .then((result) => {
           //console.log(result)
           res.json({message: "Post created successfully", post: result})
       })
       .catch((err) => {
           console.log(err)
           res.json({error: "Error in creating post"})
        })

})


//Fetch all posts using GET request
router.get('/view_all_posts', requireLogin, (req, res) => {
    Post.find()
      .populate("postedBy", "_id name")
      .then((posts) => {
          res.json({posts})
      })
      .catch((err) => console.log(err))
})


//Get only the posts made by logged in user
router.get('/myposts', requireLogin, (req, res) => {
    Post.find({postedBy: req.user._id})
      .populate("postedBy", "_id name")
      .then((myposts) => {
          res.json({myposts})
      })
      .catch((err) => console.log(err))

})


module.exports = router