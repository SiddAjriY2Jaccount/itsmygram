const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Post = require('./models/post');
const app = express();
const { MONGOURI, PORT } = require('./keys');

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

mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
      app.listen(PORT)
      console.log(`connected to atlas, port ${PORT}`)
    })
  .catch((err) => console.log(err));

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true })); //passes all the urlencoded data and makes it accessible as an object
app.use('/', require('./routes/auth'))
app.use('/', require('./routes/posts'))
app.use('/', require('./routes/user'))


/* app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})  */