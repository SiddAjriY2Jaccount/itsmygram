import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
    return (
        <div>
            <div className="maincard">
                <div className="card auth-card input-field">
                    <h2 className="card-title">ItsMyGram: Sign Up!</h2>
                    <div className="card-content white-text">
                        {/*<p>I am a very simple card. I am good at containing small bits of information.
                        I am convenient because I require little markup to use effectively.</p> */}
                        <input type="text" placeholder="Name" />
                        <input type="text" placeholder="E-mail" />
                        <input type="text" placeholder="Password" />
                        <br />
                        <br />
                        <br />
                        <button className="btn waves-effect waves-light indigo darken-1" name="action">
                            Register
                            {/* <i className="material-icons right">Login</i> */}
                        </button>
                    </div>
                    {/* <div className="card-action">
                        
                    </div> */}
                    <p>
                            <Link to="/login">Already have an account? Login here!</Link>
                    </p>
                </div>
            </div> 
        </div>
    )
}

export default Register
