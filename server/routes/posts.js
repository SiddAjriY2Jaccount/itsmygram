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


//Like posts route
router.put('/like', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, 
        
        {
            $push: {likes: req.user._id}
        },

        {
            new: true
        }
    ).exec((err, result) => {
        if (err) {
            return res.status(422).json({error: err})
        }

        else {
            res.json(result)
        }
    })
})

//UNlike posts route
router.put('/unlike', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId,         
        {
            $pull: {likes: req.user._id}
        },

        {
            new: true
        }
    ).exec((err, result) => {
        if (err) {
            return res.status(422).json({error: err})
        }

        else {
            console.log(result)
            res.json(result)
        }
    })
})




module.exports = router