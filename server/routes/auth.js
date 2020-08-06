const express = require('express')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const requireLogin = require('../middleware/requireLogin')
const User = mongoose.model("User")

const { JWT_SECRET } = require('../keys')

const router = express.Router()

//Testing account:
//Email: sidd@gmail.com
//Password: sidd


//protected route (just to test)
/* router.get('/protected', requireLogin, (req, res) => {
    res.send("Hello! Testing!")
}) */


// signup route
router.post('/signup', (req, res) => {
    const {name, email, password} = req.body
    if (!email || !password || !name)
    {   
        console.log("Error: Field Empty")
        return res.status(422).json({error: "Fields are empty"})    
    }

    //console.log(name, email, pw)
    User.findOne({ email: email })
        .then((existingUser) => {
            if (existingUser) {
            return res.status(422).json({error: "User with that email exists"})
            }

            bcrypt.hash(password, 11)
            .then((hash) => {
                
                const user = new User({ 
                    email,
                    password: hash,
                    name 
                    })
    
                user.save()
                    .then(() => {
                        res.json({message: "User successfully registered"})
                    })
                    .catch((err) => console.log(err))                    
            })
        
        })
        .catch((err) => console.log(err))

})


//login route
router.post('/login', (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(422).json({error: 'Fields are empty'})
    }


    User.findOne({ email: email })
      .then((user_obj_drom_db) => {
          console.log("found email id")
          bcrypt.compare(password, user_obj_drom_db.password)
            .then(matchFound => {
                
                if (matchFound) {
                    
                    //res.json({message: "Login Successful"})
                    const token = jwt.sign({_id: user_obj_drom_db._id}, JWT_SECRET)
                    
                    //retrieve some user details
                    const {_id, name, email} = user_obj_drom_db
                    res.json({message: "Login Successful", token, user: {_id, name, email}})

                }
                else {
                    return res.status(422).json({error: 'Invalid credentials'})
                }
            })
            .catch((err) => console.log(err))
      })
      .catch((err) => {
          //console.log(err)
          return res.status(422).json({error: "Invalid credentials"})
        })

})


module.exports = router