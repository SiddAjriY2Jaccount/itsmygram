import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import { useParams } from 'react-router-dom'

function Profile() {

    const [userProfile, setProfile] = useState(null)
    const { state, dispatch } = useContext(UserContext)
    const user = JSON.parse(localStorage.getItem("user"))
    const {userid} = useParams() 
    
    const [showFollow, setShowFollow] = useState(state ? !state.following.includes(userid) : true)
    
    console.log(userid);
    //console.log(userProfile);

    useEffect(() => {
        fetch(`/user/${userid}`, 
            {
                headers: {
                    //"Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            })
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                setProfile(data)
                //console.log(userProfile)
            })
    }, [])

    // useEffect(() => { console.log(userProfile) }, [userProfile])

    const followUser = () => {
        fetch('/follow', { 
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")            
            },
            body: JSON.stringify({
                followId: userid
            })

        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            dispatch({ type: "UPDATE", payload: {following: data.following, followers: data.followers}});
            localStorage.setItem("user", JSON.stringify(data));
            setProfile((prevState) => {
                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers: [...prevState.user.followers, data._id]
                    }
                }
            }) 
        })
        
        setShowFollow(false)
    }
    
    
    const unfollowUser = () => {
        fetch('/unfollow', { 
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")            
            },
            body: JSON.stringify({
                unfollowId: userid
            })

        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            dispatch({ type: "UPDATE", payload: {following: data.following, followers: data.followers}});
            localStorage.setItem("user", JSON.stringify(data));
 
            setProfile((prevState) => {

                const updatedFollowersList = prevState.user.followers.filter(followerId => followerId != data._id);

                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers: updatedFollowersList
                    }
                }
            }) 
        })

        setShowFollow(true)
    }

    return (

    <>
        {
        userProfile ?
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
                    <h3>{userProfile.user.name}</h3>
                    <h5>{userProfile.user.email}</h5>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}>
                        <p style={{paddingRight: "20px"}}>{userProfile.posts.length} posts </p>
                        <p style={{paddingRight: "20px"}}> {userProfile.user.followers.length} followers </p>
                        <p style={{paddingRight: "20px"}}> {userProfile.user.following.length} following </p>
                    </div>

                    {/* if logged-in user already follows, show only the unfollow button, else show only the follow button */}
                    
                    {
                    showFollow
                    ?    
                    <button 
                        className="btn waves-effect waves-light indigo darken-1"
                        name="action"
                        onClick={() => followUser()} 
                        >
                            Follow
                            {/* <i className="material-icons right">Login</i> */}
                    </button>

                    :
                    <button 
                        className="btn waves-effect waves-light indigo darken-1"
                        name="action"
                        onClick={() => unfollowUser()} 
                        >
                            Unfollow
                            {/* <i className="material-icons right">Login</i> */}
                    </button>

                    }

                </div>
            </div>
            <hr />
            <div className="gallery">
                    {
                        userProfile.posts.map((post) => {
                            return (
                                <img style={{margin: "10px"}} className="item responsive-img" src={post.photo} alt={post.title} key={post._id}/>
                            )
                        })
                    }
            </div>
        </div>
        : <h5> Please wait while it loads ... </h5>

        }
        
    </>
     
    )
}

export default Profile
