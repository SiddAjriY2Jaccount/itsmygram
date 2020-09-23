import React, {useEffect, createContext, useReducer, useContext} from 'react';
import Navbar from './components/Navbar'
import Home from './components/screens/Home'
import Login from './components/screens/Login'
import Register from './components/screens/Register'
import Profile from './components/screens/Profile'
import CreatePost from './components/screens/CreatePost'
import './App.css'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import { reducer, initialState } from './reducers/userReducer'

export const UserContext = createContext()

// all routing can be added in this callback
// Switch is used to ensure only one active route at a time
const Routing = () => {

  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)

  useEffect(() => {
   
    const user = JSON.parse(localStorage.getItem("user"))
   
    if (user) {
      dispatch({ type:"USER", payload: user })
      //history.push('/')
    }
    else {
      history.push('/login')
    }

  }, [])

  return (
    <Switch>
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
    </Switch>
  )
}


function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{state, dispatch}} >
    <Router>
      <Navbar />
      <Routing />
    </Router>
    </UserContext.Provider>
  );
}

export default App;
