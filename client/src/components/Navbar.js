import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import M from 'materialize-css'


function Navbar() {

    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const renderList = () => {
        if (state) {
            return [
                <li><Link to="/">Feed</Link></li>,
                <li><Link to="/profile">Profile</Link></li>, 
                <li><Link to="/create">Create a Post</Link></li>,
                <li><Link to="/following-posts">Following</Link></li>,
                <li><a className="btn waves-effect waves-light red darken-1" 
                       name="action"
                       onClick={() => {
                            localStorage.clear();
                            dispatch({ type: "CLEAR" })
                            history.push('/login')
                        }} 
                        >
                        Log Out 
                        <i class="material-icons right">cloud</i>
                    </a>
                </li>,
                // <li>
                //     <button 
                //         className="btn waves-effect waves-light red darken-1"
                //         name="action"
                //         onClick={() => {
                //             localStorage.clear();
                //             dispatch({ type: "CLEAR" })
                //             history.push('/login')
                //         }} 
                //         >
                //             Log Out
                //             {/* <i className="material-icons right">Login</i> */}
                //     </button>
                // </li>
            ]
        }

        else {
            return [
                <li><Link to="/login">Login</Link></li>, 
                <li><Link to="/signup">Sign Up</Link></li>
            ]
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems);
    });

    return (
        <div>
            <nav>
                <div className="nav-wrapper black">
                <Link style={{paddingLeft: "4px", cursor: "pointer"}} to={() => { if (state) {return "/"} else {return "/login"} }} className="brand-logo left">ItsMyGram</Link>
                <a href="#" data-target="mobile-demo" className="sidenav-trigger right"><i className="material-icons">menu</i></a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {/* <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/create">Create a Post</Link></li> */}
                    {renderList()}
                </ul>
                <ul className="sidenav right sidenav-close" id="mobile-demo">
                    {renderList()}
                </ul>
                </div>
            </nav>           
        </div>
    )
}

export default Navbar
