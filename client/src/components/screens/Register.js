import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

function Register() {

    const history = useHistory()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const PostData = () => {

        // Fields empty check
        if (email == "" || name == "" || password == "") {
            M.toast({html: "Fields are empty", classes: "red darken-2"})
        }

        // email validator regex
        else if (! /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({html: "Invalid email", classes: "red darken-2"})
        }

        else {

            fetch(
            "/signup",
            
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name, 
                    email, 
                    password
                })

            }
          )
          .then(res => res.json())
          .then(data => {
              console.log(data);
              if (data.error) {
                  M.toast({html: data.error, classes:"red darken-2"})
              }

              else {
  
                M.toast({html: data.message, classes:"light-green darken-2"})
                history.push('/login')
                                  
              }
          })
          .catch(error => console.log(error))
        }
    }

    return (
        <div>
            <div className="maincard">
                <div className="card auth-card input-field">
                    <h2 className="card-title">ItsMyGram: Sign Up!</h2>
                    <div className="card-content white-text">
                        {/*<p>I am a very simple card. I am good at containing small bits of information.
                        I am convenient because I require little markup to use effectively.</p> */}
                        
                        <input
                        type="text" 
                        placeholder="Name" 
                        value={name} 
                        onChange={(event) => {setName(event.target.value)}} 
                        />

                        <input
                        type="text" 
                        placeholder="E-mail" 
                        value={email} 
                        onChange={(event) => {setEmail(event.target.value)}} 
                        />

                        <input
                        type="password"
                        placeholder="Password" 
                        value={password} 
                        onChange={(event) => {setPassword(event.target.value)}}
                        />

                        <br />
                        <br />
                        <br />

                        <button 
                        className="btn waves-effect waves-light indigo darken-1" 
                        name="action"
                        onClick={() => PostData()}                        
                        >
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
