import React, { useState, useEffect, useContext } from 'react'
import {UserContext} from '../../App'

function Profile() {

    const [post, setPost] = useState([])
    const { state, dispatch } = useContext(UserContext)

    console.log(state)

    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        fetch('/myposts', 
            {
                headers: {
                    //"Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setPost(data.myposts)
                //console.log(post);
            })
    }, [post]);


    return (
        <div style={{
            maxWidth: "850px",
            margin: "0px auto"
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                margin: '18px 0px',
                //borderBottom: '1px solid grey'
            }}>
                <div>
                    <img style={{width: '160px', height: '160px', borderRadius: '80px'}} 
                     className="item responsive-img circle" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    />
                </div>
                <div>
                    <h3>{user.name}</h3>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}>
                        <p style={{paddingRight: "20px"}}> {post.length} posts </p>
                        {/* <p>{user.followers.length} followers</p>
                        <p>{user.following.length} following</p> */}
                        <p style={{paddingRight: "20px"}}> {user.following.length} following </p>
                        <p style={{paddingRight: "20px"}}> {user.followers.length} followers </p>
                    </div>
                </div>
            </div>
            <hr />
            <div className="gallery">
                    {
                        post.map((post) => {
                            return (
                                <img style={{margin: "10px"}} className="item responsive-img" src={post.photo} alt={post.title} key={post._id} />
                            )
                        })
                    }
                    {/* <img className="item" src="https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                    <img className="item" src="https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                    <img className="item" src="https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                    <img className="item" src="https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                    <img className="item" src="https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                    <img className="item" src="https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" /> */}               
            </div>
        </div>
    )
}

export default Profile
