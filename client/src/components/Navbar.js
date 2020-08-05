import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div>
            <nav>
                <div className="nav-wrapper black">
                <Link to="/" className="brand-logo left">ItsMyGram</Link>
                <ul id="nav-mobile" className="right">
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/create">Create a Post</Link></li>
                </ul>
                </div>
            </nav>           
        </div>
    )
}

export default Navbar
