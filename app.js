const express = require('express');
const mongoose = require('mongoose');
const path = require("path")

const User = require('./models/user');
const Post = require('./models/post');

const app = express();

const { MONGOURI, PORT } = require('./config/keys');

/* mongoose.connect(MONGOURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})

mongoose.connection.on('connected', () => {
    console.log("connection made to atlas")
})

mongoose.connect(MONGOURI)
mongoose.connection.on('error', () => {
    console.log("ERROR: during connection to atlas")
}) */

//connecting to mongo atlas
mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
      //app.listen(PORT)
      console.log(`connected to atlas, port ${PORT}`)
    })
  .catch((err) => console.log(err));

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true })); //passes all the urlencoded data and makes it accessible as an object
app.use('/', require('./routes/auth'))
app.use('/', require('./routes/posts'))
app.use('/', require('./routes/user'))

//build static files when serving in production
if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, "client", "build")))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}

//listen on specified port number for requests
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
}) 