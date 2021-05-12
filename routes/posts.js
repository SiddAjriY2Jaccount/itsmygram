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
      .populate("comments.postedBy", "_id name")
      .then((posts) => {
          res.json({posts})
      })
      .catch((err) => console.log(err))
})

//Fetch all posts of only those users whom you follow using GET request
router.get('/view_all_follow_posts', requireLogin, (req, res) => {
    
    // if postedBy is in following list
    Post.find({postedBy: {$in: req.user.following}})
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name")
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
    ).populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .exec((err, result) => {
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
    ).populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .exec((err, result) => {
        if (err) {
            return res.status(422).json({error: err})
        }

        else {
            //console.log(result)
            res.json(result)
        }
    })
})


//Comment on posts route
router.put('/comment', requireLogin, (req, res) => {

    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }

    Post.findByIdAndUpdate(req.body.postId, 
        
        {
            $push: {comments: comment}
        },

        {
            new: true
        }
    )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
        
        if (err) {
            return res.status(422).json({error: err})
        }

        else {
            res.json(result)
        }
    })
})


// DELETE post option for logged-in user
router.delete('/delete_post/:postId', requireLogin, (req, res) => {
    Post.findOne({_id: req.params.postId})
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({error: err})
            }

            if (post.postedBy._id.toString() === req.user._id.toString()) {
                post.remove()
                    .then((result) => {
                        res.json({result})
                    })
                    .catch((err) => {
                        console.log(err)
                    })                
            }
        })
})


module.exports = router