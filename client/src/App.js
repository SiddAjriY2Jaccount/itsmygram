import React from 'react';
import Navbar from './components/Navbar'
import Home from './components/screens/Home'
import Login from './components/screens/Login'
import Register from './components/screens/Register'
import Profile from './components/screens/Profile'
import CreatePost from './components/screens/CreatePost'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Register />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
    </Router>
  );
}

export default App;
