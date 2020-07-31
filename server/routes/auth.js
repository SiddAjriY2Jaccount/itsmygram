const express = require('express')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = mongoose.model("User")

const router = express.Router()

// signup route
router.post('/signup', (req, res) => {
    const {name, email, password} = req.body
    if (!email || !password || !name)
    {
        return res.status(422).json({message: "some field empty"})    
    }

    //console.log(name, email, pw)
    User.findOne({ email: email })
        .then((existingUser) => {
            if (existingUser) {
            return res.status(422).json({message: "user with that email exists"})
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
                        res.json({message: "user successfully registered"})
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
        return res.status(422).json({error: 'email or password field is empty'})
    }


    User.findOne({ email: email })
      .then((user_obj_drom_db) => {

          bcrypt.compare(password, user_obj_drom_db.password)
            .then(matchFound => {
                if (matchFound) {
                    res.json({message: "Login Successful"})
                }
                else {
                    return res.status(422).json({error: 'invalid credentials'})
                }
            })
            .catch((err) => console.log(err))
      })
      .catch((err) => {
          //console.log(err)
          return res.status(422).json({error: "invalid credentials"})
        })


})


module.exports = router