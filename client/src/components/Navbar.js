import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'


function Navbar() {

    const { state, dispatch } = useContext(UserContext)
    const renderList = () => {
        if (state) {
            return [
                <li><Link to="/profile">Profile</Link></li>, 
                <li><Link to="/create">Create a Post</Link></li>
            ]
        }

        else {
            return [
                <li><Link to="/login">Login</Link></li>, 
                <li><Link to="/signup">Sign Up</Link></li>
            ]
        }
    }

    return (
        <div>
            <nav>
                <div className="nav-wrapper black">
                <Link to={() => { if (state) {return "/"} else {return "/login"} }} className="brand-logo left">ItsMyGram</Link>
                <ul id="nav-mobile" className="right">
                    {/* <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/create">Create a Post</Link></li> */}
                    {renderList()}
                </ul>
                </div>
            </nav>           
        </div>
    )
}

export default Navbar
