import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'


function Navbar() {

    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const renderList = () => {
        if (state) {
            return [
                <li><Link to="/profile">Profile</Link></li>, 
                <li><Link to="/create">Create a Post</Link></li>,
                <li><Link to="/following-posts">Following</Link></li>,
                <li>
                    <button 
                        className="btn waves-effect waves-light red darken-1"
                        name="action"
                        onClick={() => {
                            localStorage.clear();
                            dispatch({ type: "CLEAR" })
                            history.push('/login')
                        }} 
                        >
                            Log Out
                            {/* <i className="material-icons right">Login</i> */}
                    </button>
                </li>
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
                <Link style={{paddingLeft: "4px", cursor: "pointer"}} to={() => { if (state) {return "/"} else {return "/login"} }} className="brand-logo left">ItsMyGram</Link>
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
